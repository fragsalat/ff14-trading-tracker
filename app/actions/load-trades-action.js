import fs from 'fs';
import {AbstractAction} from 'app/actions/abstract-action';
import {Trade} from 'app/model/trade';
import {Item} from 'app/model/item';

export class LoadTradesAction extends AbstractAction {

  /**
   * Load trades from file system
   */
  run() {
    return Trade.findAll({
      order: [['createdAt', 'DESC']],
      include: [{
        model: Item
      }]
    }).then(trades => {
      this.state.trades = trades;
    });
  }
}