if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SmallWidnowVideo_Params {
    videoSrc?: Resource;
    curRate?: PlaybackSpeed;
    isMute?: boolean;
    currentTime?: number;
    isPlaying?: boolean;
    videoController?: VideoController;
}
export class SmallWidnowVideo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__videoSrc = new SynchedPropertyObjectOneWayPU(params.videoSrc, this, "videoSrc");
        this.__curRate = new SynchedPropertySimpleOneWayPU(params.curRate, this, "curRate");
        this.__isMute = new SynchedPropertySimpleOneWayPU(params.isMute, this, "isMute");
        this.__currentTime = new SynchedPropertySimpleOneWayPU(params.currentTime, this, "currentTime");
        this.__isPlaying = new SynchedPropertySimpleTwoWayPU(params.isPlaying, this, "isPlaying");
        this.videoController = new VideoController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SmallWidnowVideo_Params) {
        if (params.videoController !== undefined) {
            this.videoController = params.videoController;
        }
    }
    updateStateVars(params: SmallWidnowVideo_Params) {
        this.__videoSrc.reset(params.videoSrc);
        this.__curRate.reset(params.curRate);
        this.__isMute.reset(params.isMute);
        this.__currentTime.reset(params.currentTime);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__videoSrc.purgeDependencyOnElmtId(rmElmtId);
        this.__curRate.purgeDependencyOnElmtId(rmElmtId);
        this.__isMute.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTime.purgeDependencyOnElmtId(rmElmtId);
        this.__isPlaying.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__videoSrc.aboutToBeDeleted();
        this.__curRate.aboutToBeDeleted();
        this.__isMute.aboutToBeDeleted();
        this.__currentTime.aboutToBeDeleted();
        this.__isPlaying.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // [StartExclude small_widnow_video]
    private __videoSrc: SynchedPropertySimpleOneWayPU<Resource>;
    get videoSrc() {
        return this.__videoSrc.get();
    }
    set videoSrc(newValue: Resource) {
        this.__videoSrc.set(newValue);
    }
    private __curRate: SynchedPropertySimpleOneWayPU<PlaybackSpeed>;
    get curRate() {
        return this.__curRate.get();
    }
    set curRate(newValue: PlaybackSpeed) {
        this.__curRate.set(newValue);
    }
    private __isMute: SynchedPropertySimpleOneWayPU<boolean>;
    get isMute() {
        return this.__isMute.get();
    }
    set isMute(newValue: boolean) {
        this.__isMute.set(newValue);
    }
    private __currentTime: SynchedPropertySimpleOneWayPU<number>;
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(newValue: number) {
        this.__currentTime.set(newValue);
    }
    private __isPlaying: SynchedPropertySimpleTwoWayPU<boolean>;
    get isPlaying() {
        return this.__isPlaying.get();
    }
    set isPlaying(newValue: boolean) {
        this.__isPlaying.set(newValue);
    }
    private videoController: VideoController;
    // [EndExclude small_widnow_video]
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(160);
            Column.height(96);
            Column.position({
                right: 16,
                top: '50%'
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Video.create({
                src: this.videoSrc,
                controller: this.videoController,
                currentProgressRate: this.curRate,
                posterOptions: {
                    showFirstFrame: true,
                }
            });
            Video.borderRadius(8);
            Video.shadow({
                radius: 50,
                color: '#8000001E',
                offsetX: 0,
                offsetY: 10,
            });
            Video.muted(this.isMute);
            Video.autoPlay(true);
            Video.controls(false);
            Video.loop(true);
            Video.onPrepared((event) => {
                this.videoController.start();
                if (event) {
                    this.videoController.setCurrentTime(this.currentTime, SeekMode.Accurate);
                }
            });
            Video.onUpdate((event) => {
                if (event) {
                    this.currentTime = event.time;
                }
            });
        }, Video);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.PlayLongVideosBasedOnVideo", "moduleName": "entry" });
            Image.width(16);
            Image.height(16);
            Image.position({
                right: 12,
                top: 12
            });
            Image.onClick(() => {
                this.videoController.pause();
                this.isPlaying = false;
            });
        }, Image);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
