import { h, Component } from 'preact';
import { Router } from 'preact-router';

import {List} from './list/list';

debugger;

export class App extends Component {

	render() {
		return (
			<div id="app">
				<List />
			</div>
		);
	}
}