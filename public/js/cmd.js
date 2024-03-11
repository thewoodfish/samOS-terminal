jQuery(function ($, undefined) {
	var main = $('body').terminal({
		sam: function (arg1 = "", arg2 = "", arg3 = "", arg4 = "", arg5 = "") {
			switch (arg1) {
				case "help":
				case "":
					this.echo(`samaritanOS v0.5`);
					this.echo(`Usage: sam <command> [arg1] [arg2] [arg3] [argN]`);
					this.echo(`These are common samaritan commands used in various situations:`);
					this.echo(`new <name>			        creates a new samaritan with a non-unique name. Set <name> to "app" if you want to create a new app instance.`);
					this.echo(`init <keys>			        lets your samaritan take control of the terminal. All database operations will include your DID in their header.`);
					this.echo(`desc <DID>			        returns DID document and metadata of samaritan.`);
					this.echo(`help                        informs you about the samaritan terminal.`);

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

						// block
						this.pause();
						fetch(getURL(`new`, `name=${arg2}`), {
							method: 'get',
							headers: {
								'Content-Type': 'application/json'
							}
						})
							.then(async res => {
								await res.json().then(res => {
									// resume screen
									main.resume();

									if (res.error)
										main.echo(res.data.msg);
									else {
										// set nonce for further communication
										sessionStorage.setItem("nonce", res.nonce);

										main.echo("samaritan successfully added to the network");
										main.echo(`DID:     ${res.data.did}`);
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

function getURL() {
	let url = `\\${arguments[0]}?`;
	for (var i = 1; i < arguments.length; i++)
		url += `${(i != 1 ? '&' : "") + arguments[i]}`;

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