const web3 = require("./index");
const log4js = require('log4js');
const logger = log4js.getLogger('AIONWEB3_TEST');
logger.level = 'debug';

const httpProvider = "https://aion.api.nodesmith.io/v1/mastery/jsonrpc?apiKey=ae8d2a52c4994dd7bbbc06ac62b398d2";
const contractAddr = "0xa0e373c45851f4f632ec05ba9f9daac72094152c501cec4216929cab7de7adea";
const privateKey =   "02b37fcefa6f0b7a9c06c20d9779a0e2e839364a2eabac6fc631c4501fc4baa3bff00b1fb98db1d5cef32ea0f07e263c096d37aaad4bd54b3784464bdedae229";

test('Fetch Data from a method with NoArgs', async() => {
    logger.debug("\n\n ====================== TEST ******  FETCH ALL CONTRACTS  =========================\n\n");
    let input = {
        "httpProvider": httpProvider,
        "contractAddr": contractAddr,
        "privateKey": privateKey,
        "method": 'getAllContractType',
        "decoder": "string[]"
    };
    let data = web3.call(input);
  });

  test('Fetch Data from a method with Args', async() => {
    logger.debug("\n\n ====================== TEST ******   FETCH ALL POLLS FOR CONTRACT  =========================\n\n");

    let contractID = 1;

    const types = ["int"];
    const args = [contractID];

    let input = {
        "httpProvider": httpProvider,
        "contractAddr": contractAddr,
        "privateKey": privateKey,
        "method": 'getAllPoll',
        "input_Type": types,
        "input_Args": args,
        "decoder":'string[]'
    };
    let data = await web3.callWithArgs(input);
    // expect(.length).toBeGreaterThanOrEqual(0.0);
  });

  test('Add Data to a method', async() => {
    logger.debug("\n\n ====================== TEST ******   Add Contract Type  =========================\n\n");
    let contractAddress = "0xa01e910547b95bf87d35426f52ab4119b7088352c1a698ca5a48b3a8202755e5";
    let type = "typeA";
    let address = "0xa01e910547b95bf87d35426f52ab4119b7088352c1a698ca5a48b3a8202755e5";

    logger.debug("ContractAddress: %s Type: %s Address: %s", contractAddress, type, address);
    const types = ["Address","String","Address"];
    const args = [contractAddress, type, address];

    let input = {
        "httpProvider": httpProvider,
        "contractAddr": contractAddr,
        "privateKey": privateKey,
        "input_Type": types,
        "input_Args": args,
        "method": 'addContractTypes'
    };
    // let data = await web3.signedTransaction(input);
    await expect(web3.signedTransaction(input)).resolves.toThrow('error');
  });
