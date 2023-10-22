/**
 * Copyright 2023 Andrea Grillo
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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