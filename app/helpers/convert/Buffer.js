const Buffer = require('buffer').Buffer;

export default function(buffer) {
    return new Buffer(buffer).toString('base64');
}
