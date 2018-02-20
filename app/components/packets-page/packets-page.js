import {ToggleRecordPacketsAction} from 'app/actions/toggle-record-packets-action';
import {Store} from 'app/store';
import {h, Component} from 'preact';

export class PacketsPage extends Component {

  constructor(props) {
    super(props);

    Store.getInstance().subscribe(state => {
      if (this.state) {
        this.setState({packets: state.packets, recordPackets: state.recordPackets})
      } else {
        this.state = {packets: state.packets, recordPackets: state.recordPackets};
      }
    })
  }

  toggleRecording() {
    new ToggleRecordPacketsAction();
  }

  render() {
    return (
      <div className="packets">
        <header>
          <input
            type="checkbox"
            id="record-packets"
            checked={this.state.recordPackets}
            onChange={() => this.toggleRecording()}
          />
          <label for="item-quality">
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