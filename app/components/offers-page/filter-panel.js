import {h, Component} from 'preact';
import {Item} from 'app/model/item';
import {Op} from 'sequelize';

export class FilterPanel extends Component {
    
    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemName: ''
        };
    }
    
    
    findItems(name) {
        Item.findAll({
            where: {
            name: {
                [Op.like]: `${name}%`
            }
            },
            order: [['name', 'ASC']],
            limit: 10
        }).then(items => {
            this.setState({items, itemName: name})
        });
    }

    onChange(itemName) {
        const item = this.state.items.find(item => item.name === itemName);

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(item);
        }
    }

    render() {
        return (
            <div className="filter-panel">
                <label>
                    Item name
                    <input
                        type="text"
                        list="items"
                        value={this.state.itemName}
                        onKeyUp={event => this.findItems(event.target.value)}
                        onChange={event => this.onChange(event.target.value)}
                    />
                    <datalist id="items">
                        {this.state.items.map(item =>
                            <option value={item.name} />
                        )}
                    </datalist>
                </label>
            </div>
        );
    }
}