import type SyntaxPlugin from "../app/main.ts";
import type { SyntaxSettingTab } from "../lib/settings.ts";
import type { PrismEnv, PrismHook, SyntaxModContext } from "./mod.ts";
import { type SyntaxModAttributes, getAttributes, getScope, parseAttributes } from "./parser.ts";
import { checkPlatform, splitList } from "../utils.ts";

import SyntaxAutolinkerMod from "./autolinker/autolinker.ts";
import SyntaxCopyMod from "./copy/copy.ts";
import SyntaxHighlightMod from "./highlight/highlight.ts";
import SyntaxInlineCodeMod from "./inline-code/inline-code.ts";
import SyntaxKeywordMod from "./keyword/keyword.ts";
import SyntaxLineHighlightMod from "./line-highlight/line-highlight.ts";
import SyntaxLineHoverMod from "./line-hover/line-hover.ts";
import SyntaxLineMod from "./line/line.ts";
import SyntaxLineNumbersMod from "./line-numbers/line-numbers.ts";
import SyntaxLineWrapMod from "./line-wrap/line-wrap.ts";
import SyntaxMarkupMod from "./markup/markup.ts";
import SyntaxMetaMod from "./meta/meta.ts";
import SyntaxWhitespaceMod from "./whitespace/whitespace.ts";
import SyntaxWrapperMod from "./wrapper/wrapper.ts";

// The order determines which mods are loaded and executed first.
export const mods = [
  SyntaxHighlightMod,
  SyntaxMarkupMod,
  SyntaxKeywordMod,
  SyntaxWhitespaceMod,
  SyntaxLineMod,
  SyntaxLineHighlightMod,
  SyntaxAutolinkerMod,
  SyntaxLineHoverMod,
  SyntaxLineNumbersMod,
  SyntaxLineWrapMod,
  SyntaxInlineCodeMod,
  SyntaxMetaMod,
  SyntaxCopyMod,
  SyntaxWrapperMod,
];

export default class SyntaxModManager {
  plugin: SyntaxPlugin;

  constructor(plugin: SyntaxPlugin) {
    this.plugin = plugin;
    this.loadMods();
  }

  highlight(el: HTMLElement, meta: string) {
    const attributes = parseAttributes(meta, getScope(el));
    const env = { element: el, el, scope: getScope(el), attributes };

    // Store meta string and attributes on the element for later use.
    env.el.dataset.meta = meta;
    env.el.dataset.attributes = JSON.stringify(attributes);

    this.executeHook("pre-process", env);
    this.plugin.prism.highlightElement(el);
    this.executeHook("post-process", env);
  }

  executeHook = (hook: PrismHook, env: PrismEnv) => {
    mods.forEach((mod) => {
      if (mod.hooks.includes(hook)) this.run(env, { hook, mod, plugin: this.plugin });
    });
  };

  run(env: PrismEnv, ctx: SyntaxModContext) {
    if (ctx.mod.scope !== "all" && env.scope !== ctx.mod.scope) return;
    if (ctx.mod.dependent === true) return ctx.mod.run(env, ctx);
    let status = checkPlatform(ctx.mod.settings.status);

    // Allow the meta attributes to enable or disable specific mods.
    if (env.attributes) {
      getAttributes(env.attributes, "mod").forEach((attribute) => {
        const mods = splitList(attribute.value);
        const aliases = [ctx.mod.id, ...ctx.mod.aliases];

        aliases.forEach((alias) => {
          if (mods.includes(alias)) status = ctx.force = true;
          else if (mods.includes(`no-${alias}`)) status = ctx.force = false;
        });
      });
    }

    if (status) ctx.mod.run(env, ctx);
    else if (ctx.mod.unload) ctx.mod.unload(env);
  }

  loadMods() {
    const { plugin } = this;

    mods.forEach((mod) => {
      this.loadSettings();

      mod.hooks.forEach((hook) => {
        this.plugin.prism.hooks.add(hook, (env: PrismEnv) => {
          if (env.element) env.el = env.element;
          env.scope = getScope(env.el);
          env.attributes = (JSON.parse(env.el?.dataset.attributes || "[]") as SyntaxModAttributes) || [];
          this.run(env, { hook, mod, plugin });
        });
      });

      if (mod.commands) mod.commands(mod, plugin);
    });
  }

  unloadMods() {
    Object.keys(this.plugin.prism.hooks.all).forEach((hook) => {
      this.plugin.prism.hooks.all[hook] = [];
    });
  }

  loadSettings() {
    const { settings } = this.plugin;

    mods.forEach((mod) => {
      if (!settings.mods[mod.id]) settings.mods[mod.id] = mod.settings;
      else mod.settings = settings.mods[mod.id];
    });
  }

  getSettingTab(tab: SyntaxSettingTab) {
    mods
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(async (mod) => {
        if (mod.settingTab) mod.settingTab({ mod, tab });
      });
  }
}
