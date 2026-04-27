/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { common, wantAgent } from '@kit.AbilityKit';
import { backgroundTaskManager } from '@kit.BackgroundTasksKit'
import Logger from './Logger';

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
        backgroundTaskManager.startBackgroundRunning(context, backgroundTaskManager.BackgroundMode.AUDIO_PLAYBACK,
          agentObj)
          .then(() => {
            Logger.info('startBackgroundRunning succeed.');
          })
          .catch((err: BusinessError) => {
            Logger.error(TAG, `startBackgroundRunning failed. code: ${err.code}, message: ${err.message}`);
          })
      })
      .catch((err: BusinessError) => {
        Logger.error(TAG, `getWantAgent failed. code: ${err.code}, message: ${err.message}`);
      })
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
        })
    } else {
      Logger.error(TAG, `Current device is not support.`);
    }
  }
}