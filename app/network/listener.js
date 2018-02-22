import {NewPacketAction} from '../actions/new-packet-action';
import {TcpStream} from '../network/tcp-stream';
import {Cap, decoders} from 'cap';

export class NetworkListener {

  /**
   * @return {NetworkListener}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new NetworkListener();
    }
    return this.instance;
  }

  constructor() {
    this.cap = new Cap();
    this.stream = new TcpStream();
  }

  connect(filter) {
    const device = Cap.deviceList().find(device => device.addresses.length);
    const bufferSize = 10 * 1024 * 1024;
    const buffer = new Buffer(65535);
    this.linkType = this.cap.open(device.name, filter, bufferSize, buffer);

    console.log(this.linkType);
    this.cap.on('packet', (length, trunctated) => {
      const ethernet = decoders.Ethernet(buffer);
      if (this.linkType === 'ETHERNET') {
        // Decode IP header
        if (ethernet.info.type === decoders.PROTOCOL.ETHERNET.IPV4) {
          const ipv4 = decoders.IPV4(buffer, ethernet.offset);
          // Decode TCP header
          if (ipv4.info.protocol === decoders.PROTOCOL.IP.TCP) {
            const tcp = decoders.TCP(buffer, ipv4.offset);
            const dataLength = ipv4.info.totallen - ipv4.hdrlen - tcp.hdrlen;
            const data = buffer.slice(tcp.offset, tcp.offset + dataLength);
            // Notify for new packet
            const packet = {
              ipv4Header: ipv4.info,
              tcpHeader: tcp.info,
              data: Array.from(data)
            };
            new NewPacketAction(packet).dispatch();
            this.stream.publish(packet, !!device.addresses.find(address => address.addr === ipv4.info.srcaddr));
          }
        }
      }
    });
  }

  /**
   * Pass callback to
   * @param callback
   */
  onPacket(callback) {
    this.stream.subscribe(callback);
  }
}