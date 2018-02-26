import {InventoryModifyMessage} from 'app/network/packets/inventory/inventory-modify-message';
import {ListOffersMessage} from 'app/network/packets/market/list-offers-message';
import {Reader} from 'app/network/reader';

export const MessageHandler = {
  types: {
    0x013F: InventoryModifyMessage,
    0x00E0: null, // Ping
    0x010c: ListOffersMessage
  },

  /**
   * Handle ffxiv message
   * @param {Message} message
   * @returns {void}
   */
  handle(message) {
    const handler = this.types[message.type];
    if (!handler) {
      console.log(`Message type '${message.type}' unknown`);
      return;
    }
    const reader = new Reader(message.data);
    const gameMessage = new handler(reader);
    console.log(handler.name, gameMessage);
  }
};
