import type { PrismEnv } from "../mod.ts";

export default function completeHook(env: PrismEnv) {
  env.el.dataset.lineWrap = "";
}
