async function main() {

    const api = require('./src/api');

    const match = 9;
    const resp = await api.getSignedUri(match);
    const signedUri = resp.signedUri;
    if (!signedUri) {
        console.log("couldn't get signedUri");
        return;
    }

    const serverDate = new Date(resp.serverDate);
    const serverDateLastUpdate = new Date();
    const serverDeltaTime = serverDateLastUpdate.getTime() - serverDate.getTime();

    const protoMsg = await api.getProtobufMessage(signedUri)

    const jsonDescriptor = await api.getJsonDescriptor();
    const newData = await api.decodeProtobufMessage(protoMsg, jsonDescriptor)

    // read old data, if exists
    var fs = require('fs');
    var oldData = null;
    try {
        oldData = JSON.parse(fs.readFileSync('./data/9_array.json', 'utf8'));
    } catch (err) {
        oldData = JSON.parse(JSON.stringify(newData)); // deep copy
    }

    // write latest data to file
    fs.writeFile("./data/9.json", JSON.stringify(newData, null, 4), function (err) {
        if (err) {
            console.log(err);
        }
    });

    // append new data to old data
    const dataLib = require('./src/data')
    dataLib.appendLiveData(oldData, newData, serverDeltaTime)

    // write array data to file
    fs.writeFile("./data/9_array.json", JSON.stringify(oldData, null, 4), function (err) {
        if (err) {
            console.log(err);
        }
    });
}

main();