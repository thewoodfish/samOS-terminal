jQuery(function ($, undefined) {
	var main = $('body').terminal({
		sam: function (arg1 = "", arg2 = "", arg3 = "", arg4 = "", arg5 = "") {
			switch (arg1) {
				case "help":
				case "":
					this.echo(`samaritanOS v0.1.0`);
					this.echo(`Usage: sam <command> [arg1] [arg2] [arg3] [argN]`);
					this.echo(`These are common samaritan commands used in various situations:`);
					this.echo(`new <name>			        creates a new samaritan with a non-unique name. Set <name> to "app" if you want to create a new app instance.`);
					this.echo(`init <keys>			        lets your samaritan take control of the terminal`);
					this.echo(`desc <DID>			        returns DID document and metadata of samaritan`);
					this.echo(`profile <keyN=valueN>       update the profile of your samaritan. Apps use this data by default e.g at signups. Absence of arguments displays data`);
					this.echo(`help                        informs you about the samaritan terminal`);
					this.echo(`clear			            delete all the profile data`);


					break;

				case "new":
					// check argument conformance
					if (!arg2) {
						this.echo(`fatal: You must provide a name for your samaritan`);
						this.echo(`usage: sam new <name>`);
					} else {
						if (arg2 != "app")
							this.echo(`creating your samaritan...`);
						else	
							this.echo(`processing...`)
						this.pause();

						fetch(getURL(`new`, `name=${arg2}`), {
							method: 'get',
							headers: {
								'Content-Type': 'application/json'
							}
						})
							.then(async res => {
								await res.json().then(res => {
									main.resume();

									if (res.error)
										main.echo(`fatal: ${res.data.msg}`);
									else {
										// set nonce for further communication
										sessionStorage.setItem("nonce", res.nonce);

										main.echo("samaritan successfully added to the network");

										main.echo(`DID:     ${res.data.did}`);
										main.echo(`Keys:    ${res.data.keys} ([[b;red;] You have 30 seconds to copy them.])`);

										main.pause();
										setTimeout(() => {
											main.update(-1, "Keys:    ****************************************************************************************************").resume();
										}, 30000);
									}

								});
							})
					}

					break;
				case "init":
					// check argument conformance
					if (!arg2 || arguments.length > 2) {
						this.echo(`fatal: you must provide your samaritan keys`);
						this.echo(`usage: sam init <keys> e.g sam init "bake egypt below..."`);
					} else {

						// check length of mnemonic
						if (arg2.split(/\s+/).length != 12) {
							this.echo(`fatal: invalid number of mnemonic`);
						} else {
							// clear seeds
							this.clear();
							this.echo(`initializing samaritan...`);
							this.pause();

							fetch(getURL(`init`, `keys=${arg2}`), {
								method: 'get',
								headers: {
									'Content-Type': 'application/json'
								}
							})
								.then(async res => {
									await res.json().then(res => {
										main.resume();

										if (res.error)
											main.echo(`fatal: ${res.data.msg}`);
										else {
											// set nonce for further communication
											sessionStorage.setItem("nonce", res.nonce);
											main.echo(`${res.data.msg}`);
										}
									});
								})
						}
					}

					break;

				case "desc":
					if (!inSession()) {
						main.echo(`fatal: no samaritan recognized. See 'sam help'`)
					} else {
						// check argument conformance
						if (!arg2) {
							this.echo(`fatal: you must provide DID to lookup`);
							this.echo(`usage: sam find <DID>`);
						} else {
							// check did format
							if (!isDID(arg2)) {
								this.echo(`fatal: invalid DID format`);
								this.echo(`expected DID format: did:sam:root:<address>`);
							} else {
								this.echo(`querying network...`);
								this.pause();

								fetch(getURL(`desc`, `did=${arg2}`), {
									method: 'get',
									headers: {
										'Content-Type': 'application/json'
									}
								})
									.then(res => {
										(async function () {
											await res.json().then(res => {
												main.resume();

												if (res.error)
													main.echo(`fatal: ${res.data.msg}`);
												else {
													main.echo(`DID:     ${arg2}`);
													main.echo(`Name:    ${res.data.name}`);
												}
											})
										})();
									})
							}
						}
					}

					break;

				case "profile":
					if (!inSession()) {
						main.echo(`fatal: no samaritan initialized. See 'sam help'`);
					} else {
						if (!arg2)
							this.echo(`fetching profile...`);
						else
							this.echo(`updating profile...`);
						this.pause();

						fetch(getURL(`profile`, `nonce=${getNonce()}`, `data=${arg2.replaceAll(" ", ";")}`), {
							method: 'get',
							headers: {
								'Content-Type': 'application/json'
							}
						})
							.then(res => {
								(async function () {
									await res.json().then(res => {
										main.resume();

										if (res.error)
											main.echo(`fatal: ${res.data.msg}`);
										else {
											if (res.data.type == "set")
												main.echo(`${res.data.msg}`);
											else {
												main.echo(`Profile data:`);
												Object.entries(res.data.profile).map(([key, value]) => {
													if (key != "status") main.echo(`    ${key}: ${value}`)
												});
											}
										}
									});
								})();
							})
					}

					break;

				case "clear":
					if (!inSession()) {
						main.echo(`fatal: no samaritan initialized. See 'sam help'`);
					} else {
						this.echo(`deleting...`);
						this.pause();

						fetch(getURL(`clear`, `nonce=${getNonce()}`), {
							method: 'get',
							headers: {
								'Content-Type': 'application/json'
							}
						})
							.then(res => {
								(async function () {
									await res.json().then(res => {
										main.resume();

										if (res.error)
											main.echo(`fatal: ${res.data.msg}`);
										else {
											main.echo(`${res.data.msg}`);
										}
									});
								})();
							})
					}

					break;


				default:
					this.echo(`sam: '${arg1}' is not a samaritan command. See 'sam help'.`);
			}
		},
	}, {
		greetings: function () {
			return greetings.innerHTML
		},

		name: 'samaritan',
		historySize: 10,
		checkArity: false,
		prompt: '[[b;green;]>>> ]',
		onInit: function () {

		}
	});
});

function downloadObjectAsJson(exportObj, exportName) {
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
	var dn = document.createElement('a');

	dn.setAttribute("href", dataStr);
	dn.setAttribute("download", exportName + ".jsonld");
	document.body.appendChild(dn); // required for firefox

	dn.click();
	dn.remove();
}

function qs(tag) {
	return document.querySelector(tag);
}

function inSession() {
	var exists = false;
	if (sessionStorage.getItem("nonce"))
		exists = true;

	return exists;
}

function getNonce() {
	return sessionStorage.getItem("nonce");
}

function isDID(str) {
	if (str.indexOf("did:sam:root") == -1)
		return false;

	return true;
}

function isJSONLink(str) {
	if (str.indexOf("http") == -1 || !str.endsWith(".json"))
		return false;

	return true;
}

function isGoodURL(url) {
	let isErrorFree = true;

	// break it up
	let box = url.split("/");

	// first, the url must start with a DID URI
	if (!url.startsWith("did:sam:root:") || box.length != 4)
		isErrorFree = false;

	return isErrorFree;
}

function isGoodMode(mode) {
	for (var i = 0; i < mode.length; i++)
		if (parseInt(mode[i]) > 7 || parseInt(mode[i] < 0))
			return false;

	return true;
}

function getURL() {
	let url = `\\${arguments[0]}?`;
	for (var i = 1; i < arguments.length; i++)
		url += `${arguments[i]}&`;

	return url;
}

var printObj = function (obj) {
	var string = '';

	for (var prop in obj) {
		if (typeof obj[prop] == 'string') {
			string += prop + ': ' + obj[prop] + '; \n';
		}
		else {
			string += prop + ': { \n' + print(obj[prop]) + '}';
		}
	}

	return string;
}