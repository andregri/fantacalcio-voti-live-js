#!/usr/bin/env node

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

async function main() {

    const api = require('./src/api');

    const match = process.argv[2]; // read the match from inputs

    const resp = await api.getSignedUri(match);
    const signedUri = resp.signedUri;
    if (!signedUri) {
        console.log("couldn't get signedUri");
        return;
    }
    const serverDate = new Date(resp.serverDate);

    const protoMsg = await api.getProtobufMessage(signedUri)

    const jsonDescriptor = await api.getJsonDescriptor();
    const data = await api.decodeProtobufMessage(protoMsg, jsonDescriptor);

    // add serverDate field
    const newData = JSON.parse(JSON.stringify(data))
    newData.serverDate = serverDate;

    console.log(JSON.stringify(newData))
}

main();