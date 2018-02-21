import {h, Component} from 'preact';
import {ItemPage} from 'app/components/item-page/item-page';
import {PacketsPage} from 'app/components/packets-page/packets-page';
import {MessagesPage} from 'app/components/messages-page/messages-page';

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
      case 'items':
      default:
        return <ItemPage />;
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