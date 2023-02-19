// imports
import { createRequire } from "module";
import path from 'path';
import { fileURLToPath } from 'url';
import { SamaritanSDK } from 'samaritan-js-sdk';
import * as util from "./utility.js";
import e from "express";

const require = createRequire(import.meta.url);
const express = require('express');
const app = express();
const port = 4000;
const __filename = fileURLToPath(import.meta.url);
const _Dirname = path.dirname(__filename);

// static files
app.use(express.static('public'));
app.use('/css', express.static(_Dirname + 'public/css'));
app.use('/js', express.static(_Dirname + 'public/js'));
app.use('/img', express.static(_Dirname + 'public/img'));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.render('terminal');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/new', (req, res) => {
    createNewSamaritan(req.query, res);
});

app.get('/init', (req, res) => {
    initializeSamaritan(req.query, res);
});

app.get('/desc', (req, res) => {
    describeSamaritan(req.query, res);
});

app.get('/profile', (req, res) => {
    manageProfile(req.query, res);
});

// initialize Samaritan SDK
const sam = new SamaritanSDK("ws://127.0.0.1:1509");
let terminal = undefined;
await sam.init();

// wait 5 seconds for initialization
setTimeout(async () => {
    terminal = await sam.did.auth("still plant flow death state perhaps percent study always taken information patient");
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

async function createNewSamaritan(req, res) {
    // query network to create new Samaritan
    const user = await sam.did.createNew(req.name);

    // generate nonce
    const nonce = util.randomStr(12);

    // cache the user data
    silverCache.set(nonce, {
        did: user.did
    });

    // return details
    res.send({
        nonce,
        data: user,
        error: false
    });
}

async function initializeSamaritan(req, res) {
    // get the keys and query the network to check for existence of Samaritan
    const auth = await sam.did.auth(req.keys);

    if (auth.exists && auth.did.indexOf("sam:root") != -1) {
        // set session
        const nonce = util.randomStr(12);
        silverCache.set(nonce, {
            did: auth.did
        });

        res.send({
            nonce,
            data: {
                msg: "samaritan initialization complete"
            }
        })
        
    } else {
        res.send({
            data: {
                msg: "samaritan does not exist"
            }
        })
    }
}

// describe a samaritan 
async function describeSamaritan(req, res) {
    const didDoc = await sam.did.describe(req.did);

    if (didDoc) {
        return res.send({
            data: {
                did: req.did,
                name: didDoc.name
            },
            error: false
        });
    } else {
        return res.send({
            data: {
                msg: "samaritan not recognised"
            },
            error: true
        });
    }
}

// check for nonce
function authUser(nonce) {
    if (silverCache.has(nonce)) {
        return silverCache.get(nonce);
    }

    return false;
}

// get or set profile 
async function manageProfile(req, res) {
    // first check for auth
    const user = authUser(req.nonce);
    if (user) {
        let profile = await sam.db.get(user.did, "$profile");
        // check if it's a get or set
        if (req.data) {
            // if profile does not exist, set it
            profile = profile ? profile : {};

            // get profile first
            profile = util.syncData(req.data.split(";"), profile);
            // set data
            await sam.db.insert(user.did, "$profile", profile);
        }

        return res.send({
            data: {
                profile: profile ? profile : {},
                type: req.data ? "set" : "get"
            },
            error: false
        });
    } else {
        return res.send({
            data: {
                msg: "samaritan not recognised"
            },
            error: true
        });
    }
}



// listen on port 3000
app.listen(port, () => console.info(`listening on port ${port}`));

