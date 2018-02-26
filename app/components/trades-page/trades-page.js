import {Store} from 'app/store';
import {h, Component} from 'preact';
import {LoadTradesAction} from 'app/actions/load-trades-action';
import {CreateForm} from './create-form'
import {TradeList} from './trade-list'
import {TradeStatistics} from './trade-statistics'

export class TradesPage extends Component {

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {trades: [], filter: ''};
    Store.getInstance().setState({trades: [], filter: ''});
    Store.getInstance().subscribe(state =>
      this.setState({trades: state.trades, filter: state.filter})
    );

    new LoadTradesAction();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  /**
   * @return {JSX}
   */
  render() {
    // Filter trades by containing specified string
    const regex = new RegExp(`${this.state.filter || ''}`, 'i');
    const filteredTrades = this.state.trades.filter(trade => regex.test(trade.item.name));
    // Sort Trades by date desc
    const sortedTrades = filteredTrades.sort((a, b) => a.created < b.created ? 1 : -1);
    return (
      <div className="trades-page">
        <header>
          <CreateForm />
        </header>
        <section>
          <TradeList trades={sortedTrades} />
          <TradeStatistics trades={sortedTrades} />
        </section>
      </div>
    )
  }
}