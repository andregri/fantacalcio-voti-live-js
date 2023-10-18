const api = require('../src/api')
const fs = require('fs');

// TEST decodeProtobufMessage
fs.readFile('../test_data/protobuf_msg_base64.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const msg = Buffer.from(data, 'base64')
    const actual = api.decodeProtobufMessage(msg, './proto.json')
    console.log(JSON.stringify(actual.protoData))
});