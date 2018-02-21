import {ToggleRecordPacketsAction} from 'app/actions/toggle-record-packets-action';
import {Store} from 'app/store';
import {h, Component} from 'preact';

export class PacketsPage extends Component {

  constructor(props) {
    super(props);

    Store.getInstance().setState({packets: [], recordPackets: false});
    Store.getInstance().subscribe(state =>
      this.setState({packets: state.packets || [], recordPackets: state.recordPackets})
    )
  }

  toggleRecording() {
    debugger;
    new ToggleRecordPacketsAction();
  }

  render() {
    return (
      <div className="packets">
        <header>
          <input
            type="checkbox"
            id="record-packets"
            value={this.state.recordPackets}
            onChange={() => this.toggleRecording()}
          />
          <label for="record-packets">
            {this.state.recordPackets ? 'Stop' : 'Start'} recording TCP packets
          </label>
        </header>
        {this.state.packets.map(packet =>
          <div className="packet">
            {packet.ipHeader.srcaddr}:{packet.tcpHeader.srcport}
            to
            {packet.ipHeader.dstaddr}:{packet.tcpHeader.dstport}
            <div>{packet.data}</div>
          </div>
        )}
      </div>
    );
  }
}