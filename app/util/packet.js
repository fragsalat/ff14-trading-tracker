
function zeroPad(hex) {
  return new Array(hex.length % 2 + 1).join('0') + hex;
}

function bufferToHex(buffer) {
  return Array.from(buffer).reduce((hex, byte) =>
    hex + zeroPad(byte.toString(16))
    , '');
}

function numberToHex(number, inversed) {
  debugger;
  let rest = number;
  const bytes = []

  while (rest) {
    bytes.push(zeroPad(bitwiseAnd(rest, 0xFF).toString(16)));
    rest = Math.floor(rest * Math.pow(2, -8));
  }

  return inversed ? bytes.join('') : bytes.reverse().join('');
}

export function strToHex(str) {
  return Array.from(str).map(char =>
    zeroPad(char.charCodeAt(0).toString(16))
  ).join('')
}

export function hexToString(hex) {
  return hex.match(/[\s\S]{2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
}

function bitwiseAnd(v1, v2) {
  const hi = 0x80000000;
  const low = 0x7fffffff;
  const hi1 = ~~(v1 / hi);
  const hi2 = ~~(v2 / hi);
  const low1 = v1 & low;
  const low2 = v2 & low;
  const h = hi1 & hi2;
  const l = low1 & low2;
  return h * hi + l;
}

export function bitwiseOr(v1, v2) {
  const hi = 0x80000000;
  const low = 0x7fffffff;
  const hi1 = ~~(v1 / hi);
  const hi2 = ~~(v2 / hi);
  const low1 = v1 & low;
  const low2 = v2 & low;
  const h = hi1 | hi2;
  const l = low1 | low2;
  return h * hi + l;
}

export function hexToNumber(hex, inverted) {
  const bytes = hex.match(/[\s\S]{2}/g).map(byte => parseInt(byte, 16));
  let num = 0;
  for (let i = 0, offset = 0; i < bytes.length; i++, offset++) {
    const shift = inverted ? i * 8 : (bytes.length - i - 1) * 8;
    num = bitwiseOr(num, bytes[offset] * Math.pow(2, shift)); // Left shift by n bits
  }
  return num;
}
