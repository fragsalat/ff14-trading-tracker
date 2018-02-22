import {AbstractAction} from './abstract-action';

export class NewPacketAction extends AbstractAction {

  run(packet) {
    if (this.state.recordPackets) {
      this.state.packets = [
        ...this.state.packets,
        packet
      ];
    }
  }
}