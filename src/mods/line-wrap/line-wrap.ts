import type { SyntaxMod } from "../mod.ts";
import completeHook from "./line-wrap-hook.ts";
import { defaultCommands as commands } from "../commands.ts";
import { usePlatformSetting as settingTab } from "../settings.ts";
import "./line-wrap.scss";

const SyntaxLineWrapMod: SyntaxMod = {
  id: "line-wrap",
  aliases: ["wrap", "lw"],
  name: "Line wrap",
  description: "Allow long lines to break and wrap onto the next line.",
  info: async () => (await import(`./line-wrap.md?raw`)).default,
  scope: "block",
  hooks: ["complete"],
  run: completeHook,
  commands,
  settings: { status: "mobile" },
  settingTab,
};

export default SyntaxLineWrapMod;
