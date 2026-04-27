if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VideoListPage_Params {
    currentVideoIndex?: number;
    videoSrc?: Resource;
    isAutoPlay?: boolean;
    curSource?: VideoInfo;
}
import CommonConstants from "@normalized:N&&&entry/src/main/ets/constants/CommonConstants&";
import { VideoData } from "@normalized:N&&&entry/src/main/ets/module/VideoData&";
import type { VideoInfo } from '../module/VideoInfo';
export class VideoListPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentVideoIndex = new SynchedPropertySimpleTwoWayPU(params.currentVideoIndex, this, "currentVideoIndex");
        this.__videoSrc = new SynchedPropertyObjectTwoWayPU(params.videoSrc, this, "videoSrc");
        this.__isAutoPlay = new SynchedPropertySimpleTwoWayPU(params.isAutoPlay, this, "isAutoPlay");
        this.__curSource = new SynchedPropertyObjectTwoWayPU(params.curSource, this, "curSource");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VideoListPage_Params) {
    }
    updateStateVars(params: VideoListPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentVideoIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__videoSrc.purgeDependencyOnElmtId(rmElmtId);
        this.__isAutoPlay.purgeDependencyOnElmtId(rmElmtId);
        this.__curSource.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentVideoIndex.aboutToBeDeleted();
        this.__videoSrc.aboutToBeDeleted();
        this.__isAutoPlay.aboutToBeDeleted();
        this.__curSource.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentVideoIndex: SynchedPropertySimpleTwoWayPU<number>;
    get currentVideoIndex() {
        return this.__currentVideoIndex.get();
    }
    set currentVideoIndex(newValue: number) {
        this.__currentVideoIndex.set(newValue);
    }
    private __videoSrc: SynchedPropertySimpleOneWayPU<Resource>;
    get videoSrc() {
        return this.__videoSrc.get();
    }
    set videoSrc(newValue: Resource) {
        this.__videoSrc.set(newValue);
    }
    private __isAutoPlay: SynchedPropertySimpleTwoWayPU<boolean>;
    get isAutoPlay() {
        return this.__isAutoPlay.get();
    }
    set isAutoPlay(newValue: boolean) {
        this.__isAutoPlay.set(newValue);
    }
    private __curSource: SynchedPropertySimpleOneWayPU<VideoInfo>;
    get curSource() {
        return this.__curSource.get();
    }
    set curSource(newValue: VideoInfo) {
        this.__curSource.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: CommonConstants.COMPONENT_SPACE });
            Column.padding({
                left: CommonConstants.PADDING_VALUE,
                right: CommonConstants.PADDING_VALUE
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.PlayLongVideosBasedOnVideo", "moduleName": "entry" });
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: CommonConstants.COMPONENT_SPACE });
                    Row.onClick(() => {
                        this.videoSrc = item.videoSrc;
                        this.isAutoPlay = true;
                        this.currentVideoIndex = index;
                        this.curSource = item;
                    });
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item.previewUri);
                    Image.width(120);
                    Image.height(90);
                    Image.borderRadius(8);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create();
                    Text.fontColor(this.currentVideoIndex === index ? '#ff317af7' : Color.White);
                }, Text);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.currentVideoIndex === index) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                SymbolSpan.create({ "id": 125833306, "type": 40000, params: [], "bundleName": "com.example.PlayLongVideosBasedOnVideo", "moduleName": "entry" });
                                SymbolSpan.width('20vp');
                                SymbolSpan.height('20vp');
                            }, SymbolSpan);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Span.create(item.description);
                }, Span);
                Text.pop();
                Row.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, VideoData, forEachItemGenFunction, (item: VideoInfo) => JSON.stringify(item.index), true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
