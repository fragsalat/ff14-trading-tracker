import {Offer} from 'app/model/offer';
import {bufferToHex} from 'app/util/packet';

class OfferEntry {
  /**
   * One offer spans 112 bytes within the offer list
   * @param {Reader} reader
   */
  constructor(reader) {
    reader.readDWord(); // ????
    reader.readDWord(); // 00c00900
    reader.readWord(); // ???
    reader.readByte(); // ???
    reader.readDWord(); // 922e0078
    reader.readDWord(); // ???
    reader.readDWord(); // 922e0040
    reader.readByte(); // ???
    reader.readQWord(); // 00000000 00000000
    this.price = reader.readDWord();
    reader.readDWord(); // ???
    this.quantity = reader.readDWord();
    this.itemId = reader.readDWord();
    reader.readDWord();
    reader.readDWord();
    reader.readDWord();
    reader.readQWord();
    reader.readQWord();
    this.retailer = reader.readString(32);
    this.quality = reader.readWord();
    this.marketCode = reader.readWord();

    this.totalPrice = this.price * this.quantity;

    Offer.create(this)
      .then(offer => console.log(`Created offer ${offer.id}`))
      .catch(error => console.warn(`Could not create offer ${JSON.stringify(this)}`));
  }
}

export class ListOffersMessage {

  constructor(reader) {
    this.dataHex = bufferToHex(reader.data);
    reader.readDWord(); // 8e5a0000
    reader.readWord(); // 0000

    const length = reader.data.length - reader.offset;
    const offers = Math.ceil(length / 112); // One offer spans 112 bytes

    this.offers = [];
    for (let i = offers; i--;) {
      if (reader.readDWord() === 0) {
        break;
      }
      reader.offset -= 4; // Rewind offset before read dword
      this.offers.push(new OfferEntry(reader));
    }

    if (reader.data.length !== reader.offset) {
      console.warn(`LEFT OVER BYTES ${this.constructor.name}: ${reader.readBytes(reader.data.length - reader.offset)}`);
    }
  }
}
