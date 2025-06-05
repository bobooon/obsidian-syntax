import type { SyntaxMod } from "../mod.ts";
import completeHook from "./line-hover-hook.ts";
import { defaultCommands as commands } from "../commands.ts";
import { usePlatformSetting as settingTab } from "../settings.ts";
import "./line-hover.scss";

const SyntaxLineHoverMod: SyntaxMod = {
  id: "line-hover",
  aliases: ["hover", "lh"],
  name: "Line hover",
  description: "Highlight the line that is focused or hovered over.",
  info: async () => (await import(`./line-hover.md?raw`)).default,
  scope: "block",
  hooks: ["complete"],
  run: completeHook,
  commands,
  settings: { status: "on" },
  settingTab,
};

export default SyntaxLineHoverMod;
