
export class Reader {

  constructor(data) {
    this.offset = 0;
    this.data = data;
  }

  _bitwiseOr(v1, v2) {
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

  readBytes(bytesNum) {
    this.offset += bytesNum;
    return this.data.slice(this.offset - bytesNum, this.offset);
  }

  readByte() {
    return this.data[this.offset++];
  }

  readWord() {
    return this.bytesToNumber(2, true);
  }

  readDWord() {
    return this.bytesToNumber(4, true);
  }

  readQWord() {
    return this.bytesToNumber(8, true);
  }

  bytesToNumber(bytesNum, inverted) {
    let num = 0;
    for (let i = 0; i < bytesNum; i++, this.offset++) {
      const shift = inverted ? i * 8 : (bytesNum - i - 1) * 8;
      num = this._bitwiseOr(num, this.data[this.offset] * Math.pow(2, shift)); // Left shift by n bits
    }
    return num;
  }
}