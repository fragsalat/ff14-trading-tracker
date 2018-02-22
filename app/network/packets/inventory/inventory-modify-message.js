const actions = {
  0x07: 'discard',
  0x08: 'move',
  0x09: 'swap',
  0x0C: 'merge',
  0x0A: 'split',
};

export class InventoryModifyMessage {

  constructor(reader) {
    this.sequence = reader.readDWord();
    this.action = reader.readByte();
    this.actionName = actions[this.action];
    this.fromSlot = reader.readByte();
    this.toSlot = reader.readByte();
    this.fromContainer = reader.readWord();
    this.toContainer = reader.readWord();
  }
}