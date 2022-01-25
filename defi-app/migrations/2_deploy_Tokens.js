const PandaToken = artifacts.require("./PandaToken.sol");
const FarmToken = artifacts.require("./FarmToken.sol");

module.exports = async function (deployer, network, accounts) {
  // deploy the Panda Token
  await deployer.deploy(PandaToken);
  const pandaToken = await PandaToken.deployed();

  // Deploy Farm Token
  await deployer.deploy(FarmToken, pandaToken.address);
  const farmToken = await FarmToken.deployed();
};
