const Parser = class Parser {

    static decode(str, seed) {

        //console.log("DECODE:", str);
        if (!seed) {
            console.warn("Missing seed!");
            return str;
        }
        var decoded = "";
        for (var i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            if (charCode == 13) continue;
            const rnd = Parser.rnd(seed);
            //console.log("char: " + str[i] + " charCode:" + charCode + " - seed: " +seed+" -> rnd:" + rnd);
            seed++
            //const rnd = 1;            
            const decodedCharCode = charCode - (Math.floor(rnd * 2) - 1);
            decoded += String.fromCharCode(decodedCharCode);

        }

        return decoded;
    }


    static rnd(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }
}

async function getSignedUri(match) {
    const seasonId = 18
    const apiUrl = "https://www.fantacalcio.it/api/v1/SignedUri"
    const uri = `https://api.fantacalcio.it/v1/st/${seasonId}/matches/live/${match}.dat`
    const payload = {
        "resourcesUri": [uri]
    }
    const resp = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Origin": "https://www.fantacalcio.it",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0",
            "DNT": "1",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
        },
        body: JSON.stringify(payload)
    });

    const tmpRespText = await resp.text();
    const tmpRespJson = JSON.parse(tmpRespText);
    const respId = Object.keys(tmpRespJson)[0];
    const errors = tmpRespJson[respId].errors;
    if (errors.length > 0) {
        console.log(`couldn't get signedUri: status code ${errors[0].statusCode}: ${errors[0].message}`);
        return {
            serverDate: resp.headers.get('date'),
            signedUri: null
        }
    }

    console.log(resp.headers.get('date'))

    return {
        serverDate: resp.headers.get('date'),
        signedUri: tmpRespJson[respId].resources[0].signedUri,
    }
}

async function getProtobufMessage(signedUri) {
    const response = await fetch(signedUri, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/118.0",
            "Accept": "*/*",
            "Accept-Language": "en-GB,en;q=0.5",
            "Content-Type": "application/json",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "Cache-Control": "max-age=0"
        },
    })
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}

async function decodeProtobufMessage(msg, jsonDescriptor) {
    const protobuf = require("protobufjs");
    const root = protobuf.Root.fromJSON(jsonDescriptor);
    const modelName = "LiveMessage";
    const modelData = root.lookupType(modelName);
    const data = modelData.decode(msg);
    return data;
}

async function getJsonDescriptor() {
    const resp = await fetch("https://www.fantacalcio.it/js/proto/live.txt");
    const data = await resp.text();
    const seed = 98;
    return JSON.parse(Parser.decode(data, seed));
}

module.exports = { getSignedUri, getProtobufMessage, decodeProtobufMessage, getJsonDescriptor };