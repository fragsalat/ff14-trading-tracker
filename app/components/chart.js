import {h, Component} from 'preact';
import * as ChartJS from 'chart.js/src/chart';

export class Chart extends Component {

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
   * Render the charts
   */
  renderCharts() {
    // Destroy only chart when this was rendered before
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new ChartJS(this.canvas, {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...this.state.options
      },
      data: {
        labels: this.state.labels,
        datasets: this.state.dataset
      }
    });
  }

  /**
   * @return {JSX}
   */
  render() {
    return (
        <canvas ref={element => { this.canvas = element; }} />
    );
  }
}
