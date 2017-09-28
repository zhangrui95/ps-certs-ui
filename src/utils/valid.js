import Vue from 'vue'

// 验证数组内的值
export function array(arr) {
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

// 验证手机号
export function mobile(arg) {
  return /^1[34578]\d{9}$/.test(arg)
}

// 验证邮箱
export function email(arg) {
  return /^1[34578]\d{9}$/.test(arg)
}

// 验证身份证
export function card(value) {
  var ex = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(19|2[0-9])((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
  var pattern = new RegExp(ex);
  if (!pattern.test(value)) {
    return false;
  }
  var params = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var checks = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  var id = value;
  var sum = 0;
  for (var i = 0; i < 17; i++) {
    var tmp = id.charAt(i);
    sum += params[i] * tmp;
  }
  sum %= 11;
  var check;
  if (id.charAt(17) == 'x' || id.charAt(17) == 'X') {
    check = 10;
  } else {
    check = id.charAt(17);
  }
  return check == checks[sum];
};

// 验证身高
export function height(arg) {
  return arg * 1 > 10 && arg * 1 < 999
}

// 验证体重
export function weight(arg) {
  return arg * 1 > 10 && arg * 1 < 999
}