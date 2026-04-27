import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
import JSON from "@ohos:util.json";
import { WindowUtil } from "@normalized:N&&&entry/src/main/ets/utils/WindowUtil&";
const DOMAIN = 0x0000;
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        try {
            AppStorage.setOrCreate('context', this.context);
            this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_DARK);
        }
        catch (err) {
            hilog.error(DOMAIN, 'testTag', 'Failed to set colorMode. Cause: %{public}s', JSON.stringify(err));
        }
        hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onCreate');
    }
    onDestroy(): void {
        hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        try {
            AppStorage.setOrCreate('windowStage', windowStage);
            WindowUtil.getInstance().setWindowStage(windowStage);
            let windowClass: window.Window = windowStage.getMainWindowSync();
            windowClass.setWindowLayoutFullScreen(true)
                .catch(() => {
                hilog.error(DOMAIN, 'testTag', 'setWindowLayoutFullScreen is failed.');
            });
            // Main window is created, set main page for this ability
            hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
            windowStage.loadContent('pages/Index', (err) => {
                if (err.code) {
                    hilog.error(DOMAIN, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
                    return;
                }
                hilog.info(DOMAIN, 'testTag', 'Succeeded in loading the content.');
            });
        }
        catch (err) {
            hilog.error(DOMAIN, 'testTag', 'getMainWindowSync failed.');
        }
    }
    onWindowStageDestroy(): void {
        // Main window is destroyed, release UI related resources
        hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground(): void {
        // Ability has brought to foreground
        hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground(): void {
        // Ability has back to background
        hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onBackground');
    }
}
