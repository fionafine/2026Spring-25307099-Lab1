import type common from "@ohos:app.ability.common";
import type { WantAgent } from "@ohos:app.ability.wantAgent";
import wantAgent from "@ohos:app.ability.wantAgent";
import avSession from "@ohos:multimedia.avsession";
import type { VideoInfo } from '../module/VideoInfo';
import { BackgroundTaskManager } from "@normalized:N&&&entry/src/main/ets/utils/BackgroundTaskManager&";
import Logger from "@normalized:N&&&entry/src/main/ets/utils/Logger&";
const TAG = '[AVSessionController]';
export class AVSessionController {
    private static instance: AVSessionController | undefined = undefined;
    private context: common.UIAbilityContext | undefined = AppStorage.get('context');
    private avSession: avSession.AVSession | undefined = undefined;
    private constructor() {
        this.initAVSession();
    }
    public static getInstance(): AVSessionController {
        if (!AVSessionController.instance) {
            AVSessionController.instance = new AVSessionController();
        }
        return AVSessionController.instance;
    }
    // [Start init_AVSession]
    public initAVSession() {
        if (!this.context) {
            return;
        }
        // Create a session object of video type.
        avSession.createAVSession(this.context, 'LONG_VIDEO_SESSION', 'video')
            .then((data: avSession.AVSession) => {
            this.avSession = data;
            this.setLaunchAbility();
            BackgroundTaskManager.startContinuousTask(this.context);
            // Activate session.
            this.avSession.activate()
                .then(() => {
                Logger.info(TAG, `AVSession activate successed`);
            })
                .catch((err: BusinessError) => {
                BackgroundTaskManager.stopContinuousTask(this.context);
                Logger.error(TAG, `AVSession activate failed. code: ${err.code}, message: ${err.message}`);
            });
        })
            .catch((err: BusinessError) => {
            Logger.error(TAG, `Create AVSession failed. code: ${err.code}, message: ${err.message}`);
        });
    }
    // [End init_AVSession]
    public getAVSession() {
        return this.avSession;
    }
    // [Start set_AVMetadata]
    public setAVMetadata(curSource: VideoInfo, duration: number) {
        if (!curSource) {
            return;
        }
        try {
            // Set session metadata.
            let metadata: avSession.AVMetadata = {
                assetId: `${curSource.index}`,
                title: this.context?.resourceManager.getStringSync(curSource.name.id),
                duration: duration // Media duration
            };
            if (this.avSession) {
                this.avSession.setAVMetadata(metadata)
                    .catch((err: BusinessError) => {
                    Logger.error(TAG, `Set AVMetadata failed. code: ${err.code}, message: ${err.message}`);
                });
            }
        }
        catch (error) {
            let err = error as BusinessError;
            Logger.error(TAG, `getStringSync failed. code: ${err.code}, message: ${err.message}`);
        }
    }
    // [End set_AVMetadata]
    // [Start set_launch_Ability]
    public setLaunchAbility() {
        if (!this.context) {
            return;
        }
        const wantAgentInfo: wantAgent.WantAgentInfo = {
            wants: [
                {
                    bundleName: this.context.abilityInfo.bundleName,
                    abilityName: this.context.abilityInfo.name
                }
            ],
            actionType: wantAgent.OperationType.START_ABILITIES,
            requestCode: 0,
            actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
        };
        // Create WantAgent
        wantAgent.getWantAgent(wantAgentInfo)
            .then((agent: WantAgent) => {
            if (this.avSession) {
                // Set up a WantAgent to initiate the Ability of the session.
                this.avSession.setLaunchAbility(agent)
                    .catch((err: BusinessError) => {
                    Logger.error(TAG, `SetLaunchAbility failed. code: ${err.code}, message: ${err.message}`);
                });
            }
        })
            .catch((err: BusinessError) => {
            Logger.error(TAG, `Get wantAgent failed. code: ${err.code}, message: ${err.message}`);
        });
    }
    // [End set_launch_Ability]
    // [Start set_AVSession_play_state]
    // Set session playback status.
    public setAVSessionPlayState(playbackState: avSession.AVPlaybackState) {
        if (!this.avSession) {
            return;
        }
        this.avSession.setAVPlaybackState(playbackState, (err: BusinessError) => {
            if (err) {
                Logger.error(TAG, `SetAVPlaybackState failed. code: ${err.code}, message: ${err.message}`);
            }
            else {
                Logger.info('SetAVPlaybackState successfully');
            }
        });
    }
    // [End set_AVSession_play_state]
    public unregisterSessionListener() {
        if (!this.avSession) {
            return;
        }
        try {
            this.avSession.off('play');
            this.avSession.off('pause');
            this.avSession.off('seek');
            this.avSession.off('playPrevious');
            this.avSession.off('playNext');
            this.avSession.off('setLoopMode');
            BackgroundTaskManager.stopContinuousTask(this.context);
        }
        catch (error) {
            let err = error as BusinessError;
            Logger.error(TAG, `Unregister sessionListener failed. code: ${err.code}, message: ${err.message}`);
        }
    }
}
