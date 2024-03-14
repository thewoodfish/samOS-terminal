export function metadata() {
    return {
        "source": {
            "hash": "0xec65d309896377bf0baece730e01f2034522ee8d537472e102c854be2d0f3e3a",
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
                        "type": 2
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
                    "type": 10
                },
                "balance": {
                    "displayName": [
                        "Balance"
                    ],
                    "type": 12
                },
                "blockNumber": {
                    "displayName": [
                        "BlockNumber"
                    ],
                    "type": 15
                },
                "chainExtension": {
                    "displayName": [
                        "ChainExtension"
                    ],
                    "type": 16
                },
                "hash": {
                    "displayName": [
                        "Hash"
                    ],
                    "type": 13
                },
                "maxEventTopics": 4,
                "timestamp": {
                    "displayName": [
                        "Timestamp"
                    ],
                    "type": 14
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
                                "type": 10
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
                                "type": 10
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
                "type": 4
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
                                "type": 5
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
                        "type": 6
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
                        "type": 6
                    },
                    "selector": "0xb476f936"
                },
                {
                    "args": [],
                    "default": false,
                    "docs": [
                        " Authenticate an account and return it DID document CID"
                    ],
                    "label": "auth_account",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 9
                    },
                    "selector": "0x287e57c7"
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
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 3
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 4
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
                            "type": 3
                        },
                        {
                            "name": "E",
                            "type": 4
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 3,
                "type": {
                    "def": {
                        "tuple": []
                    }
                }
            },
            {
                "id": 4,
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
                "id": 5,
                "type": {
                    "def": {
                        "primitive": "bool"
                    }
                }
            },
            {
                "id": 6,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 7
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 4
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
                            "type": 7
                        },
                        {
                            "name": "E",
                            "type": 4
                        }
                    ],
                    "path": [
                        "Result"
                    ]
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
                                            "type": 3
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 8
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
                            "type": 3
                        },
                        {
                            "name": "E",
                            "type": 8
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
                "id": 9,
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
                                            "type": 4
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
                            "type": 4
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 10,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "type": 11,
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
                "id": 11,
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
                "id": 12,
                "type": {
                    "def": {
                        "primitive": "u128"
                    }
                }
            },
            {
                "id": 13,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "type": 11,
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
                "id": 14,
                "type": {
                    "def": {
                        "primitive": "u64"
                    }
                }
            },
            {
                "id": 15,
                "type": {
                    "def": {
                        "primitive": "u32"
                    }
                }
            },
            {
                "id": 16,
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