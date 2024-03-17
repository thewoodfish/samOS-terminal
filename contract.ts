import { BN, BN_ONE, BN_TWO } from "@polkadot/util";
import type { WeightV2 } from '@polkadot/types/interfaces'

const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);
const storageDepositLimit: BN = new BN(1000);

export async function newAccount(api: any, contract: any, account: any, _type: any, ipfs_address: any, ss58_address: any) {
    // Get the initial gas WeightV2 using api.consts.system.blockWeights['maxBlock']
    const gasLimit = api.registry.createType(
        'WeightV2',
        api.consts.system.blockWeights['maxBlock']
    )

    // Query the contract message
    // This will return the gas required and storageDeposit to execute the message
    // and the result of the message
    const { gasRequired, storageDeposit, result } = await contract.query.newAccount(
        account.address,
        {
            gasLimit: gasLimit,
            storageDepositLimit: null,
            value: new BN('1000000000000000000')
        }, _type, ipfs_address, ss58_address
    )

    // Check for errors
    if (result.isErr) {
        let error = ''
        if (result.asErr.isModule) {
            const dispatchError = api.registry.findMetaError(result.asErr.asModule)
            error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
        } else {
            error = result.asErr.toString()
        }

        throw new Error(error);
        return
    }

    // Even if the result is Ok, it could be a revert in the contract execution
    if (result.isOk) {
        const flags = result.asOk.flags.toHuman()
        // Check if the result is a revert via flags
        if (flags.includes('Revert')) {
            return "error";
        }
    }

    // Gas require is more than gas returned in the query
    // To be safe, we double the gasLimit.
    // Note, doubling gasLimit will not cause spending more gas for the Tx
    const estimatedGas = api.registry.createType(
        'WeightV2',
        {
            refTime: gasRequired.refTime.toBn().mul(BN_TWO),
            proofSize: gasRequired.proofSize.toBn().mul(BN_TWO),
        }
    ) as WeightV2

    const unsub = await contract.tx
        .newAccount({
            gasLimit: estimatedGas,
            storageDepositLimit: null,
            value: new BN('10000000') // 1 TOKEN or it could be value you want to send to the contract in title
        }, _type, ipfs_address, ss58_address)
        .signAndSend(account, (res: any) => {
            // Send the transaction, like elsewhere this is a normal extrinsic
            // with the same rules as applied in the API (As with the read example,
            // additional params, if required can follow)
            if (res.status.isInBlock) {
                console.log('in a block')
            }
            if (res.status.isFinalized) {
                console.log('Successfully sent the txn')
                unsub()
            }
        })
}

export async function deleteAccount(api: any, contract: any, account: any) {
    // Get the initial gas WeightV2 using api.consts.system.blockWeights['maxBlock']
    const gasLimit = api.registry.createType(
        'WeightV2',
        api.consts.system.blockWeights['maxBlock']
    )

    // Query the contract message
    // This will return the gas required and storageDeposit to execute the message
    // and the result of the message
    const { gasRequired, storageDeposit, result } = await contract.query.deleteAccount(
        account.address,
        {
            gasLimit: gasLimit,
            storageDepositLimit: null,
            value: new BN('1000000000000000000')
        }
    )

    // Check for errors
    if (result.isErr) {
        let error = ''
        if (result.asErr.isModule) {
            const dispatchError = api.registry.findMetaError(result.asErr.asModule)
            error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
        } else {
            error = result.asErr.toString()
        }

        throw new Error(error);
        return
    }

    // Even if the result is Ok, it could be a revert in the contract execution
    if (result.isOk) {
        const flags = result.asOk.flags.toHuman()
        // Check if the result is a revert via flags
        if (flags.includes('Revert')) {
            return "error";
        }
    }

    // Gas require is more than gas returned in the query
    // To be safe, we double the gasLimit.
    // Note, doubling gasLimit will not cause spending more gas for the Tx
    const estimatedGas = api.registry.createType(
        'WeightV2',
        {
            refTime: gasRequired.refTime.toBn().mul(BN_TWO),
            proofSize: gasRequired.proofSize.toBn().mul(BN_TWO),
        }
    ) as WeightV2

    const unsub = await contract.tx
        .deleteAccount({
            gasLimit: estimatedGas,
            storageDepositLimit: null,
            value: new BN('10000000') // 1 TOKEN or it could be value you want to send to the contract in title
        })
        .signAndSend(account, (res: any) => {
            // Send the transaction, like elsewhere this is a normal extrinsic
            // with the same rules as applied in the API (As with the read example,
            // additional params, if required can follow)
            if (res.status.isInBlock) {
                console.log('in a block')
            }
            if (res.status.isFinalized) {
                console.log('Successfully sent the txn')
                unsub()
            }
        })
}


export async function authAccount(api: any, contract: any, account: any): Promise<any> {
    const { result, output } = await contract.query.authAccount(
        account.address,
        {
            gasLimit: api?.registry.createType('WeightV2', {
                refTime: MAX_CALL_WEIGHT,
                proofSize: PROOFSIZE,
            }) as WeightV2,
            storageDepositLimit,
        });

    return result.toHuman();
}

export async function didExists(api: any, contract: any, account: any, ss58Address: any): Promise<any> {
    const { result, output } = await contract.query.didExists(
        account.address,
        {
            gasLimit: api?.registry.createType('WeightV2', {
                refTime: MAX_CALL_WEIGHT,
                proofSize: PROOFSIZE,
            }) as WeightV2,
            storageDepositLimit,
        }, ss58Address);

    return result.toHuman();
}