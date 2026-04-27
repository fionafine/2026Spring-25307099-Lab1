if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    screenHeight?: number;
    windowUtil?: WindowUtil;
    videoController?: VideoController;
    avSessionController?: AVSessionController;
    timeoutID?: number;
    currentVideoStatus?: string;
    videoSrc?: Resource;
    isAutoPlay?: boolean;
    currentVideoIndex?: number;
    isFullScreen?: boolean;
    currentTime?: number;
    durationTime?: number;
    playbackSpeed?: string;
    curRate?: PlaybackSpeed;
    isMute?: boolean;
    visible?: boolean;
    volume?: number;
    curSource?: VideoInfo | undefined;
    isPlaying?: boolean;
    scrollVal?: number;
    deviceWidth?: number;
    deviceHeight?: number;
}
import { LengthMetrics } from "@ohos:arkui.node";
import window from "@ohos:window";
import avSession from "@ohos:multimedia.avsession";
import { VideoData } from "@normalized:N&&&entry/src/main/ets/module/VideoData&";
import type { VideoInfo } from '../module/VideoInfo';
import { WindowUtil } from "@normalized:N&&&entry/src/main/ets/utils/WindowUtil&";
import { FormatTime } from "@normalized:N&&&entry/src/main/ets/utils/FotmatTime&";
import { VolumeView } from "@normalized:N&&&entry/src/main/ets/view/VolumeView&";
import { AVSessionController } from "@normalized:N&&&entry/src/main/ets/controller/AVSessionController&";
import { SmallWidnowVideo } from "@normalized:N&&&entry/src/main/ets/view/SmallWidnowVideo&";
import { VideoListPage } from "@normalized:N&&&entry/src/main/ets/view/VideoListPage&";
import { VideoStatus } from "@normalized:N&&&entry/src/main/ets/constants/VideoStatus&";
import CommonConstants from "@normalized:N&&&entry/src/main/ets/constants/CommonConstants&";
import Logger from "@normalized:N&&&entry/src/main/ets/utils/Logger&";
const TAG = '[IndexPage]';
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.screenHeight = 0;
        this.windowUtil = WindowUtil.getInstance();
        this.videoController = new VideoController();
        this.avSessionController = AVSessionController.getInstance();
        this.timeoutID = 0;
        this.__currentVideoStatus = new ObservedPropertySimplePU('init', this, "currentVideoStatus");
        this.__videoSrc = new ObservedPropertyObjectPU({ "id": 0, "type": 30000, params: ['mountaineer.mp4'], "bundleName": "com.example.PlayLongVideosBasedOnVideo", "moduleName": "entry" }, this, "videoSrc");
        this.__isAutoPlay = new ObservedPropertySimplePU(false, this, "isAutoPlay");
        this.__currentVideoIndex = new ObservedPropertySimplePU(0, this, "currentVideoIndex");
        this.__isFullScreen = new ObservedPropertySimplePU(false, this, "isFullScreen");
        this.__currentTime = new ObservedPropertySimplePU(0, this, "currentTime");
        this.__durationTime = new ObservedPropertySimplePU(0, this, "durationTime");
        this.__playbackSpeed = new ObservedPropertySimplePU('1.0X', this, "playbackSpeed");
        this.__curRate = new ObservedPropertySimplePU(PlaybackSpeed.Speed_Forward_1_00_X, this, "curRate");
        this.__isMute = new ObservedPropertySimplePU(false, this, "isMute");
        this.__visible = new ObservedPropertySimplePU(false, this, "visible");
        this.__volume = new ObservedPropertySimplePU(5, this, "volume");
        this.__curSource = new ObservedPropertyObjectPU(undefined, this, "curSource");
        this.__isPlaying = new ObservedPropertySimplePU(false, this, "isPlaying");
        this.__scrollVal = new ObservedPropertySimplePU(0, this, "scrollVal");
        this.__deviceWidth = this.createStorageLink('deviceWidth', 0, "deviceWidth");
        this.__deviceHeight = this.createStorageLink('deviceHeight', 0, "deviceHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.screenHeight !== undefined) {
            this.screenHeight = params.screenHeight;
        }
        if (params.windowUtil !== undefined) {
            this.windowUtil = params.windowUtil;
        }
        if (params.videoController !== undefined) {
            this.videoController = params.videoController;
        }
        if (params.avSessionController !== undefined) {
            this.avSessionController = params.avSessionController;
        }
        if (params.timeoutID !== undefined) {
            this.timeoutID = params.timeoutID;
        }
        if (params.currentVideoStatus !== undefined) {
            this.currentVideoStatus = params.currentVideoStatus;
        }
        if (params.videoSrc !== undefined) {
            this.videoSrc = params.videoSrc;
        }
        if (params.isAutoPlay !== undefined) {
            this.isAutoPlay = params.isAutoPlay;
        }
        if (params.currentVideoIndex !== undefined) {
            this.currentVideoIndex = params.currentVideoIndex;
        }
        if (params.isFullScreen !== undefined) {
            this.isFullScreen = params.isFullScreen;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
        if (params.durationTime !== undefined) {
            this.durationTime = params.durationTime;
        }
        if (params.playbackSpeed !== undefined) {
            this.playbackSpeed = params.playbackSpeed;
        }
        if (params.curRate !== undefined) {
            this.curRate = params.curRate;
        }
        if (params.isMute !== undefined) {
            this.isMute = params.isMute;
        }
        if (params.visible !== undefined) {
            this.visible = params.visible;
        }
        if (params.volume !== undefined) {
            this.volume = params.volume;
        }
        if (params.curSource !== undefined) {
            this.curSource = params.curSource;
        }
        if (params.isPlaying !== undefined) {
            this.isPlaying = params.isPlaying;
        }
        if (params.scrollVal !== undefined) {
            this.scrollVal = params.scrollVal;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentVideoStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__videoSrc.purgeDependencyOnElmtId(rmElmtId);
        this.__isAutoPlay.purgeDependencyOnElmtId(rmElmtId);
        this.__currentVideoIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isFullScreen.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTime.purgeDependencyOnElmtId(rmElmtId);
        this.__durationTime.purgeDependencyOnElmtId(rmElmtId);
        this.__playbackSpeed.purgeDependencyOnElmtId(rmElmtId);
        this.__curRate.purgeDependencyOnElmtId(rmElmtId);
        this.__isMute.purgeDependencyOnElmtId(rmElmtId);
        this.__visible.purgeDependencyOnElmtId(rmElmtId);
        this.__volume.purgeDependencyOnElmtId(rmElmtId);
        this.__curSource.purgeDependencyOnElmtId(rmElmtId);
        this.__isPlaying.purgeDependencyOnElmtId(rmElmtId);
        this.__scrollVal.purgeDependencyOnElmtId(rmElmtId);
        this.__deviceWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__deviceHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentVideoStatus.aboutToBeDeleted();
        this.__videoSrc.aboutToBeDeleted();
        this.__isAutoPlay.aboutToBeDeleted();
        this.__currentVideoIndex.aboutToBeDeleted();
        this.__isFullScreen.aboutToBeDeleted();
        this.__currentTime.aboutToBeDeleted();
        this.__durationTime.aboutToBeDeleted();
        this.__playbackSpeed.aboutToBeDeleted();
        this.__curRate.aboutToBeDeleted();
        this.__isMute.aboutToBeDeleted();
        this.__visible.aboutToBeDeleted();
        this.__volume.aboutToBeDeleted();
        this.__curSource.aboutToBeDeleted();
        this.__isPlaying.aboutToBeDeleted();
        this.__scrollVal.aboutToBeDeleted();
        this.__deviceWidth.aboutToBeDeleted();
        this.__deviceHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private screenHeight: number; // Screen height.
    private windowUtil: WindowUtil;
    private videoController: VideoController;
    private avSessionController: AVSessionController;
    private timeoutID: number;
    private __currentVideoStatus: ObservedPropertySimplePU<string>;
    get currentVideoStatus() {
        return this.__currentVideoStatus.get();
    }
    set currentVideoStatus(newValue: string) {
        this.__currentVideoStatus.set(newValue);
    }
    private __videoSrc: ObservedPropertyObjectPU<Resource>;
    get videoSrc() {
        return this.__videoSrc.get();
    }
    set videoSrc(newValue: Resource) {
        this.__videoSrc.set(newValue);
    }
    private __isAutoPlay: ObservedPropertySimplePU<boolean>; // Whether to play automatically.
    get isAutoPlay() {
        return this.__isAutoPlay.get();
    }
    set isAutoPlay(newValue: boolean) {
        this.__isAutoPlay.set(newValue);
    }
    private __currentVideoIndex: ObservedPropertySimplePU<number>;
    get currentVideoIndex() {
        return this.__currentVideoIndex.get();
    }
    set currentVideoIndex(newValue: number) {
        this.__currentVideoIndex.set(newValue);
    }
    private __isFullScreen: ObservedPropertySimplePU<boolean>; // Whether to play in full screen.
    get isFullScreen() {
        return this.__isFullScreen.get();
    }
    set isFullScreen(newValue: boolean) {
        this.__isFullScreen.set(newValue);
    }
    private __currentTime: ObservedPropertySimplePU<number>; // Initialize the current time to 0.
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(newValue: number) {
        this.__currentTime.set(newValue);
    }
    private __durationTime: ObservedPropertySimplePU<number>; // Initialize the total video duration to 0.
    get durationTime() {
        return this.__durationTime.get();
    }
    set durationTime(newValue: number) {
        this.__durationTime.set(newValue);
    }
    private __playbackSpeed: ObservedPropertySimplePU<string>;
    get playbackSpeed() {
        return this.__playbackSpeed.get();
    }
    set playbackSpeed(newValue: string) {
        this.__playbackSpeed.set(newValue);
    }
    // [Start playback_speed]
    private __curRate: ObservedPropertySimplePU<PlaybackSpeed>; // Playback speed.
    get curRate() {
        return this.__curRate.get();
    }
    set curRate(newValue: PlaybackSpeed) {
        this.__curRate.set(newValue);
    }
    // [End playback_speed]
    private __isMute: ObservedPropertySimplePU<boolean>; // Play with mute or not.
    get isMute() {
        return this.__isMute.get();
    }
    set isMute(newValue: boolean) {
        this.__isMute.set(newValue);
    }
    private __visible: ObservedPropertySimplePU<boolean>; // Whether to display the brightness adjustment icon and slider.
    get visible() {
        return this.__visible.get();
    }
    set visible(newValue: boolean) {
        this.__visible.set(newValue);
    }
    private __volume: ObservedPropertySimplePU<number>;
    get volume() {
        return this.__volume.get();
    }
    set volume(newValue: number) {
        this.__volume.set(newValue);
    }
    private __curSource: ObservedPropertyObjectPU<VideoInfo | undefined>;
    get curSource() {
        return this.__curSource.get();
    }
    set curSource(newValue: VideoInfo | undefined) {
        this.__curSource.set(newValue);
    }
    private __isPlaying: ObservedPropertySimplePU<boolean>;
    get isPlaying() {
        return this.__isPlaying.get();
    }
    set isPlaying(newValue: boolean) {
        this.__isPlaying.set(newValue);
    }
    private __scrollVal: ObservedPropertySimplePU<number>;
    get scrollVal() {
        return this.__scrollVal.get();
    }
    set scrollVal(newValue: number) {
        this.__scrollVal.set(newValue);
    }
    private __deviceWidth: ObservedPropertyAbstractPU<number>;
    get deviceWidth() {
        return this.__deviceWidth.get();
    }
    set deviceWidth(newValue: number) {
        this.__deviceWidth.set(newValue);
    }
    private __deviceHeight: ObservedPropertyAbstractPU<number>;
    get deviceHeight() {
        return this.__deviceHeight.get();
    }
    set deviceHeight(newValue: number) {
        this.__deviceHeight.set(newValue);
    }
    aboutToAppear(): void {
        // 修复：取数组的第一个元素，而不是整个数组
        this.curSource = VideoData[0];
        this.initializeLandscapeMode();
        this.WindowSizeChange();
        try {
            // Get the width and height of the window.
            window.getLastWindow(this.getUIContext().getHostContext(), (err: BusinessError, data: window.Window) => {
                if (err.code) {
                    Logger.error(TAG, `getLastWindow failed. code: ${err.code}, message: ${err.message}`);
                    return;
                }
                this.screenHeight = data.getWindowProperties().windowRect.height;
            });
        }
        catch (error) {
            let err = error as BusinessError;
            Logger.error(TAG, `getWindowProperties failed. code: ${err.code}, message: ${err.message}`);
        }
        this.timeoutID = setTimeout(() => {
            this.setAVSessionListener();
        }, 100);
    }
    aboutToDisappear() {
        clearTimeout(this.timeoutID);
        this.windowUtil.registerOffWindowSizeChange();
        this.avSessionController.unregisterSessionListener();
    }
    onPageShow() {
        this.sessionPlay();
    }
    onPageHide() {
        this.sessionPause();
    }
    onBackPress() {
        if (this.isFullScreen) {
            this.isFullScreen = false;
            this.windowUtil.setLandscapeMultiWindow(false);
            this.windowUtil.enableWindowSystemBar();
            this.windowUtil.setMainWindowOrientation(window.Orientation.USER_ROTATION_PORTRAIT);
            return true;
        }
        else {
            return false;
        }
    }
    // Initialize landscape mode.
    initializeLandscapeMode() {
        if (this.deviceWidth > this.deviceHeight) {
            this.isFullScreen = true;
            this.windowUtil.disableWindowSystemBar();
        }
        else {
            this.isFullScreen = false;
            this.windowUtil.enableWindowSystemBar();
        }
    }
    // Change in registration window size.
    WindowSizeChange() {
        this.windowUtil.registerOnWindowSizeChange((size) => {
            if (size.width > size.height) {
                this.isFullScreen = true;
                this.scrollVal = 0;
                this.windowUtil.disableWindowSystemBar();
            }
            else {
                this.isFullScreen = false;
                this.windowUtil.enableWindowSystemBar();
            }
        });
    }
    // [Start set_AVSession_listener]
    // Set AVSession to listen.
    public async setAVSessionListener() {
        if (!this.avSessionController) {
            return;
        }
        try {
            this.avSessionController.getAVSession()?.on('play', () => this.sessionPlay());
            this.avSessionController.getAVSession()?.on('pause', () => this.sessionPause());
            this.avSessionController.getAVSession()?.on('seek', (msTime: number) => {
                this.sessionSeek(msTime);
            });
            this.avSessionController.getAVSession()?.on('setLoopMode', () => {
            });
            this.avSessionController.getAVSession()?.on('playPrevious', () => this.changePlayVideo(true));
            this.avSessionController.getAVSession()?.on('playNext', () => this.changePlayVideo(false));
        }
        catch (error) {
            let err = error as BusinessError;
            Logger.error(TAG, `Set AVSession listener failed. code: ${err.code}, message: ${err.message}`);
        }
    }
    // [End set_AVSession_listener]
    // AVSession video playback.
    sessionPlay() {
        if (this.curSource) {
            this.avSessionController.setAVMetadata(this.curSource, this.durationTime * 1000);
        }
        this.videoController.start();
        this.isPlaying = true;
        this.updateIsPlay();
    }
    // AVSession video paused.
    sessionPause() {
        if (this.curSource) {
            this.avSessionController.setAVMetadata(this.curSource, this.durationTime * 1000);
        }
        this.videoController.pause();
        this.isPlaying = false;
        this.updateIsPlay();
    }
    // AVSession video jump playback.
    sessionSeek(msTime: number) {
        if (this.curSource) {
            this.avSessionController.setAVMetadata(this.curSource, this.durationTime * 1000);
        }
        this.isPlaying = true;
        this.updateIsPlay();
        this.videoController.setCurrentTime(msTime / 1000, SeekMode.Accurate);
        this.videoController.start();
    }
    // AVSession switches to the previous/next video.
    changePlayVideo(isPrevious: boolean) {
        if (!VideoData.length) {
            return;
        }
        if (isPrevious) {
            this.currentVideoIndex = (this.currentVideoIndex - 1 + VideoData.length) % VideoData.length;
        }
        else {
            this.currentVideoIndex = (this.currentVideoIndex + 1) % VideoData.length;
        }
        this.curSource = VideoData[this.currentVideoIndex];
        if (!this.curSource) {
            return;
        }
        this.videoSrc = this.curSource.videoSrc;
        // Stop the current playback and reset the status.
        this.videoController.stop();
        this.currentTime = 0;
        this.isPlaying = false;
        // Update metadata.
        this.avSessionController.setAVMetadata(this.curSource, this.durationTime * 1000);
        this.currentVideoStatus = VideoStatus.PLAY_STARTED;
        this.updateIsPlay();
        this.videoController.start();
        this.isAutoPlay = true;
    }
    // [Start update_play_status]
    // Update AVSession playback status.
    updateIsPlay() {
        this.avSessionController.setAVSessionPlayState({
            state: this.isPlaying ? avSession.PlaybackState.PLAYBACK_STATE_PLAY :
                avSession.PlaybackState.PLAYBACK_STATE_PAUSE,
            position: {
                elapsedTime: this.currentTime * 1000,
                updateTime: new Date().getTime() // Update time.
            },
            duration: this.durationTime * 1000,
            speed: this.curRate
        });
    }
    // [End update_play_status]
    // [Start speed_menu]
    // Playback speed setting.
    SpeedMenu(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Menu.create();
            Menu.width(80);
            Menu.font({
                size: 12
            });
            Menu.fontColor(Color.White);
            Menu.menuItemDivider({
                strokeWidth: LengthMetrics.vp(0.5),
                color: '#d5d5d5',
                mode: DividerMode.EMBEDDED_IN_MENU
            });
            Menu.backgroundColor('#ff202224');
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: '2.0X' });
            MenuItem.width('100%');
            MenuItem.onClick(() => {
                this.playbackSpeed = '2.0X';
                this.curRate = PlaybackSpeed.Speed_Forward_2_00_X;
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: '1.75X' });
            MenuItem.width('100%');
            MenuItem.onClick(() => {
                this.playbackSpeed = '1.75X';
                this.curRate = PlaybackSpeed.Speed_Forward_1_75_X;
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: '1.25X' });
            MenuItem.width('100%');
            MenuItem.onClick(() => {
                this.playbackSpeed = '1.25X';
                this.curRate = PlaybackSpeed.Speed_Forward_1_25_X;
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ content: '1.0X' });
            MenuItem.width('100%');
            MenuItem.onClick(() => {
                this.playbackSpeed = '1.0X';
                this.curRate = PlaybackSpeed.Speed_Forward_1_00_X;
            });
        }, MenuItem);
        MenuItem.pop();
        Menu.pop();
    }
    // [End speed_menu]
    // Non-full screen playback.
    VideoControllerBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 4 });
            Row.width('100%');
            Row.position({ y: 180 });
            Row.alignItems(VerticalAlign.Center);
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(FormatTime.getTimesBySecond(this.currentTime));
            Text.fontSize(12);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start seek_play_video]
            Slider.create({
                value: this.currentTime,
                max: this.durationTime,
                step: 1
            });
            // [Start seek_play_video]
            Slider.width('50%');
            // [Start seek_play_video]
            Slider.trackColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.PlayLongVideosBasedOnVideo", "moduleName": "entry" });
            // [Start seek_play_video]
            Slider.onChange((value) => {
                this.videoController.setCurrentTime(value, SeekMode.Accurate);
            });
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [End seek_play_video]
            Text.create(FormatTime.getTimesBySecond(this.durationTime));
            // [End seek_play_video]
            Text.fontSize(12);
            // [End seek_play_video]
            Text.fontColor(Color.White);
        }, Text);
        // [End seek_play_video]
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // +++ 添加倍速按钮 +++
            Column.create();
            // +++ 添加倍速按钮 +++
            Column.width(48);
            // +++ 添加倍速按钮 +++
            Column.height(24);
            // +++ 添加倍速按钮 +++
            Column.padding(4);
            // +++ 添加倍速按钮 +++
            Column.border({
                width: 2,
                color: Color.White,
                radius: 12
            });
            // +++ 添加倍速按钮 +++
            Column.bindMenu({ builder: this.SpeedMenu.bind(this) });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.playbackSpeed);
            Text.fontSize(12);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        // +++ 添加倍速按钮 +++
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777236, "type": 20000, params: [], "bundleName": "com.example.PlayLongVideosBasedOnVideo", "moduleName": "entry" });
            Image.width('24vp');
            Image.height('24vp');
            Image.onClick(() => {
                this.isFullScreen = !this.isFullScreen;
                if (this.isFullScreen) {
                    this.windowUtil.setLandscapeMultiWindow(true);
                    // [Start to_full_screen]
                    this.windowUtil.disableWindowSystemBar();
                    this.windowUtil.setMainWindowOrientation(window.Orientation.USER_ROTATION_LANDSCAPE);
                    // [End to_full_screen]
                }
            });
        }, Image);
        Row.pop();
    }
    // Full screen playback.
    FullScreenVideoControllerBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
            Row.height('40%');
            Row.position({ y: '73%' });
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(FormatTime.getTimesBySecond(this.currentTime));
            Text.fontSize(12);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                value: this.currentTime,
                max: this.durationTime,
                step: 1
            });
            Slider.width('65%');
            Slider.trackColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.PlayLongVideosBasedOnVideo", "moduleName": "entry" });
            Slider.onChange((value) => {
                this.videoController.setCurrentTime(value, SeekMode.Accurate);
            });
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(FormatTime.getTimesBySecond(this.durationTime));
            Text.fontSize(12);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(48);
            Column.height(24);
            Column.padding(4);
            Column.border({
                width: 2,
                color: Color.White,
                radius: 12
            });
            Column.bindMenu({ builder: this.SpeedMenu.bind(this) });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.playbackSpeed);
            Text.fontSize(12);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.isMute || this.volume === 0.0 ? { "id": 16777239, "type": 20000, params: [], "bundleName": "com.example.PlayLongVideosBasedOnVideo", "moduleName": "entry" } : { "id": 16777246, "type": 20000, params: [], "bundleName": "com.example.PlayLongVideosBasedOnVideo", "moduleName": "entry" });
            Image.width('24vp');
            Image.height('24vp');
            Image.onClick(() => {
                this.isMute = !this.isMute;
                if (this.isMute) {
                    this.volume = 0.0;
                }
                else {
                    this.volume = 0.5;
                }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.PlayLongVideosBasedOnVideo", "moduleName": "entry" });
            Image.width('24vp');
            Image.height('24vp');
            Image.onClick(() => {
                this.isFullScreen = !this.isFullScreen;
                if (!this.isFullScreen) {
                    this.windowUtil.setLandscapeMultiWindow(false);
                    // [Start disabled_full_screen]
                    this.windowUtil.enableWindowSystemBar();
                    this.windowUtil.setMainWindowOrientation(window.Orientation.USER_ROTATION_PORTRAIT);
                    // [Start disabled_full_screen]
                }
            });
        }, Image);
        Row.pop();
    }
    // Range limit for input values.
    private getValidValue(inputVal: number, minVal: number, maxVal: number): number {
        // When the input value exceeds the maximum value, take the maximum value.
        inputVal = Math.min(inputVal, maxVal);
        // Lower limit limit: When the input value is less than the minimum value, take the minimum value.
        inputVal = Math.max(inputVal, minVal);
        return inputVal;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start scroll_onWillScroll]
            Scroll.create();
            // [Start scroll_onWillScroll]
            Scroll.width('100%');
            // [Start scroll_onWillScroll]
            Scroll.height('100%');
            // [Start scroll_onWillScroll]
            Scroll.scrollBar(BarState.Off);
            // [Start scroll_onWillScroll]
            Scroll.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
            // [Start scroll_onWillScroll]
            Scroll.onWillScroll((_xOffset: number, yOffset: number) => {
                this.scrollVal += yOffset;
            });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude scroll_onWillScroll]
            Column.create({ space: CommonConstants.COMPONENT_SPACE });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.onClick(() => {
                if (this.currentVideoStatus === VideoStatus.PLAY_STARTED) {
                    this.videoController.pause();
                    this.isPlaying = false;
                    this.updateIsPlay();
                }
                else {
                    this.videoController.start();
                    this.isPlaying = true;
                    this.updateIsPlay();
                }
            });
            Gesture.create(GesturePriority.Low);
            LongPressGesture.create({ repeat: true });
            LongPressGesture.onAction(() => {
                this.playbackSpeed = '2.0X';
                this.curRate = PlaybackSpeed.Speed_Forward_2_00_X;
            });
            LongPressGesture.onActionEnd(() => {
                this.playbackSpeed = '1.0X';
                this.curRate = PlaybackSpeed.Speed_Forward_1_00_X;
            });
            LongPressGesture.pop();
            Gesture.pop();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.create({
                src: this.videoSrc,
                controller: this.videoController,
                currentProgressRate: this.curRate,
                posterOptions: {
                    showFirstFrame: true,
                }
            });
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.width(this.isFullScreen ? '80%' : '100%');
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.height(this.isFullScreen ? '100%' : 220);
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.muted(this.isMute);
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.autoPlay(this.isAutoPlay);
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.loop(true);
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.controls(false);
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.onPrepared((event) => {
                this.currentVideoStatus = VideoStatus.PLAY_PREPARED;
                if (event) {
                    this.durationTime = event.duration;
                    if (this.curSource) {
                        this.avSessionController.setAVMetadata(ObservedObject.GetRawObject(this.curSource), event.duration * 1000);
                    }
                }
            });
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.onStart(() => {
                this.isPlaying = true;
                this.currentVideoStatus = VideoStatus.PLAY_STARTED;
                this.updateIsPlay();
            });
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.onPause(() => {
                this.currentVideoStatus = VideoStatus.PLAY_PAUSED;
                this.updateIsPlay();
            });
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.onFinish(() => {
                this.currentVideoStatus = VideoStatus.PLAY_FINISHED;
            });
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.onStop(() => {
                this.currentVideoStatus = VideoStatus.PLAY_STOPPED;
            });
            // [Start previewUri_pic2]
            // [Start controls]
            // [Start currentProgressRate]
            // [Start loop_play_video]
            Video.onUpdate((event) => {
                if (event) {
                    this.currentTime = event.time;
                    this.updateIsPlay();
                }
            });
        }, Video);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isFullScreen) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Gesture.create(GesturePriority.Low);
                        GestureGroup.create(GestureMode.Exclusive);
                        // [Start set_volume]
                        // Bind the swipe gesture event.
                        PanGesture.create({ direction: PanDirection.Vertical });
                        // [Start set_volume]
                        // Bind the swipe gesture event.
                        PanGesture.onActionStart(() => {
                        });
                        // [Start set_volume]
                        // Bind the swipe gesture event.
                        PanGesture.onActionUpdate((event: GestureEvent) => {
                            this.visible = false;
                            // Current Volume value = Volume value - Vertical offset (physical pixels) of the gesture / Screen height.
                            let curVolume = this.volume - this.getUIContext().vp2px(event.offsetY) / this.screenHeight;
                            // Limit the volume range between 0 and 15.
                            curVolume = this.getValidValue(curVolume, CommonConstants.MIN_VOLUME, CommonConstants.MAX_VOLUME);
                            if (curVolume === 0) {
                                this.isMute = true;
                            }
                            else {
                                this.isMute = false;
                            }
                            this.volume = curVolume;
                        });
                        // [Start set_volume]
                        // Bind the swipe gesture event.
                        PanGesture.onActionEnd(() => {
                            setTimeout(() => {
                                this.visible = false;
                            }, 1500);
                        });
                        // [Start set_volume]
                        // Bind the swipe gesture event.
                        PanGesture.pop();
                        // [End set_volume]
                        // [Start LongPressGesture]
                        LongPressGesture.create({ repeat: true });
                        // [End set_volume]
                        // [Start LongPressGesture]
                        LongPressGesture.onAction(() => {
                            this.playbackSpeed = '2.0X';
                            this.curRate = PlaybackSpeed.Speed_Forward_2_00_X;
                        });
                        // [End set_volume]
                        // [Start LongPressGesture]
                        LongPressGesture.onActionEnd(() => {
                            this.playbackSpeed = '1.0X';
                            this.curRate = PlaybackSpeed.Speed_Forward_1_00_X;
                        });
                        // [End set_volume]
                        // [Start LongPressGesture]
                        LongPressGesture.pop();
                        GestureGroup.pop();
                        Gesture.pop();
                    }, Stack);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new VolumeView(this, {
                                    visible: this.visible,
                                    volume: this.volume,
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 481, col: 17 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        visible: this.visible,
                                        volume: this.volume
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    visible: this.visible,
                                    volume: this.volume
                                });
                            }
                        }, { name: "VolumeView" });
                    }
                    this.FullScreenVideoControllerBuilder.bind(this)();
                    Stack.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.VideoControllerBuilder.bind(this)();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentVideoStatus !== VideoStatus.PLAY_STARTED) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777240, "type": 20000, params: [], "bundleName": "com.example.PlayLongVideosBasedOnVideo", "moduleName": "entry" });
                        Image.width(36);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Video list area.
            if (!this.isFullScreen) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new VideoListPage(this, {
                                    currentVideoIndex: this.__currentVideoIndex,
                                    videoSrc: this.__videoSrc,
                                    isAutoPlay: this.__isAutoPlay,
                                    curSource: this.__curSource,
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 563, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentVideoIndex: this.currentVideoIndex,
                                        videoSrc: this.videoSrc,
                                        isAutoPlay: this.isAutoPlay,
                                        curSource: this.curSource
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "VideoListPage" });
                    }
                });
            }
            else // [EndExclude scroll_onWillScroll]
             {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // [StartExclude scroll_onWillScroll]
        Column.pop();
        // [Start scroll_onWillScroll]
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // [End scroll_onWillScroll]
            // [Start small_window_video]
            // Play in a small window.
            if (this.scrollVal >= 240 && this.isPlaying && !this.isFullScreen) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SmallWidnowVideo(this, {
                                    videoSrc: this.videoSrc,
                                    curRate: this.curRate,
                                    isMute: this.isMute,
                                    currentTime: this.currentTime,
                                    isPlaying: this.__isPlaying,
                                    videoController: this.videoController,
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 589, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        videoSrc: this.videoSrc,
                                        curRate: this.curRate,
                                        isMute: this.isMute,
                                        currentTime: this.currentTime,
                                        isPlaying: this.isPlaying,
                                        videoController: this.videoController
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    videoSrc: this.videoSrc,
                                    curRate: this.curRate,
                                    isMute: this.isMute,
                                    currentTime: this.currentTime
                                });
                            }
                        }, { name: "SmallWidnowVideo" });
                    }
                });
            }
            // [End small_window_video]
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.PlayLongVideosBasedOnVideo", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
