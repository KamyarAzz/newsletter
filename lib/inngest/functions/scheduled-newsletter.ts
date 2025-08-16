import {fetchArticles} from "@/lib/news";
import {inngest} from "../client";
import {marked} from "marked";
import {sendEmail} from "@/lib/email";

export default inngest.createFunction(
  {id: "newsletter/schedule"},
  {event: "newsletter.schedule"},
  async ({event, step, runId}) => {
    const categories = event.data.categories;
    const allArticles = await step.run("fetch-news", async () => {
      return fetchArticles(categories);
    });

    const summary = await step.ai.infer("summerize-news", {
      model: step.ai.models.openai({model: "gpt-4o"}),
      body: {
        messages: [
          {
            role: "system",
            content: `You are an expert newsletter editor creating a personalized newsletter.
                    write a concise, engaging summary that:
                    - Highlights the most important stories
                    - Provides context and insights
                    - Uses a friendly, conversational tone
                    - Is well-structured with clear sections
                    - Keeps the reader informed and engaged
                    Format the response as a proper newsletter with a title and organized content.
                    Make it email-friendly with clear sections and engaging subject lines.`,
          },
          {
            role: "user",
            content: `Create a newsletter summary for these articles from the past week.
           Categories requested:  ${categories.join(", ")}
           
           Articles: ${allArticles
             .map(
               (article: any, i: number) => `${i + 1}.${article.title}\n
             ${article.description}\n
             Source: ${article.url}\n`
             )
             .join("\n")}`,
          },
        ],
      },
    });

    const newsletterContent = summary.choices[0].message.content;

    if (!newsletterContent) {
      throw new Error("Failed to generate newsletter content");
    }

    const htmlResult = await marked(newsletterContent);

    await step.run("send-email", async () => {
      await sendEmail(
        event.data.email,
        event.data.categories.join(", "),
        allArticles.length,
        htmlResult
      );
    });

    return {};
  }
);
