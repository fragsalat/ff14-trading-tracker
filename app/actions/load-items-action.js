import fs from 'fs';
import {AbstractAction} from 'app/actions/abstract-action';

export class LoadItemsAction extends AbstractAction {

  /**
   * Load items from file system
   */
  run() {
    if (!fs.existsSync('items.csv')) {
      return;
    }
    // Parse csv into items
    const file = fs.readFileSync('items.csv', 'utf8');
    this.state.items = file.trim().split('\n').map(this.parseLine);
  }

  /**
   * Parse a line into a item object
   * @param {string} line
   * @return {{action: string, created: Date, name: string, quantity: number, price: number, hq: boolean}}
   */
  parseLine(line) {
    let [action, created, name, quantity, price, hq] = line.split(';');
    return {
      action,
      created: new Date(created),
      name,
      quantity: parseInt(quantity),
      price: parseInt(price),
      hq: hq === 'true'
    };
  }
}