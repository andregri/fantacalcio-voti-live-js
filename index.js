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