import {h, Component} from 'preact';
import {Item} from 'app/model/item';
import {Op} from 'sequelize';

export class FilterPanel extends Component {

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      itemName: ''
    };
    this.loadStorage();
  }

  loadStorage() {
    const json = localStorage.getItem('offer-item');
    if (json) {
      const item = JSON.parse(json);
      this.state.itemName = item.name;

      if (typeof this.props.onChange === 'function') {
        this.props.onChange(item);
      }
    }
  }

  findItems(name) {
    if (this.timeout) {
      this.timeout = clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      console.log(this.state.itemName);
      Item.findAll({
        where: {
          name: {
            [Op.like]: `${name}%`
          }
        },
        order: [['name', 'ASC']],
        limit: 10
      }).then(items => {
        this.setState({items});
      });
    }, 100);
    return true;
  }

  onChange(itemName) {
    const item = this.state.items.find(item => item.name === itemName);
    if (!item) {
      return;
    }
    localStorage.setItem('offer-item', JSON.stringify(item));
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(item);
    }
  }

  render() {
    return (
      <div className="filter-panel">
        <label>
          Item name
          <input
            type="text"
            list="items"
            defaultValue={this.state.itemName}
            onKeyUp={event => this.findItems(event.target.value)}
            onChange={event => this.onChange(event.target.value)}
          />
          <datalist id="items">
            {this.state.items.map(item =>
              <option value={item.name}/>
            )}
          </datalist>
        </label>
      </div>
    );
  }
}