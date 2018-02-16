import fs from 'fs';
import {h, Component} from 'preact';
import {CreateForm} from './create-form'
import {ItemList} from './item-list'
import {Statistics} from './statistics'

/**
 * Parse a line into a item object
 * @param {string} line
 * @return {{action: string, created: Date, name: string, quantity: number, price: number, hq: boolean}}
 */
function parseLine(line) {
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

/**
 * Serialize a item object into a csv line
 * @param {Object} item
 * @return {string}
 */
function createLine(item) {
  return `${item.action};${item.created};${item.name};${item.quantity};${item.price};${item.hq}`;
}

export class App extends Component {

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {items: [], filter: ''};
    this.loadItems();
  }

  /**
   * Handle submission of create form
   * @param {Object} item
   */
  onSave(item) {
    this.state.items.push(item);
    this.setState({items: this.state.items});
    // Append line to file
    fs.appendFile('items.csv', createLine(item) + '\n', () =>
      console.log('Saved', arguments)
    );
  }

  /**
   * Handle removal of items from item list
   * @param {number} index
   */
  onRemove(index) {
    this.state.items.splice(index, 1);
    this.setState({items: this.state.items});
    // Re create the whole file
    fs.writeFileSync('items.csv', this.state.items.map(createLine).join('\n'));
  }

  /**
   * Handle filter changes
   * @param {string} filter
   */
  onFilterChange(filter) {
    this.setState({filter});
  }

  /**
   * Load items from csv file
   */
  loadItems() {
    if (!fs.existsSync('items.csv')) {
      return;
    }
    // Parse csv into items
    const file = fs.readFileSync('items.csv', 'utf8');
    this.setState({items: file.trim().split('\n').map(parseLine)});
  }

  /**
   * @return {JSX}
   */
  render() {
    // Filter items by containing specified string
    const regex = new RegExp(`${this.state.filter || ''}`, 'i');
    const filteredItems = this.state.items.filter(item => regex.test(item.name));
    // Sort Items by date desc
    const sortedItems = filteredItems.sort((a, b) => a.created < b.created ? 1 : -1);
    return (
      <div className="app">
        <header>
          <CreateForm onSave={item => this.onSave(item)}/>
        </header>
        <section>
          <ItemList
            items={sortedItems}
            onRemove={index => this.onRemove(index)}
            onFilterChange={filter => this.onFilterChange(filter)}
          />
          <Statistics items={sortedItems} />
        </section>
      </div>
    )
  }
}