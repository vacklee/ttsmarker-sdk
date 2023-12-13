import axios from 'axios'

export type TokenStatus = {
  current_cycle_max_characters: number
  current_cycle_characters_used: number
  current_cycle_characters_available: number
  remaining_days_to_reset_quota: number
  history_characters_used: number
}

export type VoiceLang = 'en' | 'zh' | 'es' | 'ja' | 'ko' | 'de' | 'fr' | 'it' | 'ru' | 'pt' | 'tr' | 'ms' | 'th' | 'vi' | 'id' | 'he'
export type VoiceDetail = {
  id: number
  name: string
  language: VoiceLang
  audio_sample_file_url: string
  text_characters_limit: number
}

export type AudioFormat = 'mp3' | 'ogg' | 'aac' | 'opus'

export type CreateTTSOrderOptions = {
  text: string
  voice_id: number
  audio_format?: AudioFormat
  audio_speed?: number
  audio_volume?: number
  text_paragraph_pause_time?: number
}

export type CreateTTSOrderResponse = {
  audio_file_url: string
  audio_file_type: string
  audio_file_expire_time: number
  tts_elapsed_time: string
  tts_order_characters: number
  token_status: TokenStatus
}

const request = axios.create({
  baseURL: 'https://api.ttsmaker.cn/v1/'
})

export class TTSMarker {
  constructor(public token: string) {}

  async checkTokenStatus() {
    const { data } = await request(`get-token-status?token=${this.token}`)
    if (data.error_code !== '0') {
      throw new Error(data.error_details)
    }

    return data.token_status as TokenStatus
  }

  async getVoiceList(language?: VoiceLang) {
    const { data } = await request(`get-voice-list?token=${this.token}`, {
      params: { language }
    })

    if (data.status !== 'success') {
      throw new Error(data.error_details)
    }

    return data.voices_detailed_list as VoiceDetail[]
  }

  async createTTSOrder(options: CreateTTSOrderOptions) {
    const { data } = await request.post(`create-tts-order`, {
      token: this.token,
      text: options.text,
      voice_id: options.voice_id,
      audio_format: options.audio_format || 'mp3',
      audio_speed: options.audio_speed || 1,
      audio_volume: options.audio_volume ?? 10,
      text_paragraph_pause_time: options.text_paragraph_pause_time ?? 0
    })

    if (data.status !== 'success') {
      throw new Error(data.error_details)
    }

    return data as CreateTTSOrderResponse
  }
}

export function createSDK(token: string) {
  return new TTSMarker(token)
}
