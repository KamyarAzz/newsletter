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
    data: {},
  });

  return NextResponse.json({
    success: true,
    message: "Prefrences updated successfuly.",
  });
}
