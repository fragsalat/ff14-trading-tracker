import {Store} from 'app/store';
import {h, Component} from 'preact';
import {LoadItemsAction} from 'app/actions/load-items-action';
import {CreateForm} from './create-form'
import {ItemList} from './item-list'
import {Statistics} from './statistics'

export class ItemPage extends Component {

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {items: [], filter: ''};
    Store.getInstance().setState({items: [], filter: ''});
    Store.getInstance().subscribe(state =>
      this.setState({items: state.items, filter: state.filter})
    );

    new LoadItemsAction();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  /**
   * @return {JSX}
   */
  render() {
    // Filter items by containing specified string
    const regex = new RegExp(`${this.state.filter || ''}`, 'i');
    const filteredItems = this.state.items.filter(item => regex.test(item.name));
    // Sort Items by date desc
    const sortedItems = filteredItems.sort((a, b) => a.created < b.created ? 1 : -1);
    return (
      <div className="item-page">
        <header>
          <CreateForm />
        </header>
        <section>
          <ItemList items={sortedItems} />
          <Statistics items={sortedItems} />
        </section>
      </div>
    )
  }
}