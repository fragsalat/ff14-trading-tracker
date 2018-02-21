import {AbstractAction} from './abstract-action';

export class NewPacketAction extends AbstractAction {

  run(ipHeader, tcpHeader, buffer) {
    if (this.state.recordPackets) {
      this.state.packets = [
        ...this.state.packets,
        {
          ipHeader,
          tcpHeader,
          data: Array.from(buffer)
        }
      ];
    }
  }
}