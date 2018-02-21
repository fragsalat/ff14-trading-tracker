import {MessageBundle} from '../network/packets/message-bundle';
import {Reader} from '../network/reader';
import {NewMessageAction} from 'app/actions/new-message-action';

export class FFXIVPacketHandler {

  static handle(packet, sent) {
    const reader = new Reader(packet);
    const bundle = new MessageBundle(reader);

    if (bundle.magic0 === 0x41a05252) {
      console.log(`Received FF14 packet bundle with ${bundle.messageCount} messages`);

      bundle.messages.forEach(message => {
        console.log(`Handle message of type '${message.type}': ${message.dataHex}`);

        new NewMessageAction(bundle, message, sent);
      });
    }
  }
}