import type SyntaxPlugin from "../app/main.ts";
import type { SyntaxModSettingTab, SyntaxModSettings } from "./settings.ts";
import type { SyntaxModAttributes, SyntaxModScope } from "./parser.ts";

export type PrismHook = "pre-process" | "wrap" | "before-highlight" | "after-highlight" | "complete" | "post-process";
export type PrismEnv = Record<string, any> & {
  el: HTMLElement;
  scope: SyntaxModScope;
  attributes: SyntaxModAttributes;
};

export type SyntaxModContext = { hook: PrismHook; mod: SyntaxMod; plugin: SyntaxPlugin; force?: boolean };
export type SyntaxModRun = (env: PrismEnv, ctx: SyntaxModContext) => void;
export type SyntaxModUnload = (env: PrismEnv) => void;
export type SyntaxModCommands = (mod: SyntaxMod, plugin: SyntaxPlugin) => void;

export interface SyntaxMod {
  id: string;
  aliases: string[];
  name: string;
  description: string;
  info?: () => Promise<string>;
  dependent?: true;
  scope: SyntaxModScope;
  hooks: PrismHook[];
  run: SyntaxModRun;
  commands?: SyntaxModCommands;
  settings: SyntaxModSettings;
  settingTab?: SyntaxModSettingTab;
  unload?: (env: PrismEnv) => void;
}
