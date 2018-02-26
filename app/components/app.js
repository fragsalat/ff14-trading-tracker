import {h, Component} from 'preact';
import {TradesPage} from 'app/components/trades-page/trades-page';
import {PacketsPage} from 'app/components/packets-page/packets-page';
import {MessagesPage} from 'app/components/messages-page/messages-page';
import {OffersPage} from 'app/components/offers-page/offers-page';

export class App extends Component {

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  renderPage() {
    switch (this.state.activePage) {
      case 'packets': return <PacketsPage />;
      case 'messages': return <MessagesPage />
      case 'offers': return <OffersPage />
      case 'items':
      default:
        return <TradesPage />;
    }

  }

  /**
   * @return {JSX}
   */
  render() {
    return (
      <div className="page">
        <nav className="menu">
          <div className="nav-wrapper">
            <ul className="menu-items left">
              <li
                className={`menu-item ${this.state.activePage === 'items' ? 'active' : ''}`}
                onClick={() => this.setState({activePage: 'items'})}
              >
                <a>Items</a>
              </li>
              <li
                className={`menu-item ${this.state.activePage === 'offers' ? 'active' : ''}`}
                onClick={() => this.setState({activePage: 'offers'})}
              >
                <a>Offers</a>
              </li>
              <li
                className={`menu-item ${this.state.activePage === 'packets' ? 'active' : ''}`}
                onClick={() => this.setState({activePage: 'packets'})}
              >
                <a>Packets</a>
              </li>
              <li
                className={`menu-item ${this.state.activePage === 'messages' ? 'active' : ''}`}
                onClick={() => this.setState({activePage: 'messages'})}
              >
                <a>Messages</a>
              </li>
            </ul>
          </div>
        </nav>
        {this.renderPage()}
      </div>
    )
  }
}