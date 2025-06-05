import type { PrismEnv, SyntaxModContext } from "../mod.ts";
import { getAttributes } from "../parser.ts";
import { newIcon, splitList } from "../../utils.ts";

export default function postProcessHook(env: PrismEnv, ctx: SyntaxModContext) {
  getAttributes(env.attributes, ctx.mod).forEach((attribute) => {
    const [style, icon] = splitList(attribute.value, ":");
    if (style) env.el.classList.add(`syntax-inline-${style}`);
    if (icon) env.el.innerHTML = `${newIcon(icon).outerHTML}${env.el.innerHTML}`;
  });
}
