jQuery(function ($, undefined) {
	var main = $('body').terminal({
		sam: function (arg1 = "", arg2 = "", arg3 = "", arg4 = "", arg5 = "") {
			switch (arg1) {
				case "help":
				case "": {
					this.echo(`samaritanOS v0.5`);
					this.echo(`Usage: sam <command> [arg1] [arg2] [arg3] [argN]`);
					this.echo(`These are common samaritan commands used in various situations:`);
					this.echo(`new [app] <mnemonic>			    creates a new samaritan. Specify "app" if you want to create a new app instance.`);
					this.echo(`init <mnemonic>		                initializes an authenticated session into the terminal.`);
					this.echo(`kill      			                delete a samaritan from the network. It must be the same account that created it that performs the operation.`);
					this.echo(`desc <DID>			                returns DID document and metadata of samaritan.`);
					this.echo(`help                                informs you about the samaritan terminal.`);

					break;
				}
				case "new": {
					// collect the parameters
					let mnemonics = "";

					// check if it's an app type
					const start = arg2 == "app" ? 2 : 1;
					for (var i = start; i < 15; i++) arguments[i] ? mnemonics += `${arguments[i]}${ i < (start + 11) ? `~` : `` }` : ``;

					// check argument conformance
					if (mnemonics.split("~").length != 12) {
						this.echo(`Error: Please enter a valid 12 words mnemonic`);
						this.echo(`Example: sam [app] init apple book cat dog house tree chair car ball sun moon door`)
					} else {
						this.echo(`Processing...`);

						// block terminal
						this.pause();
						fetch(getURL(`new`, `type=${arg2}`, `mnemonic=${mnemonics}`), {
							method: 'get',
							headers: {
								'Content-Type': 'application/json'
							}
						})
							.then(async res => {
								await res.json().then(response => {
									// resume terminal
									main.resume();

									console.log(response);
									if (response.error) {
										main.echo(response.data.msg);
									} else {
										// clear seeds
										main.clear();

										// set nonce for further communication
										sessionStorage.setItem("nonce", response.data.nonce);

										main.echo("Samaritan successfully added to the network");
										main.echo(`DID: ${response.data.did}`);
									}
								});
							})
					}

					break;
				}

				case "kill": {
					// check argument conformance
					this.push(function (verdict) {
						if (verdict == "Y") {
							this.echo(`Processing...`);

							// block terminal
							this.pause();
							fetch(getURL(`del`, `nonce=${getNonce()}`), {
								method: 'get',
								headers: {
									'Content-Type': 'application/json'
								}
							})
								.then(async res => {
									await res.json().then(response => {
										// resume terminal
										main.resume();

										if (response.error) {
											main.echo(response.data.msg);
										} else {
											main.echo("Samaritan successfully deleted from the network");
										}
										main.pop();
									});
								})
						} else {
							main.pop();
						}
					}, {
						prompt: 'Are you sure you want to proceed? This is a very destructive operation (Y/n): ',
						onPop: function (before, after) {
							verdict.pop();
						},
						label: "verdict",
					});

					break;
				}

				case "init": {
					// check argument conformance
					if (!arguments[11]) {
						this.echo(`Error: Please enter a valid 12 words mnemonic`);
						this.echo(`Example: sam init apple book cat dog house tree chair car ball sun moon door`)
					} else {
						this.echo(`Initializing...`);

						// collect the parameters
						let mnemonics = "";
						for (var i = 1; i < 13; i++) arguments[i] ? mnemonics += `${arguments[i]}${ i != 12 ? `~` : `` }` : ``;

						// block terminal
						this.pause();
						fetch(getURL(`init`, `mnemonic=${mnemonics}`), {
							method: 'get',
							headers: {
								'Content-Type': 'application/json'
							}
						})
							.then(async res => {
								await res.json().then(response => {
									// resume terminal
									main.resume();

									console.log(response);
									if (response.error) {
										main.echo(`${response.data.msg}`);
									} else {
										// set nonce for further communication
										sessionStorage.setItem("nonce", response.data.nonce);

										main.echo("Session initialization complete.");
										main.echo(`DID: ${response.data.did}`);
									}
								});
							})
					}

					break;
				}

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