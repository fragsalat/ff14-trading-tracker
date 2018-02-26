import {Op} from 'sequelize';
import {Trade} from 'app/model/trade';
import {Item} from 'app/model/item';
import {AddTradeAction} from 'app/actions/add-trade-action';
import {h, Component} from 'preact';

export class CreateForm extends Component {

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      itemName: null,
      action: 'sell',
      quantity: 0,
      price: 0,
      totalPrice: 0,
      quality: 0,
      items: []
    };
  }

  /**
   * Submit current form to create a new item
   */
  save() {
    const item = this.state.items.find(item => item.name === this.state.itemName);

    if (!item) {
      return alert('You must select an item');
    }

    const trade = {
      action: this.state.action,
      quantity: parseInt(this.state.quantity, 10),
      price: parseInt(this.state.price, 10),
      totalPrice: parseInt(this.state.totalPrice, 10),
      quality: this.state.quality
    };
    new AddTradeAction(trade, item);
  }

  /**
   * Reset form inputs
   */
  reset() {
    this.setState({
      itemName: null,
      action: 'sell',
      quantity: 0,
      price: 0,
      totalPrice: 0,
      quality: 0
    });
  }

  findItems(name) {
    Item.findAll({
      where: {
        name: {
          [Op.like]: `${name}%`
        }
      },
      order: [['name', 'ASC']],
      limit: 10
    }).then(items => {
      this.setState({items, itemName: name})
    });
  }

  /**
   * @return {JSX}
   */
  render() {
    return (
      <div className="create-form">
        <div className="trade-action">
          <label for="trade-action">Action</label>
          <select
            id="trade-action"
            className="browser-default"
            onChange={event => this.setState({action: event.target.value})}
          >
            <option value="sell" selected>Sell</option>
            <option value="buy">Buy</option>
          </select>
        </div>
        <div className="trade-name">
          <label>
            Item name
            <input
              type="text"
              list="items"
              value={this.state.itemName}
              onKeyUp={event => this.findItems(event.target.value)}
              onChange={event => this.setState({itemName: event.target.value})}
            />
            <datalist id="items">
              {this.state.items.map(item =>
                <option value={item.name} />
              )}
            </datalist>
          </label>
        </div>
        <div className="item-quantity">
          <label>
            Quantity
            <input
              type="number"
              step="1"
              value={this.state.quantity}
              onChange={event => this.setState({quantity: event.target.value})}
            />
          </label>
        </div>
        <div className="item-price">
          {this.state.action === 'sell' ?
            <label>
              Total Price
              <input
                type="number"
                step="0.01"
                value={this.state.totalPrice}
                onChange={event => this.setState({totalPrice: event.target.value})}
              />
            </label>
          :
            <label>
              Price
              <input
                type="number"
                step="0.01"
                value={this.state.price}
                onChange={event => this.setState({price: event.target.value})}
              />
            </label>
          }              
        </div>
        <div className="item-quality">
            <label for="item-quality">Is HQ</label>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                className="filled-in"
                id="item-quality"
                checked={this.state.quality}
                onChange={event => this.setState({quality: event.target.checked})}
              />
              <label for="item-quality" />
            </div>
        </div>
        <div className="buttons">
          <button className="btn" onClick={() => this.save()}>
            <i className="material-icons">check</i>
          </button>
          <button className="btn red" onClick={() => this.reset()}>
            <i className="material-icons">clear</i>
          </button>
        </div>
      </div>
    )
  }
}
