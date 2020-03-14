const Buffer = require('buffer').Buffer;
import { observable, action, computed } from "mobx";

export default function(buffer) {
    buffer.data = buffer.data.map(b => b);
    let buf = {
        type: buffer.type,
        data: buffer.data.map(b => b)
    }
    return new Buffer(buf).toString('base64');
}
