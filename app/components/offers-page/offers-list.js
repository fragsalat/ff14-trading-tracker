import {h, Component} from 'preact';

export class OffersList extends Component {
    
    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);
        this.state = props;
    }

    componentWillReceiveProps(props) {
        this.setState(props);
    }

    render() {
        return (
            <div class="offer-list">
                <table className="highlight">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Quality</th>
                            <th>Retailer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.offers.map(offer => 
                            <tr>
                                <td>{offer.createdAt.toLocaleString('en', {day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'})}.</td>
                                <td>{offer.price}</td>
                                <td>{offer.quantity}</td>
                                <td>{offer.totalPrice}</td>
                                <td>{offer.quality}</td>
                                <td>{offer.retailer}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
