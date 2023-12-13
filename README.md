# TTSMarker文本转语音SDK

## 安装

```sh
npm install ttsmarker-sdk
```

## 使用

### 引入

```js
const { createSDK } = require('ttsmarker-sdk')
```

或者

```js
import { createSDK } from 'ttsmarker-sdk'
```

### createSDK

```ts
function createSDK(token: string): TTSMarker
```

示例：

```js
const { createSDK } = require('ttsmarker-sdk')
const sdk = createSDK('你的TOKEN')
```

### TTSMarker

```ts
class TTSMarker {
  token: string;
  constructor(token: string);
  //  查看Token状态
  checkTokenStatus(): Promise<TokenStatus>;
  // 获取播音员列表
  getVoiceList(language?: VoiceLang): Promise<VoiceDetail[]>;
  // 创建语音合成订单
  createTTSOrder(options: CreateTTSOrderOptions): Promise<CreateTTSOrderResponse>;
}
```

### TokenStatus

```ts
type TokenStatus = {
  // 本周Token支持的最大字符数
  current_cycle_max_characters: number;
  // 本周Token已使用的字符数
  current_cycle_characters_used: number;
  // 本周Token剩余可用字符数
  current_cycle_characters_available: number;
  // Token转换配额剩余重置天数
  remaining_days_to_reset_quota: number;
  // Token历史已使用字符数
  history_characters_used: number;
};
```

### VoiceLang

播音员支持的语种类型

```ts
type VoiceLang = 'en' // 英语
  | 'zh'  // 中文
  | 'es'  // 西班牙语
  | 'ja'  // 日语
  | 'ko'  // 韩语
  | 'de'  // 德语
  | 'fr'  // 法语
  | 'it'  // 意大利语
  | 'ru'  // 俄语
  | 'pt'  // 葡萄牙语
  | 'tr'  // 土耳其语
  | 'ms'  // 马来西亚语
  | 'th'  // 泰语
  | 'vi'  // 越南语
  | 'id'  // 印尼语
  | 'he'  // 希伯来语;
```

### VoiceDetail

播音员详细信息

```ts
type VoiceDetail = {
  // ID
  id: number;
  // 名称
  name: string;
  // 语种
  language: VoiceLang;
  // 试听音频
  audio_sample_file_url: string;
  // 单次最多转换字数
  text_characters_limit: number;
};
```

### CreateTTSOrderOptions

创建语音合成订单参数

```ts
export type CreateTTSOrderOptions = {
  // 需要转换的文本
  text: string;
  // 播音员ID
  voice_id: number;
  // 音频格式
  audio_format?: AudioFormat;
  // 语速，0.5-2.0
  audio_speed?: number;
  // 音量，0-10
  audio_volume?: number;
  // auto insert audio paragraph pause time, range 500-5000
  text_paragraph_pause_time?: number;
};

// 支持的音频格式
export type AudioFormat = 'mp3' | 'ogg' | 'aac' | 'opus';
```

### CreateTTSOrderResponse

创建语音合成订单返回数据

```ts
export type CreateTTSOrderResponse = {
  // 音频地址
  audio_file_url: string;
  // 音频格式
  audio_file_type: string;
  // 音频文件有效期
  audio_file_expire_time: number;
  // 本次转换消耗的时间
  tts_elapsed_time: string;
  // 本次转换消费的字符数
  tts_order_characters: number;
  // 当前TOKEN的状态
  token_status: TokenStatus;
};
```