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
export class FormatTime {
    // Format time
    static getTimesBySecond(t: number) {
        let h = Math.floor(t / 60 / 60 % 24);
        let m = Math.floor(t / 60 % 60);
        let s = Math.floor(t % 60);
        let hs = h < 10 ? '0' + h : h;
        let ms = m < 10 ? '0' + m : m;
        let ss = s < 10 ? '0' + s : s;
        return `${hs}:${ms}:${ss}`;
    }
}
