import {h, Component} from 'preact';
import {CreateForm} from './create-form'

export class List extends Component {

    render() {
        return (
            <div className="item-list">
                <CreateForm />
            </div>
        )
    }
}