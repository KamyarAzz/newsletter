import {fetchArticles} from "@/lib/news";
import {inngest} from "../client";

export default inngest.createFunction(
  {id: "newsletter/schedule"},
  {event: "newslettter.schedule"},
  async ({event, step, runId}) => {
    const categories = ["technology", "business", "policies"];
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
    console.log(summary.choices[0].message.content);
  }
);
