import type { PrismEnv } from "../mod.ts";

export default function postProcessHook(env: PrismEnv) {
  const container = document.createElement("div");
  container.addClass("syntax-wrapper");
  env.el.parentNode!.insertBefore(container, env.el);
  container.appendChild(env.el);
}
