import {h, Component} from 'preact';
import {groupBy, groupByDay} from 'app/util/statistic';
import {Chart} from 'app/components/chart'

export class OfferStatistics extends Component {

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = props;
  }

  /**
   * Update state when props change
   * @param {Object} props
   */
  componentWillReceiveProps(props) {
    this.setState(props);
  }

  /**
   * Generate statistic data for a set of offers
   * @param {Array<Object>} offers
   * @return {{max: number, min: number, average: number}}
   */
  generateStatisticData(offers) {
    let data = {
      max: 0,
      min: 0,
      average: 0
    };
    offers.forEach(offer => {
      if (!data.min || data.min > offer.price) {
        data.min = offer.price;
      }
      if (data.max < offer.price) {
        data.max = offer.price;
      }
      data.average += offer.price;
    });
    data.average = Math.floor(data.average / offers.length);

    return data;
  }

  /**
   * @return {JSX}
   */
  render() {
    const statisticData = this.generateStatisticData(this.state.offers);
    const groupedOffers = groupBy(this.state.offers.reverse(), groupByDay);
    const groupedData = Object.values(groupedOffers).map(this.generateStatisticData);
    const chartLabels = Object.keys(groupedOffers);
    const chartData = [
      {
        label: 'Average',
        fill: 'start',
        backgroundColor : "rgba(0, 0, 0, .2)",
        borderColor: 'rgba(0, 0, 0, .9)',
        borderWidth: 1,
        yAxisID: 'left',
        data: groupedData.map(group => group.average)
      },
      {
        label: 'Max',
        fill: 'false',
        borderColor: 'rgba(244, 67, 54, .9)',
        borderWidth: 1,
        yAxisID: 'right',
        data: groupedData.map(group => group.max)
      },
      {
        label: 'Min',
        fill: 'start',
        backgroundColor : "rgba(76, 175, 80, .2)",
        borderColor: 'rgba(76, 175, 80, .9)',
        borderWidth: 1,
        yAxisID: 'left',
        data: groupedData.map(group => group.min)
      }
    ];
    const options = {
      scales: {
        yAxes: [{
          id: 'left',
          type: 'linear',
          position: 'left'
        }, {
          id: 'right',
          type: 'linear',
          position: 'right'
        }]
      }
    };

    return (
      <div className="statistics">
        <div className="row">
          <div className="col s4">
            <label>Min price</label>
            <div>{statisticData.min}</div>
          </div>
          <div className="col s4">
            <label>Max price</label>
            <div>{statisticData.max}</div>
          </div>
          <div className="col s4">
            <label>Average</label>
            <div>{statisticData.average}</div>
          </div>
        </div>
        <div className="weekly">
          <label>Daily</label>
          <div style={{width: '30vw', height: '200px'}}>
            <Chart labels={chartLabels} dataset={chartData} options={options} />
          </div>
        </div>
      </div>
    );
  }
}
