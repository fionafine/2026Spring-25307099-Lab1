if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VolumeView_Params {
    volume?: number;
    visible?: boolean;
}
import { AVVolumePanel } from "@ohos:multimedia.avVolumePanel";
export class VolumeView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__volume = new SynchedPropertySimpleOneWayPU(params.volume, this, "volume");
        this.__visible = new SynchedPropertySimpleOneWayPU(params.visible, this, "visible");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VolumeView_Params) {
    }
    updateStateVars(params: VolumeView_Params) {
        this.__volume.reset(params.volume);
        this.__visible.reset(params.visible);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__volume.purgeDependencyOnElmtId(rmElmtId);
        this.__visible.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__volume.aboutToBeDeleted();
        this.__visible.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __volume: SynchedPropertySimpleOneWayPU<number>;
    get volume() {
        return this.__volume.get();
    }
    set volume(newValue: number) {
        this.__volume.set(newValue);
    }
    private __visible: SynchedPropertySimpleOneWayPU<boolean>;
    get visible() {
        return this.__visible.get();
    }
    set visible(newValue: boolean) {
        this.__visible.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Volume adjustment.
            Column.create();
            // Volume adjustment.
            Column.width('50%');
            // Volume adjustment.
            Column.justifyContent(FlexAlign.Start);
            // Volume adjustment.
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // [Start AVVolumePanel]
                    AVVolumePanel(this, {
                        volumeLevel: this.volume,
                        volumeParameter: {
                            position: {
                                x: 150,
                                y: 300
                            }
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/VolumeView.ets", line: 28, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            volumeLevel: this.volume,
                            volumeParameter: {
                                position: {
                                    x: 150,
                                    y: 300
                                }
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        volumeLevel: this.volume,
                        volumeParameter: {
                            position: {
                                x: 150,
                                y: 300
                            }
                        }
                    });
                }
            }, { name: "AVVolumePanel" });
        }
        // Volume adjustment.
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
