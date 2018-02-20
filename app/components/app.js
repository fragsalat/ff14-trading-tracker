import {PacketsPage} from 'app/components/packets-page/packets-page';
import {h, Component} from 'preact';
import {ItemPage} from 'app/components/item-page/item-page';

export class App extends Component {

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  renderPage() {
    switch (this.state.activePage) {
      case 'items': return <ItemPage />;
      case 'packets': return <PacketsPage />;
    }
  }

  /**
   * @return {JSX}
   */
  render() {
    return (
      <div className="page">
        <nav className="menu">
          <ul className="menu-items">
            <li className="menu-item" onClick={() => this.setState({activePage: 'items'})}>
              Items
            </li>
            <li className="menu-item" onClick={() => this.setState({activePage: 'packets'})}>
              Packets
            </li>
          </ul>
        </nav>
        {this.renderPage()}
      </div>
    )
  }
}