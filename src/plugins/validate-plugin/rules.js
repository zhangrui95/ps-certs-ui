const rules = {
  'mobile': val => /^1[34578]\d{9}$/.test(val),
  'email': val => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val),
  'card': val => {
    var ex = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(19|2[0-9])((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
    var pattern = new RegExp(ex);
    if (!pattern.test(val)) {
      return false;
    }
    var params = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var checks = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    var id = val;
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
  },
  'number': (val, opt) => {
    let min = opt.min ? opt.min : val * 1,
      max = opt.max ? opt.max : val * 1
    return val * 1 >= min && val * 1 <= max
  },
  'string': (val, opt) => {
    let length = val.length,
      min = opt.min ? opt.min : length,
      max = opt.max ? opt.max : length
    return length * 1 >= min && length <= max
  },
}

export default rules