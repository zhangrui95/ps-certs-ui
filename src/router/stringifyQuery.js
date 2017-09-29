var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function(c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

var encode = function(str) {
  return encodeURIComponent(str)
    .replace(encodeReserveRE, encodeReserveReplacer)
    .replace(commaRE, ',');
};

export default (obj) => {
  var res = obj ? Object.keys(obj).map(function(key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function(val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function(x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}