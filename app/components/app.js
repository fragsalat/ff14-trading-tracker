import { h, Component } from 'preact';

import {List} from './list/list';

export class App extends Component {

	render() {
		return (
			<div id="app">
				<List />
			</div>
		);
	}
}