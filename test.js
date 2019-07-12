const aion = require("./index");

getAllContractType = async () =>{
    let input = {
        "httpProvider": "https://aion.api.nodesmith.io/v1/mastery/jsonrpc?apiKey=ae8d2a52c4994dd7bbbc06ac62b398d2",
        "privateKey": "02b37fcefa6f0b7a9c06c20d9779a0e2e839364a2eabac6fc631c4501fc4baa3bff00b1fb98db1d5cef32ea0f07e263c096d37aaad4bd54b3784464bdedae229",
        "contractAddr": "0xa09cd92794fce9cfc957b82784ad11b0c3df19aab3e436a725014ea89dd15841",
        "method": 'getAllContractType',
        "decoder": "string[]"
    };

    const data = await aion.call(input);
    const obj = Object.assign({},data);
    return obj;
};

console.log("here ===> ",getAllContractType());