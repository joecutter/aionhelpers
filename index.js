const Web3 = require("aion-web3");
const log4js = require('log4js');
const logger = log4js.getLogger('AIONWEB3_LIBRARY');
logger.level = 'debug';

var config = async (httpProvider) => {
    // Create Web3 Object
   return await new Web3(
        new Web3.providers.HttpProvider(httpProvider)
    );
};

var signedTransaction = async  (input)=> {
    logger.debug("\n========================== TRANSACTION CALL ==========================\n");
    const web3 =  await config();
    const account = web3.eth.accounts.privateKeyToAccount(input.privateKey);
    const contractAddr = input.contractAddr;

    logger.debug("input %j",input);
    try{
        let data = web3.avm.contract.method(input.method).inputs(input.input_Type,input.input_Args).encode();

        // Create transaction object
        const txObject = {
            from: account.address,
            to: contractAddr,
            data: data,
            gasPrice: 10000000000,
            gas: 2000000,
            type: '0x1'
        };

        //client signing
        const signed = await web3.eth.accounts.signTransaction(
            txObject, account.privateKey
        ).then((res) => signedCall = res);

        logger.debug("\n\n===============================SIGNED TRANSACTION CREATED==========================\n\n");

        const res = await web3.eth.sendSignedTransaction(signed.rawTransaction)
            .on('receipt', receipt => {
                logger.debug("Receipt received!\ntxHash =", receipt.transactionHash)
            });

        logger.debug(res);
        return res;
    }catch(err){
        logger.error(err);
        throw err;
    }
};
var call = async  (input)=> {
    logger.debug("\n========================== METHOD CALL ==========================\n");
     await config(input.httpProvider).then(async (web3)=>{
        const account = web3.eth.accounts.privateKeyToAccount(input.privateKey);
        const contractAddr = input.contractAddr;

        logger.debug("input %j",input);
        try{
            let data = web3.avm.contract.method(input.method).encode();

            // Create transaction object
            const txObject = {
                from: account.address,
                to: contractAddr,
                data: data,
                gasPrice: 10000000000,
                gas: 2000000,
                type: '0x1'
            };
            //client signing
            let res = await web3.eth.call(txObject);
            let avmRes = await web3.avm.contract.decode(input.decoder, res);
            logger.debug("\n\n RESPOND FROM  CONTRACT :==> %s \n\n",avmRes);
        }catch(err){
            logger.error(err);
            throw err;
        }
    });
};
var callWithArgs = async  (input) =>{
    logger.debug("\n========================== METHOD CALL WITH ARGS ==========================\n");
    const web3 =  await config();
    const account = web3.eth.accounts.privateKeyToAccount(input.privateKey);
    const contractAddr = input.contractAddr;

    logger.debug("input %j",input);
    try{
        let data = web3.avm.contract.method(input.method).inputs(input.input_Type,input.input_Args).encode();

        // Create transaction object
        const txObject = {
            from: account.address,
            to: contractAddr,
            data: data,
            gasPrice: 10000000000,
            gas: 2000000,
            type: '0x1'
        };

        //client signing
        let res = await web3.eth.call(txObject);
        let avmRes = await web3.avm.contract.decode(input.decoder, res);
        logger.debug("\n\n RESPOND FROM  CONTRACT :==> %s \n\n",avmRes);
        return avmRes;
    }catch(err){
        logger.error(err);
        throw err;
    }
};


exports.callWithArgs = callWithArgs;
exports.call = call;
exports.signedTransaction = signedTransaction;
exports.config = config;