import fs from 'fs';
import {AbstractAction} from 'app/actions/abstract-action';
import {Trade} from 'app/model/trade';

export class AddTradeAction extends AbstractAction {

  /**
   * Create new trade
   */
  run(data, item) {
    // Selling price is listed as total price instead of item price
    if (data.action === 'sell') {
      data.price = Math.floor(data.totalPrice / data.quantity);
    } else {
      data.totalPrice = Math.floor(data.price * data.quantity);
    }
    data.itemId = item.id;

    return Trade.create(data).then(trade => {
      trade.item = item;
      this.state.trades = [
        trade,
        ...this.state.trades
      ];
    });
  }
}
