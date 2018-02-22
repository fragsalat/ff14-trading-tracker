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
      trade: {
        action: 'sell',
        quantity: 0,
        price: 0,
        hq: 0
      },
      itemName: null,
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

    new AddTradeAction(this.state.trade, item);
  }

  /**
   * Reset form inputs
   */
  reset() {
    this.setState({trade: {
      action: 'sell',
      itemName: null,
      quantity: 0,
      price: 0,
      hq: 0
    }});
  }

  finditems(name) {
    Item.findAll({
      where: {
        name: {
          [Op.like]: `${name}%`
        }
      },
      order: ['name', 'ASC'],
      limit: 10
    }).then(items =>
        this.setState({items})
    );
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
            onChange={event => this.setState({trade: {action: event.target.value}})}
          >
            <option value="sell" selected>Sell</option>
            <option value="buy">Buy</option>
          </select>
        </div>
        <div className="trade-name">
          <label>
            Trade name
            <input
              type="text"
              list="items"
              value={this.state.trade.itemName}
              onKeyPress={event => this.findItems(event.target.value)}
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
              value={this.state.trade.quantity}
              onChange={event => this.setState({trade: {quantity: event.target.value}})}
            />
          </label>
        </div>
        <div className="item-price">
          <label>
            {this.state.trade.action === 'sell' ? 'Total Price' : 'Price'}
            <input
              type="number"
              step="0.01"
              value={this.state.trade.price}
              onChange={event => this.setState({trade: {price: event.target.value}})}
            />
          </label>
        </div>
        <div className="item-quality">
            <label for="item-quality">Is HQ</label>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                className="filled-in"
                id="item-quality"
                checked={this.state.trade.hq}
                onChange={event => this.setState({trade: {hq: event.target.checked}})}
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
