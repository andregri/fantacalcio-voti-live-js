async function main() {

    const api = require('./api');

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
    console.log(JSON.stringify(jsonDescriptor))
    const newData = await api.decodeProtobufMessage(protoMsg, jsonDescriptor)

    // save the latest data to a file
    var fs = require('fs');
    fs.writeFile("../data/9.json", JSON.stringify(newData, null, 4), function (err) {
        if (err) {
            console.log(err);
        }
    });

    // TODO
    const dataLib = require('./data')
    //const dataArray = null // TODO: get data array from storage
    //dataLib.appendLiveData(dataArray, newData, serverDeltaTime)
    // TODO: push dataArray to storage
}

main();