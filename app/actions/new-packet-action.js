import {AbstractAction} from 'app/actions/abstract-action';

export class NewPacketAction extends AbstractAction {

  run(ipHeader, tcpHeader, data) {
    if (this.state.recordPackets) {
      this.state.packets = [
        ...this.state.packets,
        {
          ipHeader,
          tcpHeader,
          data
        }
      ];
    }
  }
}