// Copyright (c) 2024 Algorealm, Inc.

// imports
import { createRequire } from "module";
import path, { parse } from 'path';
import { fileURLToPath } from 'url';

// imports
const require = createRequire(import.meta.url);
const bodyParser = require('body-parser');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const express = require('express');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

// blockchain essentials
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { mnemonicGenerate, cryptoWaitReady, blake2AsHex, xxhashAsHex } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';

// contract API import
const chain = await import('./contract.cjs');

// contract metadata import
import * as meta from "./metadata.js";

// storage API import
import * as storg from "./storage.js";

// utility functions import
import * as util from "./utility.js"

// Kilt API import
import * as kilt from "./kilt.js";

// blockchain config
const contract_addr = "5F3HGhYPVDn8nJb4DBNckk4UhE8aR7DTiCgqrPqgNfksM7jG";
const wsProvider = new WsProvider('ws://127.0.0.1:9944');
const api = await ApiPromise.create({ provider: wsProvider });
const contract = new ContractPromise(api, meta.metadata(), contract_addr);
const keyring = new Keyring({ type: 'sr25519' });

// test accounts
let alice = undefined;
let bob = undefined;

// wait 5 secs for the wasm init
setTimeout(async () => {
    await cryptoWaitReady().then(() => {
        alice = keyring.addFromUri('//Alice');    // for running tests
        bob = keyring.addFromUri('//Bob');    // for running tests
    });
}, 5000);

// a very simple session cache
class SessionCache {
    cache = {}

    get = (key) => {
        return this.cache[key];
    }

    set = (key, value) => {
        this.cache[key] = value;
        return value;
    }

    del = (key) => {
        const val = cache[key];
        delete this.cache[key];
        return val;
    }

    has = (key) => {
        return key in this.cache;
    }
}

let silverCache = new SessionCache();

// route request handlers
app.get('/', (req, res) => {
    res.render('terminal', { text: 'This is sparta' });
});

app.get('/new', (req, res) => {
    createNewSamaritan(req.query, res);
});

app.get('/del', (req, res) => {
    deleteSamaritan(req.query, res);
});

app.get('/init', (req, res) => {
    initializeSession(req.query, res);
});


// create a new Samaritan
async function createNewSamaritan(req, res) {
    try {
        // The first step is in creating a DID and its document. Samaritan DIDs are wrappers over KILT DID.
        // There is absolutely no need to reinvent the wheel KILT has already invented. We will create a light DID first ans then upgrade subsequently as the need arises.
        const lightDID = await kilt.getKiltLightDID();

        const mnemonic = req.mnemonic.replaceAll("~", " ");
        const user = keyring.createFromUri(mnemonic, 'sr25519');

        // upload the DID document to IPFS and store the address in a contract
        await storg.uploadToIPFS(JSON.stringify(lightDID)).then(async addr => {
            // call contract to register account onchain
            await chain.newAccount(api, contract, user, req.type == "app" ? false : true, addr).then(result => {
                if (result == "Revert" || result == "error") {
                    throw new Error("This account has been registered on the network.");
                } else {
                    // generate auth nonce to keep session data
                    let sessionNonce = blake2AsHex(mnemonicGenerate());
                    let samaritanDID = util.createSamaritanDID(user.address, req.type);
                    silverCache.set(sessionNonce, {
                        didDocument: lightDID,
                        user,
                        samaritanDID
                    });

                    return res.send({
                        data: {
                            did: samaritanDID,
                            nonce: sessionNonce
                        },
                        error: false
                    })
                }
            });
        });
    } catch (e) {
        return res.send({
            data: {
                msg: e.toString()
            },
            error: true
        })
    }
}

// remove Samaritan from being attached to an account
async function deleteSamaritan(req, res) {
    try {
        let sessionCache = authUser(req.nonce);
        if (sessionCache) {
            // call contract to remove Samaritan
            await chain.deleteAccount(api, contract, sessionCache.user).then(result => {
                if (result == "Revert" || result == "error") {
                    throw new Error("Samaritan account not recognized onchain.");
                } else {
                    // trigger a delete of the KILT DID if it's a full DID
                    const cachedDoc = silverCache.get(req.nonce);
                    let didDocument = cachedDoc.didDocument;

                    if (util.getUri(didDocument).indexOf("light") == -1) {
                        // delete the full DID from the KILT chain and claim the deposit
                    }
                    // else leave it for IPFS garbage collector to clean it up

                    // remove from session
                    silverCache.del(req.nonce);

                    return res.send({
                        data: {
                            msg: "Samaritan successfully removed from the network."
                        },
                        error: false
                    });
                }
            });
        } else throw new Error("Account not recognized. Run the `init` command.");
    } catch (e) {
        return res.send({
            data: {
                msg: e.toString()
            },
            error: true
        })
    }
}

// Initialize an authenticated session
async function initializeSession(req, res) {
    try {
        // get account
        const mnemonic = req.mnemonic.replaceAll("~", " ");
        const user = keyring.createFromUri(mnemonic, 'sr25519');

        // call contract to remove Samaritan
        await chain.authAccount(api, contract, user).then(async result => {
            if (JSON.stringify(result).indexOf("error") > -1) {
                throw new Error("The account is not funded. Please fund your account from Alice/Bob on PolkadotJS.");
            } else {
                const [ipfsAddress, type] = util.getStringStartingFrom('Q', util.decodeContractData(result)).split("#");
                if (ipfsAddress) {
                    // retrieve document from IPFS and save to session
                    const didDocument = JSON.parse(await storg.getFromIPFS(ipfsAddress));

                    // generate auth nonce to keep session data
                    let sessionNonce = blake2AsHex(mnemonicGenerate());
                    let samaritanDID = util.createSamaritanDID(user.address, type);
                    silverCache.set(sessionNonce, {
                        didDocument: didDocument,
                        user,
                        samaritanDID
                    });

                    return res.send({
                        data: {
                            did: samaritanDID,
                            nonce: sessionNonce
                        },
                        error: false
                    });
                } else {
                    throw new Error("Account not recognized.");
                }
            }
        });
    } catch (e) {
        return res.send({
            data: {
                msg: e.toString()
            },
            error: true
        })
    }
}

function authUser(nonce) {
    if (silverCache.has(nonce)) {
        return silverCache.get(nonce);
    }

    return false;
}

app.listen(port, () => console.info(`listening on port ${port}`));
