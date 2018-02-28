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

    this.state = {
      activePage: localStorage.getItem('active-page')
    };
  }

  setPage(page) {
    this.setState({activePage: page});
    localStorage.setItem('active-page', page);
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
                className={`menu-item ${!this.state.activePage || this.state.activePage === 'items' ? 'active' : ''}`}
                onClick={() => this.setPage('items')}
              >
                <a>Items</a>
              </li>
              <li
                className={`menu-item ${this.state.activePage === 'offers' ? 'active' : ''}`}
                onClick={() => this.setPage('offers')}
              >
                <a>Offers</a>
              </li>
              <li
                className={`menu-item ${this.state.activePage === 'packets' ? 'active' : ''}`}
                onClick={() => this.setPage('packets')}
              >
                <a>Packets</a>
              </li>
              <li
                className={`menu-item ${this.state.activePage === 'messages' ? 'active' : ''}`}
                onClick={() => this.setPage('messages')}
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