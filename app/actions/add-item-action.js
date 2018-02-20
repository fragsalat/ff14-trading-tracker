import fs from 'fs';
import {AbstractAction} from 'app/actions/abstract-action';

export class AddItemAction extends AbstractAction {

  /**
   * Load items from file system
   */
  run(item) {
    this.state.items = [
      ...this.state.items,
      item
    ];
    // Append line to file
    fs.appendFile('items.csv', this.createLine(item) + '\n', () =>
      console.log('Saved', arguments)
    );
  }

  /**
   * Serialize a item object into a csv line
   * @param {Object} item
   * @return {string}
   */
  createLine(item) {
    return `${item.action};${item.created};${item.name};${item.quantity};${item.price};${item.hq}`;
  }
}