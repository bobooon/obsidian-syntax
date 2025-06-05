import type { SyntaxMod } from "../mod.ts";
import { completeHook } from "./line-hook.ts";
import settingTab, { defaultSettings as settings } from "./line-settings.ts";
import { newIcon } from "../../utils.ts";
import "./line.scss";

export function addIcon(el: HTMLElement, icon: string) {
  const iconEl = newIcon(icon);
  el.find(".line-gutter")?.appendChild(iconEl);
  return iconEl;
}

const SyntaxLineMod: SyntaxMod = {
  id: "line",
  aliases: [],
  name: "Line",
  description: "Wrap each line with start and end gutters within code blocks.",
  dependent: true,
  scope: "block",
  hooks: ["complete"],
  run: completeHook,
  settings,
  settingTab,
};

export default SyntaxLineMod;
