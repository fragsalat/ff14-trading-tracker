import {h, Component} from 'preact';
import {Offer} from 'app/model/offer';
import {FilterPanel} from 'app/components/offers-page/filter-panel';
import {OffersList} from 'app/components/offers-page/offers-list';
import {OfferStatistics} from 'app/components/offers-page/offer-statistics';

export class OffersPage extends Component {
    
    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            offers: []
        };
    }

    findOffers(item) {
        Offer.findAll({
            where: {itemId: item.id},
            order: [['createdAt', 'DESC']],
        }).then(offers =>
            this.setState({offers})
        );
    }

    render() {
        return (
            <div className="offers-page">
                <header>
                    <FilterPanel onChange={item => this.findOffers(item)} />
                </header>
                <section>
                    <OffersList offers={this.state.offers} />
                    <OfferStatistics offers={this.state.offers} />
                </section>
            </div>
        )
    }
}
