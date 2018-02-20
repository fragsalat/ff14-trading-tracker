import {FFXIVPacketHandler} from 'app/network/ffxi-packet-handler';
import {NetworkListener} from 'app/network/listener';
import { h, render } from 'preact';
import {App} from './components/app';
import '../static/scss/index.scss';

let root;
function init() {
	root = render(<App />, document.body, root);
	// Listen for FFXIV packets
	const listener = NetworkListener.getInstance();
	listener.connect('tcp');
  listener.onPacket(FFXIVPacketHandler.handle)
}
init();