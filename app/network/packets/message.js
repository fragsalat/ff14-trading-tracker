import {MessageHandler} from 'app/network/packets/message-handler';
import {bufferToHex} from 'app/util/packet';

export class Message {

  constructor(reader) {
    this.length = reader.readDWord();
    this.actorId = reader.readDWord();
    this.userId = reader.readDWord();
    this.segmentType = reader.readWord();
    reader.readDWord();
    this.type = reader.readWord();
    this.typeName = MessageHandler.types.find(this.type);
    reader.readWord();
    this.seconds = reader.readWord();
    reader.readWord();

    this.data = reader.readBytes(this.length - 24);
    this.dataHex = bufferToHex(this.data);
  }
}