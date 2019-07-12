# aionhelpers

This package is designed to make your work easier.

## installation 

    npm i aionweb3helpers
    
## Usage

    const aion = require("aionweb3helpers");
    

## AVM Contract Methods (Encode)
    let data = web3.avm.contract.method("setString").inputs(["String"], ["Hello AVM"]).encode();
        const txObject = {
          from: fromAddress,
          to: contractAddress
          data: data,
          gasPrice: gasPrice,
          gas: gas,
          type: '0xf'
        }
    let ethRes = await web3.eth.call(txObject);
    let avmRes = await web3.avm.contract.decode('string', ethRes);
    return avmRes;
    
Here calling a method with arguments
   
 ## Methods and Parameters
    1. The method method accepts and handles the name of the method you wish to call from a deployed AVM Contract.
    2. The inputs method accepts and handles the list of data types (first array) and values (second array) for the method of          an AVM Contract.
    3. And finally, the encode method calls the web3.avm.abi.encode method on all the parameters and returns the encoded data          to be sent in a transaction or read the blockchain state.

Using the aionhelpers package

    const aion = require("aionweb3helpers");
         let input = {
          "httpProvider": "https://aion.api.nodesmith.io/v1/mastery/jsonrpc?apiKey=xxxxxxxxxxxxxxxxxxxxxx",
          "privateKey": "",
          "contractAddr": "",
          "method": 'setString',
          "input_Type":[String],
          "input_Args":["Hello AVM"],
          "decoder": "string"
      };
      
    await aion.callWithArgs(input);
    
 ## Calling Method without Arguments
 
     const aion = require("aionweb3helpers");
           let input = {
            "httpProvider": "https://aion.api.nodesmith.io/v1/mastery/jsonrpc?apiKey=xxxxxxxxxxxxxxxxxxxxxx",
            "privateKey": "",
            "contractAddr": "",
            "method": 'setString',
            "decoder": "string"
        };
      
    await aion.call(input);
    
 ## Calling Transactional Method
 
     const aion = require("aionweb3helpers");
           let input = {
            "httpProvider": "https://aion.api.nodesmith.io/v1/mastery/jsonrpc?apiKey=xxxxxxxxxxxxxxxxxxxxxx",
            "privateKey": "",
            "contractAddr": "",
            "method": 'setString',
            "input_Type":[String],
            "input_Args":["Hello AVM"],
            "decoder": "string"
        };
      
    await aion.signedTransaction(input);










