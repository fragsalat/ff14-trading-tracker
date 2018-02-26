import {FFXIVPacketHandler} from './network/ffxi-packet-handler';
import {NetworkListener} from './network/listener';
import { h, render } from 'preact';
import {App} from './components/app';
import {bootstrap} from './bootstrap';
import '../static/scss/index.scss';

let root;
function init() {
	root = render(<App />, document.body, root);
	// Listen for FFXIV packets
	const listener = NetworkListener.getInstance();
	listener.connect('tcp and port 55006');
	listener.onPacket(FFXIVPacketHandler.handle)
}

bootstrap().then(init);
