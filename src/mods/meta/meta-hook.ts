import type { PrismEnv } from "../mod.ts";
import { addLine } from "../line/line-hook.ts";

export default function postProcessHook(env: PrismEnv) {
  const meta = env.el.dataset.meta || "";

  const startEl = document.createElement("span");
  startEl.innerHTML = addLine(`<span class="fence">\`\`\`</span>${meta}`, "meta");
  const firstEl = env.el.find(".line:first-child");
  env.el.insertBefore(startEl.firstElementChild!, firstEl);

  const endEl = document.createElement("span");
  endEl.innerHTML = addLine(`<span class="fence">\`\`\`</span>`, "meta");
  const lastEl = env.el.find(".line:last-child");
  env.el.insertAfter(endEl.firstElementChild!, lastEl);
}
