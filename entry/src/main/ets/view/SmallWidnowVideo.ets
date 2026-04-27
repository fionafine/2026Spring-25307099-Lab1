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

// [Start small_widnow_video]
@Component
export struct SmallWidnowVideo {
  // [StartExclude small_widnow_video]
  @Prop videoSrc: Resource;
  @Prop curRate: PlaybackSpeed;
  @Prop isMute: boolean;
  @Prop currentTime: number;
  @Link isPlaying: boolean;
  videoController: VideoController = new VideoController();
  // [EndExclude small_widnow_video]

  build() {
    Column() {
      Video({
        src: this.videoSrc,
        controller: this.videoController,
        currentProgressRate: this.curRate, // Set playback speed.
        posterOptions: {
          showFirstFrame: true,
        }
      })
        // [StartExclude small_widnow_video]
        .borderRadius(8)
        .shadow({
          radius: 50,
          color: '#8000001E',
          offsetX: 0,
          offsetY: 10,
        })
        .muted(this.isMute) // Set whether to mute or not.
        .autoPlay(true) // Set whether to play automatically.
        .controls(false) // Set whether the control bar for controlling video playback is displayed.
        .loop(true) // loop playback
        // [EndExclude small_widnow_video]
        .onPrepared((event) => {
          this.videoController.start();
          if (event) {
            this.videoController.setCurrentTime(this.currentTime, SeekMode.Accurate);
          }
        })
        .onUpdate((event) => {
          if (event) {
            this.currentTime = event.time;
          }
        })
      Image($r('app.media.video_close'))
        // [StartExclude small_widnow_video]
        .width(16)
        .height(16)
        .position({
          right: 12,
          top: 12
        })
        .onClick(() => {
          this.videoController.pause();
          this.isPlaying = false;
        })
      // [EndExclude small_widnow_video]
    }
    // [StartExclude small_widnow_video]
    .width(160)
    .height(96)
    .position({
      right: 16,
      top: '50%'
    })
    // [EndExclude small_widnow_video]
  }
}
// [End small_widnow_video]