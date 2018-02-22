import {bitwiseOr} from 'app/util/packet';

export class Reader {

  constructor(data) {
    this.offset = 0;
    this.data = data;
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

  readString(bytesNum) {
    let str = '';
    for (let i = 0; i < bytesNum; i++) {
      if (this.data[this.offset + i] === 0x0) {
        break;
      }
      str += String.fromCharCode(this.data[this.offset + i]);
    }
    this.offset += bytesNum;
    return str;
  }

  bytesToNumber(bytesNum, inverted) {
    let num = 0;
    for (let i = 0; i < bytesNum; i++, this.offset++) {
      const shift = inverted ? i * 8 : (bytesNum - i - 1) * 8;
      num = bitwiseOr(num, this.data[this.offset] * Math.pow(2, shift)); // Left shift by n bits
    }
    return num;
  }
}