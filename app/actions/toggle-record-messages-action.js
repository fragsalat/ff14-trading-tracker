import {AbstractAction} from 'app/actions/abstract-action';

export class ToggleRecordMessagesAction extends AbstractAction {

  run() {
    this.state.recordMessages = !this.state.recordMessages;
  }
}