import {h, Component} from 'preact';
import Chart from 'chart.js/src/chart';

export class Statistics extends Component {

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
    this.chart = new Chart(this.canvas, {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false
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
