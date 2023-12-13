const { createSDK } = require('.')

const sdk = createSDK('ttsmaker_demo_token')
const showStatus = (data) => {
  console.log('本周Token支持的最大字符数：', data.current_cycle_max_characters)
  console.log('本周Token已使用的字符数：', data.current_cycle_characters_used)
  console.log('本周Token剩余可用字符数：', data.current_cycle_characters_available)
  console.log('Token转换配额剩余重置天数：', data.remaining_days_to_reset_quota)
  console.log('Token历史已使用字符数：', data.history_characters_used)
}

sdk.checkTokenStatus().then((data) => {
  showStatus(data)
})

sdk.getVoiceList('zh').then((list) => {
  list.forEach(item => console.log(`【${item.id}】${item.name}`))
})

sdk.createTTSOrder({
  text: '你好',
  voice_id: 1802
}).then((data) => {
  console.log(data.audio_file_url)
  showStatus(data.token_status)
})
