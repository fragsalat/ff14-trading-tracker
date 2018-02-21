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
        if (ethernet.info.type === decoders.PROTOCOL.ETHERNET.IPV4) {
          const ipv4 = decoders.IPV4(buffer, ethernet.offset);

          if (ipv4.info.protocol === decoders.PROTOCOL.IP.TCP) {

            const tcp = decoders.TCP(buffer, ipv4.offset);
            console.log(`from ${ipv4.info.srcaddr}:${tcp.info.srcport} to ${ipv4.info.dstaddr}:${tcp.info.dstport}`);

            const dataLength = ipv4.info.totallen - ipv4.hdrlen - tcp.hdrlen;
            const data = buffer.slice(tcp.offset, tcp.offset + dataLength);
            const hex = Array.from(data).reduce((hex, byte) => {
              const byteStr = byte.toString(16);
              return hex + new Array(byteStr.length % 2 + 1).join('0') + byteStr;
            }, '');
            console.log(hex);
            // Notify for new packet
            new NewPacketAction(ipv4.info, tcp.info, data).dispatch();
            this.stream.publish(data, !!device.addresses.find(address => address.addr === ipv4.info.srcaddr));
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