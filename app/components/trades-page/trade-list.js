import {FilterChangeAction} from 'app/actions/filter-change-action';
import {RemoveTradeAction} from 'app/actions/remove-trade-action';
import {h, Component} from 'preact';

export class TradeList extends Component {

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = props;
  }

  /**
   * Set new component state when props change
   * @param {Object} props
   */
  componentWillReceiveProps(props) {
    this.setState(props);
  }

  /**
   * Handle click on remove button
   * @param {Object} trade
   */
  removeTrade(trade) {
    if (!confirm(`Do you really want to remove: ${trade.item.name}`)) {
      return;
    }
    new RemoveTradeAction(trade);
  }

  /**
   * Handle change of filter input
   * @param {string} filter
   */
  changeFilter(filter) {
    new FilterChangeAction(filter);
  }

  /**
   * @return JSX}
   */
  render() {
    return (
      <div className="trade-list">
        <table className="highlight">
          <thead>
            <tr>
              <th>Date</th>
              <th className="search">
                <i className="material-icons">search</i>
                <input
                  type="text"
                  placeholder="Item name"
                  onKeyUp={event => this.changeFilter(event.target.value)}
                />
              </th>
              <th>Quantity</th>
              <th>Price</th>
              <th>HQ</th>
              <th>Total Price</th>
              <th width="30px"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.trades.map((trade, index) =>
              <tr className="trade">
                <td>
                  {trade.createdAt.getDate()}.{trade.createdAt.getMonth()}
                  &nbsp;
                  {trade.createdAt.getHours()}:{trade.createdAt.getMinutes()}
                </td>
                <td>{trade.item.name}</td>
                <td>{trade.quantity}</td>
                <td>{trade.price}</td>
                <td>{trade.hq ? 'yes' : 'no'}</td>
                <td className={trade.action === 'sell' ? 'sold' : 'bought'}>
                  {trade.action === 'sell' ? '+' : '-'}
                  {trade.totalPrice}
                </td>
                <td>
                  <a class="remove-btn" onClick={event => this.removeTrade(trade)}>
                    <i className="material-icons">close</i>
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
   );
  }
}