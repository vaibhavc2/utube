import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1s"),
  timeout: 5000, // Wait 5 seconds before retrying
  analytics: true
});
