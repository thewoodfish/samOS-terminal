export function metadata() {
    return {
        "source": {
            "hash": "0x7b765c710b106a466a1b31fe4487c84c10a30495d24efa9fe3ab334642231d2c",
            "language": "ink! 4.3.0",
            "compiler": "rustc 1.75.0-nightly",
            "build_info": {
                "build_mode": "Release",
                "cargo_contract_version": "3.2.0",
                "rust_toolchain": "nightly-aarch64-apple-darwin",
                "wasm_opt_settings": {
                    "keep_debug_symbols": false,
                    "optimization_passes": "Z"
                }
            }
        },
        "contract": {
            "name": "sam_os",
            "version": "0.1.0",
            "authors": [
                "[your_name] <[your_email]>"
            ]
        },
        "spec": {
            "constructors": [
                {
                    "args": [],
                    "default": false,
                    "docs": [
                        "Constructor that initializes the SamaritanOS contract storage"
                    ],
                    "label": "new",
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink_primitives",
                            "ConstructorResult"
                        ],
                        "type": 3
                    },
                    "selector": "0x9bae9d5e"
                }
            ],
            "docs": [],
            "environment": {
                "accountId": {
                    "displayName": [
                        "AccountId"
                    ],
                    "type": 12
                },
                "balance": {
                    "displayName": [
                        "Balance"
                    ],
                    "type": 14
                },
                "blockNumber": {
                    "displayName": [
                        "BlockNumber"
                    ],
                    "type": 17
                },
                "chainExtension": {
                    "displayName": [
                        "ChainExtension"
                    ],
                    "type": 18
                },
                "hash": {
                    "displayName": [
                        "Hash"
                    ],
                    "type": 15
                },
                "maxEventTopics": 4,
                "timestamp": {
                    "displayName": [
                        "Timestamp"
                    ],
                    "type": 16
                }
            },
            "events": [
                {
                    "args": [
                        {
                            "docs": [],
                            "indexed": true,
                            "label": "account_id",
                            "type": {
                                "displayName": [
                                    "AccountId"
                                ],
                                "type": 12
                            }
                        }
                    ],
                    "docs": [],
                    "label": "AccountCreated"
                },
                {
                    "args": [
                        {
                            "docs": [],
                            "indexed": true,
                            "label": "account_id",
                            "type": {
                                "displayName": [
                                    "AccountId"
                                ],
                                "type": 12
                            }
                        }
                    ],
                    "docs": [],
                    "label": "AccountRemoved"
                }
            ],
            "lang_error": {
                "displayName": [
                    "ink",
                    "LangError"
                ],
                "type": 5
            },
            "messages": [
                {
                    "args": [
                        {
                            "label": "r#type",
                            "type": {
                                "displayName": [
                                    "bool"
                                ],
                                "type": 6
                            }
                        },
                        {
                            "label": "did_doc_ipfs_addr",
                            "type": {
                                "displayName": [
                                    "IpfsAddress"
                                ],
                                "type": 0
                            }
                        },
                        {
                            "label": "ss58_address",
                            "type": {
                                "displayName": [
                                    "SS58Address"
                                ],
                                "type": 0
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Create a new account on the network"
                    ],
                    "label": "new_account",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 7
                    },
                    "selector": "0x6030efe9"
                },
                {
                    "args": [],
                    "default": false,
                    "docs": [
                        " Delete a Samaritan from the network"
                    ],
                    "label": "delete_account",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 7
                    },
                    "selector": "0xb476f936"
                },
                {
                    "args": [],
                    "default": false,
                    "docs": [
                        " Authenticate an account and return its DID document CID"
                    ],
                    "label": "auth_account",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 10
                    },
                    "selector": "0x287e57c7"
                },
                {
                    "args": [
                        {
                            "label": "ss58_address",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 0
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Verify if a DID exists in contract storage"
                    ],
                    "label": "did_exists",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 11
                    },
                    "selector": "0x007b8a37"
                }
            ]
        },
        "storage": {
            "root": {
                "layout": {
                    "struct": {
                        "fields": [
                            {
                                "layout": {
                                    "root": {
                                        "layout": {
                                            "struct": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0x913d5f2c",
                                                                "ty": 0
                                                            }
                                                        },
                                                        "name": "r#type"
                                                    },
                                                    {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0x913d5f2c",
                                                                "ty": 0
                                                            }
                                                        },
                                                        "name": "did_doc_ipfs_addr"
                                                    }
                                                ],
                                                "name": "AccountInfo"
                                            }
                                        },
                                        "root_key": "0x913d5f2c"
                                    }
                                },
                                "name": "accounts"
                            },
                            {
                                "layout": {
                                    "leaf": {
                                        "key": "0x00000000",
                                        "ty": 2
                                    }
                                },
                                "name": "addresses"
                            }
                        ],
                        "name": "SamOs"
                    }
                },
                "root_key": "0x00000000"
            }
        },
        "types": [
            {
                "id": 0,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 1
                        }
                    }
                }
            },
            {
                "id": 1,
                "type": {
                    "def": {
                        "primitive": "u8"
                    }
                }
            },
            {
                "id": 2,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 0
                        }
                    }
                }
            },
            {
                "id": 3,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 4
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 5
                                        }
                                    ],
                                    "index": 1,
                                    "name": "Err"
                                }
                            ]
                        }
                    },
                    "params": [
                        {
                            "name": "T",
                            "type": 4
                        },
                        {
                            "name": "E",
                            "type": 5
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 4,
                "type": {
                    "def": {
                        "tuple": []
                    }
                }
            },
            {
                "id": 5,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "index": 1,
                                    "name": "CouldNotReadInput"
                                }
                            ]
                        }
                    },
                    "path": [
                        "ink_primitives",
                        "LangError"
                    ]
                }
            },
            {
                "id": 6,
                "type": {
                    "def": {
                        "primitive": "bool"
                    }
                }
            },
            {
                "id": 7,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 8
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 5
                                        }
                                    ],
                                    "index": 1,
                                    "name": "Err"
                                }
                            ]
                        }
                    },
                    "params": [
                        {
                            "name": "T",
                            "type": 8
                        },
                        {
                            "name": "E",
                            "type": 5
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 8,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 4
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 9
                                        }
                                    ],
                                    "index": 1,
                                    "name": "Err"
                                }
                            ]
                        }
                    },
                    "params": [
                        {
                            "name": "T",
                            "type": 4
                        },
                        {
                            "name": "E",
                            "type": 9
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 9,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "index": 0,
                                    "name": "AccountExistsAlready"
                                },
                                {
                                    "index": 1,
                                    "name": "AccountUnknown"
                                }
                            ]
                        }
                    },
                    "path": [
                        "sam_os",
                        "sam_os",
                        "Error"
                    ]
                }
            },
            {
                "id": 10,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 0
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 5
                                        }
                                    ],
                                    "index": 1,
                                    "name": "Err"
                                }
                            ]
                        }
                    },
                    "params": [
                        {
                            "name": "T",
                            "type": 0
                        },
                        {
                            "name": "E",
                            "type": 5
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 11,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 6
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 5
                                        }
                                    ],
                                    "index": 1,
                                    "name": "Err"
                                }
                            ]
                        }
                    },
                    "params": [
                        {
                            "name": "T",
                            "type": 6
                        },
                        {
                            "name": "E",
                            "type": 5
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 12,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "type": 13,
                                    "typeName": "[u8; 32]"
                                }
                            ]
                        }
                    },
                    "path": [
                        "ink_primitives",
                        "types",
                        "AccountId"
                    ]
                }
            },
            {
                "id": 13,
                "type": {
                    "def": {
                        "array": {
                            "len": 32,
                            "type": 1
                        }
                    }
                }
            },
            {
                "id": 14,
                "type": {
                    "def": {
                        "primitive": "u128"
                    }
                }
            },
            {
                "id": 15,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "type": 13,
                                    "typeName": "[u8; 32]"
                                }
                            ]
                        }
                    },
                    "path": [
                        "ink_primitives",
                        "types",
                        "Hash"
                    ]
                }
            },
            {
                "id": 16,
                "type": {
                    "def": {
                        "primitive": "u64"
                    }
                }
            },
            {
                "id": 17,
                "type": {
                    "def": {
                        "primitive": "u32"
                    }
                }
            },
            {
                "id": 18,
                "type": {
                    "def": {
                        "variant": {}
                    },
                    "path": [
                        "ink_env",
                        "types",
                        "NoChainExtension"
                    ]
                }
            }
        ],
        "version": "4"
    };
}