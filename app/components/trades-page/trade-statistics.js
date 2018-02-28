import {h, Component} from 'preact';
import Chart from 'chart.js';

export class TradeStatistics extends Component {

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = props;
  }

  /**
   * Render chart when component is attached to DOM
   */
  componentDidMount() {
    this.renderCharts();
  }

  /**
   * Render chart DOM is updated
   */
  componentDidUpdate() {
    this.renderCharts();
  }

  /**
   * Update state when props change
   * @param {Object} props
   */
  componentWillReceiveProps(props) {
    this.setState(props);
  }

  /**
   * Group trades in component state based on return value of passed callback
   * @param {Function} groupCb
   * @return {Object}
   */
  groupTrades(groupCb) {
    return this.state.trades.reverse().reduce((groups, trade) => {
      const key = groupCb(trade);
      groups[key] = groups[key] || [];
      groups[key].push(trade);
      return groups;
    }, {});
  }

  /**
   * Render the charts
   */
  renderCharts() {
    const groupedByWeek = this.groupTrades(trade => {
      const year = trade.createdAt.getFullYear();
      const firstDayInYear = new Date(year, 0, 1);
      // Calculate week by measuring difference in days since 01. Jan of given year
      const week = Math.ceil((trade.createdAt - firstDayInYear) / 86400000 / 7);
      return `${year} CW${week}`;
    });
    const weekData = Object.values(groupedByWeek).map(this.generateStatisticData);
    // Destroy only chart when this was rendered before
    if (this.weeklyChart) {
      this.weeklyChart.destroy();
    }
    this.weeklyChart = new Chart(this.weeklyCanvas, {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      data: {
        labels: Object.keys(groupedByWeek),
        datasets: [
          {
            label: 'Paid',
            fill: 'false',
            borderColor: 'rgba(244, 67, 54, .9)',
            borderWidth: 1,
            data: weekData.map(week => week.paid)
          },
          {
            label: 'Earned',
            fill: 'false',
            borderColor: 'rgba(76, 175, 80, .9)',
            borderWidth: 1,
            data: weekData.map(week => week.earned)
          },
          {
            label: 'Profit',
            fill: 'start',
            borderColor: 'rgba(0, 0, 0, .9)',
            borderWidth: 1,
            data: weekData.map(week => week.profit)
          }
        ]
      }
    });
  }

  /**
   * Generate statistic data for a set of trades
   * @param {Array<Object>} trades
   * @return {{earned: number, paid: number, profit: number}}
   */
  generateStatisticData(trades) {
    let data = {
      earned: 0,
      paid: 0,
      profit: 0
    };
    trades.forEach(trade => {
      if (trade.action === 'sell') {
        data.earned += trade.totalPrice;
      } else {
        data.paid += trade.totalPrice;
      }
      data.profit = data.earned - data.paid;
    });

    return data;
  }

  /**
   * @return {JSX}
   */
  render() {
    const statisticData = this.generateStatisticData(this.state.trades);
    return (
      <div className="statistics">
        <div className="row">
          <div className="col s4">
            <label>Paid</label>
            <div>{statisticData.paid}</div>
          </div>
          <div className="col s4">
            <label>Earned</label>
            <div>{statisticData.earned}</div>
          </div>
          <div className="col s4">
            <label>Profit</label>
            <div className={statisticData.profit > 0 ? 'green-text' : 'red-text'}>
              {statisticData.profit > 0 ? '+' : ''}{statisticData.profit}
            </div>
          </div>
        </div>
        <div className="weekly">
          <label>Weekly</label>
          <div style={{width: '30vw', height: '200px'}}>
            <canvas
              ref={element => { this.weeklyCanvas = element; }}
            />
          </div>
        </div>
      </div>
    );
  }
}
