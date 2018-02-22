import fs from 'fs';
import {AbstractAction} from 'app/actions/abstract-action';

export class AddTradeAction extends AbstractAction {

  /**
   * Create new trade
   */
  run(data, item) {
    const trade = Trade.build(data);
    // Selling price is listed as total price instead of item price
    if (trade.action === 'sell') {
      trade.price = Math.floor(trade.price / trade.quantity);
    }
    trade.setItem(item);

    return trade.save().then(() => {
      this.state.trades = [
        ...this.state.trades,
        trade
      ];
    });
  }
}