import { type SyntaxModSettingTab, type SyntaxModSettings, usePlatformSetting } from "../settings.ts";
import SyntaxSetting from "../../lib/setting.ts";

export interface SyntaxWhitespaceModSettings extends SyntaxModSettings {
  options: { start: boolean; middle: boolean; end: boolean };
}

export const defaultSettings: SyntaxWhitespaceModSettings = {
  status: "on",
  options: { start: true, middle: false, end: true },
};

const settingTab: SyntaxModSettingTab = async (ctx) => {
  const { plugin } = ctx.tab;
  const settings = ctx.mod.settings as typeof defaultSettings;
  if (!settings.options) settings.options = defaultSettings.options;

  usePlatformSetting(ctx, (modal) => {
    const { contentEl } = modal;
    modal.setTitle(ctx.mod.name);

    new SyntaxSetting(contentEl, plugin)
      .setName("Start")
      .setDesc("Display leading whitespace.")
      .addToggle((cb) => {
        cb.setValue(settings.options.start).onChange(async (value) => {
          settings.options.start = value;
          await ctx.tab.saveSettings();
        });
      });

    new SyntaxSetting(contentEl, plugin)
      .setName("Between")
      .setDesc("Display whitespace between words and other text.")
      .addToggle((cb) => {
        cb.setValue(settings.options.middle).onChange(async (value) => {
          settings.options.middle = value;
          await ctx.tab.saveSettings();
        });
      });

    new SyntaxSetting(contentEl, plugin)
      .setName("End")
      .setDesc("Display trailing whitespace.")
      .addToggle((cb) => {
        cb.setValue(settings.options.end).onChange(async (value) => {
          settings.options.end = value;
          await ctx.tab.saveSettings();
        });
      });
  });
};

export default settingTab;
