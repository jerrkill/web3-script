"use strict";

const {GAS, GAS_LIMIT, GAS_PRICE, web3} = require('../variable');

const send = async (contract, method, account, ...args) => {
    let d, signed_txn, res;
    if (args.length==0) {
        d = await contract.methods[method]().encodeABI();
    } else {
        d = await contract.methods[method](...args).encodeABI();
    }
    const nonce = await web3.eth.getTransactionCount(account.address) + 1;
    signed_txn = await account.signTransaction({
        to: contract._address,
        value: web3.utils.toWei('0', 'ether'),
        gas: GAS,
        gasPrice: web3.utils.toWei(GAS_PRICE, 'gwei'),
        gasLimit: GAS_LIMIT,
        // nonce: nonce,
        data: d
    });
    res = await web3.eth.sendSignedTransaction(signed_txn.rawTransaction);
    return res;
}

const sendValue = async (address, value, account) => {
    let d, signed_txn, res;
    const nonce = await web3.eth.getTransactionCount(account.address) + 1;
    signed_txn = await account.signTransaction({
        to: address,
        value: web3.utils.toWei(value+'', 'ether'),
        gas: GAS,
        gasPrice: web3.utils.toWei(GAS_PRICE, 'gwei'),
        gasLimit: GAS_LIMIT,
        data: d
        // nonce: nonce
    });
    res = await web3.eth.sendSignedTransaction(signed_txn.rawTransaction);
    return res;
}

const deadline = () => {
    // 30 minutes
    return Math.floor(new Date().getTime() / 1000) + 1800;
}

const approveIfNot = async (token, owner, spender, amount) => {
    const allowance = await token.methods.allowance(owner, spender).call();
    if (web3.utils.toBN(allowance).gte(web3.utils.toBN(amount))) {
        return;
    }
    res = await token.methods.approve(spender, amount).send({from: owner});
};
const test = () => {
    console.log('I am test()')
};

module.exports = {
    approveIfNot,
    send, deadline,
    test,
    sendValue
};