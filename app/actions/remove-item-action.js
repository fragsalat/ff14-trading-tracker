import {AddItemAction} from 'app/actions/add-item-action';
import fs from 'fs';
import {AbstractAction} from 'app/actions/abstract-action';

export class RemoveItemAction extends AddItemAction {

  /**
   * Load items from file system
   */
  run(item) {
    this.state.items = this.state.items.filter(i => i !== item);
    // Re create the whole file
    fs.writeFileSync('items.csv', this.state.items.map(this.createLine).join('\n'));
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