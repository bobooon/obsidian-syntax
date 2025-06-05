import { type SyntaxModSettingTab, type SyntaxModSettings, useToggleSetting } from "../settings.ts";
import SyntaxSetting from "../../lib/setting.ts";

export interface SyntaxHighlightModSettings extends SyntaxModSettings {
  options: { escape: boolean };
}

export const defaultSettings: SyntaxHighlightModSettings = {
  status: "on",
  options: { escape: true },
};

const settingTab: SyntaxModSettingTab = async (ctx) => {
  const { plugin } = ctx.tab;
  const settings = ctx.mod.settings as typeof defaultSettings;

  useToggleSetting(ctx, (modal) => {
    const { contentEl } = modal;
    modal.setTitle(ctx.mod.name);

    new SyntaxSetting(contentEl, plugin)
      .setName("Auto escape")
      .setDesc(`Match escaped characters to their HTML entities.`)
      .addToggle((cb) => {
        cb.setValue(settings.options.escape).onChange(async (value) => {
          settings.options.escape = value;
          await ctx.tab.saveSettings();
        });
      });
  });
};

export default settingTab;
