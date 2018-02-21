import {AbstractAction} from './abstract-action';

export class NewMessageAction extends AbstractAction {

  run(bundle, message, sent) {
    if (this.state.recordMessages) {
      this.state.messages = [
        ...this.state.messages,
        {
          bundle,
          message,
          sent
        }
      ];
    }
  }
}