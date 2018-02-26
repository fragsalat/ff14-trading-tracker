import zlib from 'zlib';
import {Message} from './message';
import {Reader} from '../reader';
import {bufferToHex} from 'app/util/packet';

export class MessageBundle {

  constructor(reader) {
    this.magic0 = reader.readDWord();
    this.magic1 = reader.readDWord();
    this.magic2 = reader.readDWord();
    this.magic3 = reader.readDWord();
    this.epoch = new Date(reader.readQWord());
    this.length = reader.readDWord();
    this.connectionType = reader.readWord();
    this.messageCount = reader.readWord();
    reader.readByte();
    this.encoding = reader.readByte();
    reader.readWord();
    reader.readWord();
    reader.readWord();

    this.data = reader.data.slice(reader.offset);
    this.dataHex = bufferToHex(this.data);

    if (this.encoding) {
      const bodyData = reader.readBytes(this.length - 40);
      const inflated = zlib.inflateSync(Buffer.from(bodyData));
      reader = new Reader(inflated);
    }

    /**
     * @type {Array<Message>}
     */
    this.messages = [];
    for (let i = 0; i < this.messageCount; i++) {
      this.messages.push(new Message(reader));
    }
  }
}