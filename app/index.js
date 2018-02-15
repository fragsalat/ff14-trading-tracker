import { h, render } from 'preact';
import {App} from './components/app';
import '../static/scss/index.scss';

let root;
function init() {
	root = render(<App />, document.body, root);
}
init();