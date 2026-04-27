import type common from "@ohos:app.ability.common";
import wantAgent from "@ohos:app.ability.wantAgent";
import backgroundTaskManager from "@ohos:resourceschedule.backgroundTaskManager";
import Logger from "@normalized:N&&&entry/src/main/ets/utils/Logger&";
const TAG = '[BackgroundTaskManager]';
export class BackgroundTaskManager {
    public static startContinuousTask(context?: common.UIAbilityContext): void {
        if (!context) {
            return;
        }
        // Define WantAgentInfo information.
        let wantAgentInfo: wantAgent.WantAgentInfo = {
            wants: [
                {
                    bundleName: context.abilityInfo.bundleName,
                    abilityName: context.abilityInfo.name
                }
            ],
            actionType: wantAgent.OperationType.START_ABILITIES,
            requestCode: 0,
            actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
        };
        // Create WantAgent.
        wantAgent.getWantAgent(wantAgentInfo)
            .then((agentObj) => {
            // Apply for long-term tasks.
            backgroundTaskManager.startBackgroundRunning(context, backgroundTaskManager.BackgroundMode.AUDIO_PLAYBACK, agentObj)
                .then(() => {
                Logger.info('startBackgroundRunning succeed.');
            })
                .catch((err: BusinessError) => {
                Logger.error(TAG, `startBackgroundRunning failed. code: ${err.code}, message: ${err.message}`);
            });
        })
            .catch((err: BusinessError) => {
            Logger.error(TAG, `getWantAgent failed. code: ${err.code}, message: ${err.message}`);
        });
    }
    public static stopContinuousTask(context?: common.UIAbilityContext): void {
        if (!context) {
            return;
        }
        if (canIUse('SystemCapability.ResourceSchedule.BackgroundTaskManager.Core')) {
            // Cancel all long-term tasks under the current UIAbility.
            backgroundTaskManager.stopBackgroundRunning(context)
                .catch((err: BusinessError) => {
                Logger.error(TAG, `stopBackgroundRunning failed. code: ${err.code}, message: ${err.message}`);
            });
        }
        else {
            Logger.error(TAG, `Current device is not support.`);
        }
    }
}
