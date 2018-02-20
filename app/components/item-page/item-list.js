import {FilterChangeAction} from 'app/actions/filter-change-action';
import {RemoveItemAction} from 'app/actions/remove-item-action';
import {h, Component} from 'preact';

export class ItemList extends Component {

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
   * @param {Object} item
   */
  removeItem(item) {
    if (!confirm(`Do you really want to remove: ${item.name}`)) {
      return;
    }
    new RemoveItemAction(item);
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
      <div className="item-list">
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
              <th>Sum</th>
              <th width="30px"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item, index) =>
              <tr className="item">
                <td>
                  {item.created.getDate()}.{item.created.getMonth()}
                  &nbsp;
                  {item.created.getHours()}:{item.created.getMinutes()}
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.hq ? 'yes' : 'no'}</td>
                <td className={item.action === 'sell' ? 'sold' : 'bought'}>
                  {item.action === 'sell' ? '+' : '-'}
                  {item.price * item.quantity}
                </td>
                <td>
                  <a class="remove-btn" onClick={event => this.removeItem(item)}>
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