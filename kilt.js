// Copyright (c) 2024 Algorealm, Inc.

import { createRequire } from "module";
const require = createRequire(import.meta.url);
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// important imports
import * as Kilt from '@kiltprotocol/sdk-js'
import { mnemonicGenerate, cryptoWaitReady, blake2AsHex, xxhashAsHex, mnemonicToMiniSecret } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';

// utility functions
import * as util from "./utility.js";

// set up the samaritan test account
const keyring = new Keyring({ type: 'sr25519' });
let api = undefined;
let sam = undefined;

await cryptoWaitReady().then(() => {
    // sam = keyring.createFromUri("shoe urban series connect prize poverty mimic random warm melody fence valid", 'sr25519');
    // sam = keyring.createFromUri("yellow obscure salmon affair extra six bubble clutch fly bread away tired", 'sr25519');
    sam = keyring.createFromUri("lava couch around wave clog wool old melt delay detail coyote bus", 'sr25519');
});

export async function connect() {
    try {
        // set up the samaritan test account
        // api = await Kilt.connect('wss://peregrine.kilt.io/parachain-public-ws');
        await Kilt.connect(`wss://peregrine.kilt.io/parachain-public-ws`);
        api = Kilt.ConfigService.get(`api`);
    } catch (e) {
        return false;
    }
    return true;
}

export async function getKiltLightDID(cid) {
    const keyring = new Keyring({ type: 'sr25519' });
    const mnemonic = mnemonicGenerate();
    const auth = keyring.createFromUri(mnemonic, 'sr25519');

    // Create a light DID from the generated authentication key.
    const lightDID = Kilt.Did.createLightDidDocument({
        authentication: [auth]
    })

    return lightDID
}
