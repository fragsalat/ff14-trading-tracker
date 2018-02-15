import {h, Component} from 'preact';

export class CreateForm extends Component {

  constructor() {
    super();
    this.state = {};
  }

  handleChange(event, field) {
    this.setState({[field]: event.target.value});
  }

  save() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="create-form">
        <div className="item-name">
          <label>
            Item name
            <input
              type="text"
              value={this.state.name}
              onChange={event => this.handleChange(event, 'name')}
            />
          </label>
        </div>
        <div className="item-amount">
          <label>
            Amount
            <input
              type="number"
              step="1"
              value={this.state.amount}
              onChange={event => this.handleChange(event, 'amount')}
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
              onChange={event => this.handleChange(event, 'price')}
            />
          </label>
        </div>
        <div className="item-quality">
            <label for="item-quality">Is HQ</label>
            <input
              type="checkbox"
              className="filled-in"
              id="item-quality"
              checked={this.state.hq}
              onChange={event => this.handleChange(event, 'hq')}
            />
          <label for="item-quality"></label>
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
