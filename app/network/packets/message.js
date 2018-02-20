
export class Message {

  constructor(reader) {
    this.length = reader.readDWord();
    this.actorId = reader.readDWord();
    this.userId = reader.readDWord();
    reader.readDWord();
    reader.readWord();
    this.type = reader.readWord();
    reader.readWord();
    this.seconds = reader.readWord();
    reader.readWord();

    this.data = reader.readBytes(this.length - 24);
    this.dataHex = this.data.map(byte => byte.toString(16)).join('');
  }
}