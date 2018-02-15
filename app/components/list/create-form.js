import {h, Component} from 'preact';


export class CreateForm extends Component {

    constructor() {
        super();
        this.state = {};
    }

    handleChange(event, field) {
        this.setState({[field]: event.target.value});
    }
 
    save() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="create-form">
                <div className="item-name">
                    <input type="text" value={this.state.name} handleChange={event => this.handleChange(event, 'name')} />
                </div>
                <div className="item-amount">
                    <input type="text" value={this.state.amount} handleChange={event => this.handleChange(event, 'amount')} />
                </div>
                <div className="item-price">
                    <input type="text" value={this.state.price} handleChange={event => this.handleChange(event, 'price')} />
                </div>
                <div className="item-quality">
                    <input type="checkbox" id="item-quality" value={this.state.hq} handleChange={event => this.handleChange(event, 'hq')} />
                    <label for="item-quality">Is HQ?</label>
                </div>
                <div className="buttons">
                    <button className="primary" onClick={() => this.save()}>Save</button>
                    <button className="alert" onClick={() => this.reset()}>X</button>
                </div>
            </div>
        )
    }
}
