import {Inngest} from "inngest";
export const inngest = new Inngest({
  id: "newsletter",
  eventKey: process.env.INNGEST_SIGNING_KEY!,
});
