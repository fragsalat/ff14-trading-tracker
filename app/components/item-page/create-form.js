import {AddItemAction} from 'app/actions/add-item-action';
import {h, Component} from 'preact';

export class CreateForm extends Component {

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      action: 'sell',
      name: '',
      quantity: 0,
      price: 0,
      hq: false
    };
  }

  /**
   * Submit current form to create a new item
   */
  save() {
    const item = Object.assign({created: new Date()}, this.state);
    new AddItemAction(item);
  }

  /**
   * Reset form inputs
   */
  reset() {
    this.setState({
      action: 'sell',
      name: '',
      quantity: 0,
      price: 0,
      hq: false
    });
  }

  /**
   * @return {JSX}
   */
  render() {
    return (
      <div className="create-form">
        <div className="item-action">
          <label for="item-action">Action</label>
          <select
            id="item-action"
            className="browser-default"
            onChange={event => this.setState({action: event.target.value})}
          >
            <option value="sell" selected>Sell</option>
            <option value="buy">Buy</option>
          </select>
        </div>
        <div className="item-name">
          <label>
            Item name
            <input
              type="text"
              value={this.state.name}
              onChange={event => this.setState({name: event.target.value})}
            />
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
          <label>
            Price
            <input
              type="number"
              step="0.01"
              value={this.state.price}
              onChange={event => this.setState({price: event.target.value})}
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
                checked={this.state.hq}
                onChange={event => this.setState({hq: event.target.checked})}
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
