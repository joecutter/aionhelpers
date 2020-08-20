const Web3 = require("aion-web3")

var config = async (httpProvider) => {
    // Create Web3 Object
   return await new Web3(
        new Web3.providers.HttpProvider(httpProvider)
    );
};

var signedTransaction = async  (input)=> {
    console.log("\n========================== TRANSACTION CALL ==========================\n");
     await config(input.httpProvider).then(async (web3)=>{
        const account = web3.eth.accounts.privateKeyToAccount(input.privateKey);
        const contractAddr = input.contractAddr;
    
        console.log("input %j",input);
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
    
            console.log("\n\n===============================SIGNED TRANSACTION CREATED==========================\n\n");
    
            const res = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                .on('receipt', receipt => {
                    console.log("Receipt received!\ntxHash =", receipt.transactionHash)
                });
    
            console.log(res);
            return res;
        }catch(err){
            logger.error(err);
            throw err;
        }
     });
   
};

var call = async  (input)=> {
    console.log("\n========================== METHOD CALL ==========================\n");
     await config(input.httpProvider).then(async (web3)=>{
        const account = web3.eth.accounts.privateKeyToAccount(input.privateKey);
        const contractAddr = input.contractAddr;

        console.log("input %j",input);
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
            console.log("\n\n RESPOND FROM  CONTRACT :==> %s \n\n",avmRes);
            return avmRes;
        }catch(err){
            logger.error(err);
            throw err;
        }
    });
};

var callWithArgs = async  (input) =>{
    console.log("\n========================== METHOD CALL WITH ARGS ==========================\n");
    await config(input.httpProvider).then(async (web3)=>{
        const account = web3.eth.accounts.privateKeyToAccount(input.privateKey);
        const contractAddr = input.contractAddr;

        console.log("input %j",input);
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
            console.log("\n\n RESPOND FROM  CONTRACT :==> %s \n\n",avmRes);
            return avmRes;
        }catch(err){
            logger.error(err);
            throw err;
        }
     });
    
};


exports.callWithArgs = callWithArgs;
exports.call = call;
exports.signedTransaction = signedTransaction;
exports.config = config;