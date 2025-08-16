import {createClient} from "@/lib/server";
import {NextRequest, NextResponse} from "next/server";
import type {Frequencies} from "@/types";
import {inngest} from "@/lib/inngest/client";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {error: "You must be logged in to save prefrences."},
      {status: 401}
    );
  }

  const body = await request.json();
  const {categories, frequency, email} = body;
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return NextResponse.json(
      {error: "You must select at least one category to continue."},
      {status: 400}
    );
  }
  const validFrequencies: Frequencies[] = ["daily", "weekly", "biweekly"];
  if (!frequency || !validFrequencies.includes(frequency)) {
    return NextResponse.json({error: "Invalid frequency"}, {status: 400});
  }

  const {error: upsertError} = await supabase.from("user_prefrences").upsert(
    {
      user_id: user.id,
      categories,
      frequency,
      email,
      is_active: true,
    },
    {onConflict: "user_id"}
  );

  if (upsertError) {
    console.error("Failed to save prefrences.", upsertError);
    return NextResponse.json(
      {error: "Failed to save prefrences."},
      {status: 500}
    );
  }

  const {} = await inngest.send({
    name: "newsletter.schedule",
    data: {
      categories,
      email,
      frequency,
      userId: user.id,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Prefrences updated successfuly.",
  });
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {error: "You must be logged in to save prefrences."},
      {status: 401}
    );
  }

  try {
    const {data: prefrences, error: fetchError} = await supabase
      .from("user_prefrences")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (fetchError) {
      return NextResponse.json(
        {error: "Failed to get prefrences."},
        {status: 500}
      );
    }
    return NextResponse.json(prefrences);
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: "Internal error."}, {status: 500});
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {error: "You must be logged in to save prefrences."},
      {status: 401}
    );
  }

  try {
    const body = await request.json();
    const {is_active} = body;
    const {error: updateError} = await supabase
      .from("user_prefrences")
      .update({is_active})
      .eq("user_id", user.id);

    if (updateError) {
      return NextResponse.json(
        {error: "Failed to update prefrences."},
        {status: 500}
      );
    }

    if (!is_active) {
      await inngest.send({
        name: "newsletter.schedule.deleted",
        data: {userId: user.id},
      });
    } else {
      const {data: prefrences, error} = await supabase
        .from("user_prefrences")
        .select("categories, frequency, email")
        .eq("user_id", user.id)
        .single();

      if (error || !prefrences) {
        throw new Error("User prefrences not found.");
      }

      const now = new Date();
      let nextScheduleTime: Date;
      switch (prefrences.frequency) {
        case "daily":
          nextScheduleTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;
        case "weekly":
          nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        case "biweekly":
          nextScheduleTime = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
          break;
        default:
          nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      }

      nextScheduleTime.setHours(9, 0, 0, 0);

      const {} = await inngest.send({
        name: "newsletter.schedule",
        data: {
          categories: prefrences.categories,
          email: prefrences.email,
          frequency: prefrences.frequency,
          userId: user.id,
        },
        ts: nextScheduleTime.getTime(),
      });
    }

    return NextResponse.json({success: true});
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: "Internal error."}, {status: 500});
  }
}
