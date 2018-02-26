import {MessageBundle} from 'app/network/packets/message-bundle';
import {MessageHandler} from 'app/network/packets/message-handler';
import {Reader} from 'app/network/reader';
import {bufferToHex} from 'app/util/packet';
import {NewMessageAction} from 'app/actions/new-message-action';

export class FFXIVPacketHandler {

  static handle(packet, sent) {
    const reader = new Reader(packet.data);
    const bundle = new MessageBundle(reader);
    const consume = !bundle.messages.some(msg => [101, 325, 323].includes(msg.type));
    const direction = sent ? 'Sent' : 'Received';

    const log = (...args) => {
      if (consume) {
        console.log(...args);
      }
    };
    if (!consume) {
      console.log(`Skipped ${bundle.messages.map(msg => msg.type)}`);
    }

    if (bundle.magic0 === 0x41a05252) {
      log(`${direction} FF14 packet from ${packet.ipv4Header.srcaddr}:${packet.tcpHeader.srcport} to ${packet.ipv4Header.dstaddr}:${packet.tcpHeader.dstport} with ${bundle.messageCount} messages`);

      log(bufferToHex(packet.data));

      bundle.messages.forEach(message => {
        log(`Handle message of type '${message.type}': ${message.dataHex}`);

        if (consume) {
          new NewMessageAction(bundle, message, sent);
          MessageHandler.handle(message);
        }
      });
    }
  }
}
