import type { PrismEnv } from "../mod.ts";

export default function wrapHook(env: PrismEnv) {
  if (env.type === "keyword") env.classes.push(`keyword-${env.content}`);
}
