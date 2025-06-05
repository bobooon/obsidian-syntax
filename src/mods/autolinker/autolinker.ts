import type { SyntaxMod } from "../mod.ts";
import completeHook from "./autolinker-hook.ts";
import { defaultCommands as commands } from "../commands.ts";
import settingTab, { defaultSettings as settings } from "./autolinker-settings.ts";
import "./autolinker.scss";

const SyntaxAutolinkerMod: SyntaxMod = {
  id: "autolinker",
  aliases: ["link", "al"],
  name: "Autolinker",
  description: "Turn URLs, emails, and phone numbers into clickable links within comments.",
  info: async () => (await import(`./autolinker.md?raw`)).default,
  scope: "all",
  hooks: ["complete"],
  run: completeHook,
  commands,
  settings,
  settingTab,
};

export default SyntaxAutolinkerMod;
