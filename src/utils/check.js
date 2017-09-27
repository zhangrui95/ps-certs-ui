import Vue from 'vue'

// 验证数组内的值
export function checkArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i][0]) {
      Vue.$vux.toast.show({
        type: 'text',
        text: arr[i][1]
      })
      return false
    }
  }
  return true
}