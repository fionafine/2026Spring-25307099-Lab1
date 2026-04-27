# 基于Video组件播放长视频 - 个性化增强版

## 项目简介

本示例基于Video组件实现了播放长视频功能，指导开发者如何通过Video组件实现长视频播放，如：基础播控、视频首帧显示、自定义播放进度条、前台小窗播放、循环播放、视频全屏播放、视频音量设置、静音播放、长按倍速播放、点击选择倍速播放、接入播控中心等功能场景。

**本版本在原有基础上进行了以下个性化增强：**
-  在非全屏模式下增加倍速按钮，方便用户快速调速
-  优化长按倍速交互体验
-  修复视频源类型错误

## 效果预览

| 首页 | 小窗播放 | 接入播控中心 |
|------|---------|-------------|
| <img src='./screenshots/device/homePage.png' width=320> | <img src='./screenshots/device/smallVideo.png' width=320> | <img src='./screenshots/device/avSession.png' width=320> |

| 横屏-音量调节 |
|-------------|
| <img src='./screenshots/device/volume.png' width=320> |

## 使用说明

1. 安装进入应用。
2. 点击视频区域播放/暂停播放本地视频，并可通过点击视频列表内容切换视频。
3. 点击Slider实现视频跳转播放。
4. 点击右下角按钮，进入全屏播放。
5. 进入全屏后：
   - 滑动视频左侧区域，实现音量调节。
   - 点击播放速度按钮，选择视频播放倍速（0.75x、1.0x、1.25x、1.5x、1.75x、2.0x）。
   - **长按视频区域，实现视频倍速播放（2.0x 临时加速，松手恢复）。**
   - 点击右下角静音按钮，实现静音播放。
6. **【新增】非全屏模式下，播放器控制栏也支持倍速按钮，可直接点击切换倍速。**
7. 视频播放时，通过播控中心控制视频的播放、暂停、跳转播放、播放上一个/下一个视频。

## 工程目录
├──entry/src/main/ets
│  ├──constants
│  │  ├──CommonConstants.ets            // 常量
│  │  └──VideoStatus.ets                // Video状态
│  ├──controller
│  │  └──AVSessionController.ets        // AVSession控制类
│  ├──entryability
│  │  └──EntryAbility.ets               // 程序入口
│  ├──entrybackupability
│  │  └──EntryBackupAbility.ets         // 备份恢复类
│  ├──module
│  │  ├──VideoData.ets                  // Video数据
│  │  └──VideoType.ets                  // Video类型接口
│  ├──pages
│  │  └──Index.ets                      // Video视频播放页
│  └──utils
│  │  ├──BackgroundTaskManager.ets      // 后台任务管理类
│  │  ├──FotmatTime.ets                 // 时间格式转换工具类
│  │  ├──Logger.ets                     // 日志打印类
│  │  └──WindowUtil.ets                 // 窗口类
│  └──view
│     ├──SmallVideo.ets                 // 小窗播放视频页面
│     ├──VideoList.ets                  // 视频列表页面
│     └──VolumeView.ets                 // 音量调节
└──entry/src/main/resources             // 应用资源目录

## 具体实现

### 原有功能
- 基于Video组件实现视频的基本播控，如：视频首帧显示、播放、暂停、循环播放、倍速播放、静音播放等功能。
- 结合Slider组件实现自定义播放进度条，点击进度条实现视频跳转播放。
- 结合自定义组件实现滑动视频列表区域，实现视频小窗播放。
- 通过窗口管理器WindowStage实现视频播放时，横屏和竖屏状态的切换控制。
- 通过AVSession和backgroundTaskManager实现视频接入播控中心，及通过播控中心控制视频播放、暂停、跳转播放、播放上一个/下一个视频等功能。

### 本次新增/修改

#### 1. 非全屏倍速按钮（Index.ets）
在 `VideoControllerBuilder()` 中添加倍速按钮，支持非全屏模式下快速切换播放速度。

```typescript
Column() {
  Text(this.playbackSpeed)
    .fontSize(12)
    .fontColor(Color.White)
}
.width(48)
.height(24)
.padding(4)
.border({ width: 2, color: Color.White, radius: 12 })
.bindMenu(this.SpeedMenu)
2. 长按倍速优化（Index.ets）
在 build() 方法中增加长按手势，长按视频区域时临时加速至 2.0 倍速，松手后恢复原速。

typescript
.gesture(
  LongPressGesture({ repeat: true })
    .onAction(() => {
      this.playbackSpeed = '2.0X';
      this.curRate = PlaybackSpeed.Speed_Forward_2_00_X;
    })
    .onActionEnd(() => {
      this.playbackSpeed = '1.0X';
      this.curRate = PlaybackSpeed.Speed_Forward_1_00_X;
    })
)
3. 类型错误修复
修复 aboutToAppear() 中 this.curSource = VideoData 的类型错误，改为 VideoData[0]。

相关权限
ohos.permission.KEEP_BACKGROUND_RUNNING：允许Service Ability在后台持续运行。

约束与限制
本示例仅支持标准系统上运行，支持设备：直板机。

HarmonyOS系统：HarmonyOS 6.0.2 Release及以上。

DevEco Studio版本：DevEco Studio 6.0.2 Release及以上。

HarmonyOS SDK版本：HarmonyOS 6.0.2 Release SDK及以上。

个性化修改说明
修改项	修改前	修改后
非全屏倍速控制	无倍速按钮	控制栏增加倍速按钮，点击可选择倍速
长按倍速	仅全屏支持	全屏+非全屏均支持长按临时倍速
视频源初始化	VideoData（类型错误）	VideoData[0]（正确取第一个）
修改人： Fiona
修改日期： 2026年4月
