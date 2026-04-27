import type window from "@ohos:window";
import Logger from "@normalized:N&&&entry/src/main/ets/utils/Logger&";
const TAG = '[WindowUtil]';
export class WindowUtil {
    private static instance: WindowUtil;
    private windowStage: window.WindowStage | undefined = undefined;
    private mainWindowClass: window.Window | undefined = undefined;
    private constructor() {
    }
    public static getInstance(): WindowUtil {
        if (!WindowUtil.instance) {
            WindowUtil.instance = new WindowUtil();
        }
        return WindowUtil.instance;
    }
    public setWindowStage(windowStage: window.WindowStage): void {
        this.windowStage = windowStage;
        this.windowStage?.getMainWindow((err: BusinessError, windowClass: window.Window) => {
            if (err.code) {
                Logger.error(`Failed to obtain the main window. Cause code: ${err.code}, message: ${err.message}`);
                return;
            }
            this.mainWindowClass = windowClass;
            try {
                const properties = windowClass.getWindowProperties();
                AppStorage.setOrCreate('deviceWidth', properties.windowRect.width);
                AppStorage.setOrCreate('deviceHeight', properties.windowRect.height);
            }
            catch (error) {
                let err = error as BusinessError;
                Logger.error(`Failed to getWindowProperties. Cause code: ${err.code}, message: ${err.message}`);
            }
        });
    }
    // [Start set_main_window_orientation]
    public setMainWindowOrientation(orientation: window.Orientation) {
        if (!this.mainWindowClass) {
            return;
        }
        this.mainWindowClass.setPreferredOrientation(orientation)
            .then(() => {
            Logger.info('setPreferredOrientation succeed.');
        })
            .catch((err: BusinessError) => {
            Logger.error(TAG, `setPreferredOrientation failed. code: ${err.code}, message: ${err.message}`);
        });
    }
    // [End set_main_window_orientation]
    // [Start enable_window_systemBar]
    // Display the status bar of the main window and the bottom navigation.
    public enableWindowSystemBar(): void {
        if (!this.mainWindowClass) {
            return;
        }
        this.mainWindowClass.setWindowSystemBarEnable(['status', 'navigation'])
            .catch((err: BusinessError) => {
            Logger.error(TAG, `setWindowSystemBarEnable failed. code: ${err.code}, message: ${err.message}`);
        });
    }
    // [End enable_window_systemBar]
    // [Start disable_window_systemBar]
    // Disable the status bar and bottom navigation of the main window.
    public disableWindowSystemBar(): void {
        if (!this.mainWindowClass) {
            return;
        }
        this.mainWindowClass.setWindowSystemBarEnable([])
            .catch((err: BusinessError) => {
            Logger.error(TAG, `setWindowSystemBarEnable failed. code: ${err.code}, message: ${err.message}`);
        });
    }
    // [End disable_window_systemBar]
    public setLandscapeMultiWindow(enable: boolean) {
        if (!this.mainWindowClass) {
            return;
        }
        if (enable) {
            this.mainWindowClass.enableLandscapeMultiWindow()
                .then(() => {
                Logger.info('enableLandscapeMultiWindow succeed.');
            })
                .catch((err: BusinessError) => {
                Logger.error(TAG, `enableLandscapeMultiWindow failed. code: ${err.code}, message: ${err.message}`);
            });
        }
        else {
            this.mainWindowClass.disableLandscapeMultiWindow()
                .then(() => {
                Logger.info('disableLandscapeMultiWindow succeed.');
            })
                .catch((err: BusinessError) => {
                Logger.error(TAG, `disableLandscapeMultiWindow failed. code: ${err.code}, message: ${err.message}`);
            });
        }
    }
    // Register for the window size change event.
    registerOnWindowSizeChange(callback?: (size: window.Size) => void) {
        if (!this.mainWindowClass) {
            return;
        }
        this.mainWindowClass.on('windowSizeChange', (size) => {
            AppStorage.setOrCreate('deviceHeight', size.height);
            callback?.(size);
        });
    }
    // Cancel the event of monitoring window size changes.
    registerOffWindowSizeChange() {
        if (!this.mainWindowClass) {
            return;
        }
        this.mainWindowClass.off('windowSizeChange');
    }
}
