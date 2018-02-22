import fs from 'fs';
import {AbstractAction} from 'app/actions/abstract-action';
import {Trade} from 'app/model/trade';

export class LoadTradesAction extends AbstractAction {

  /**
   * Load trades from file system
   */
  run() {
    return Trade.findAll({order: ['created', 'DESC']}).then(trades => {
      this.state.trades = trades;
    });
  }
}