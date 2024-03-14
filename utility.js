export function Utf8ArrayToStr(array) {

    // adopted from:
    //   http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

    /* utf.js - UTF-8 <=> UTF-16 convertion
    *
    * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
    * Version: 1.0
    * LastModified: Dec 25 1999
    * This library is free.  You can redistribute it and/or modify it.
    */

    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;

    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}

export function randomStr(len) {
    let ans = '';
    const arr = "1234567890abcdefghijklmnopqrstuvwxyz";

    for (let i = len; i > 0; i--) {
        ans +=
            arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}

export function syncData(kvArray, dbValue) {
    for (var i = 0; i < kvArray.length; i++) {
        let [key, value] = kvArray[i].split("=");

        dbValue[key] = value;
    }

    return dbValue;
}

// decode contract data
export function decodeContractData(data) {
    const hexString = data.Ok.data.slice(2);
    const buffer = Buffer.from(hexString.slice(2), 'hex');
    return buffer.toString().trim();
}

export function getStringStartingFrom(char, inputString) {
    const indexQ = inputString.indexOf(char);
    if (indexQ !== -1) { // Check if 'Q' is found in the string
        return inputString.substring(indexQ);
    } else {
        console.log("String does not contain 'Q'" + inputString);
        return "";
    }
}

export function getUri(obj) {
    return obj.uri ? obj.uri : obj.fullDid.uri;
}

// create a samaritanOS DID
// Its pretty simple. Can be app | root (user)
export function createSamaritanDID(address, type) {
    return `did:sam:${type == "app" ? `apps` : `root`}:${address}`;
}