import {MessageBundle} from 'app/network/packets/message-bundle';
import {MessageHandler} from 'app/network/packets/message-handlers';
import {Reader} from 'app/network/reader';

export class FFXIVPacketHandler {

  static handle(packet, sent) {
    const reader = new Reader(packet);
    const bundle = new MessageBundle(reader);

    if (bundle.magic0 === 0x41a05252) {
      console.log(`Received FF14 packet bundle with ${bundle.messageCount} messages`);

      bundle.messages.forEach(message => {
        console.log(`Handle message of type '${message.type}': ${message.dataHex}`);

        new NewMessageAction(bundle, message, sent);
        MessageHandler.handle(message);
      });
    }
  }
}
