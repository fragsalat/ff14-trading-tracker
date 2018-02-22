import {MessageTypes} from 'app/network/packets/message-types';

export class Message {

  constructor(reader) {
    this.length = reader.readDWord();
    this.actorId = reader.readDWord();
    this.userId = reader.readDWord();
    this.segmentType = reader.readWord();
    reader.readDWord();
    this.type = reader.readWord();
    this.typeName = MessageTypes.find(this.type);
    reader.readWord();
    this.seconds = reader.readWord();
    reader.readWord();

    this.data = reader.readBytes(this.length - 24);
    this.dataHex = this.data.map(byte => byte.toString(16)).join('');
  }
}