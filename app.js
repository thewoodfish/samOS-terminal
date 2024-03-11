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

// blockchain config
const contract_addr = "5DYMZQXrDPWqxSAGXJtKzTGQS4sfheYbsQGVPZMymsiksxUj";
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

let delphiCache = new SessionCache();

// route request handlers
app.get('/', (req, res) => {
    res.render('index', { text: 'This is sparta' });
});

app.listen(port, () => console.info(`listening on port ${port}`));
