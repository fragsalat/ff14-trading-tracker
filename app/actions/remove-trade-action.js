import fs from 'fs';
import {AddTradeAction} from 'app/actions/add-trade-action';

export class RemoveTradeAction extends AddTradeAction {

  /**
   * Remove trade
   */
  run(trade) {
    this.state.trades = this.state.trades.filter(t => t.id !== trade.id);
    trade.destroy();
  }
}