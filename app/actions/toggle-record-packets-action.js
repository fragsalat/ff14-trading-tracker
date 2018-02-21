import {AbstractAction} from 'app/actions/abstract-action';

export class ToggleRecordPacketsAction extends AbstractAction {

  run() {
    this.state.recordPackets = !this.state.recordPackets;
  }
}