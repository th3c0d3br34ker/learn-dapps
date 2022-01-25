const PandaToken = artifacts.require("PandaToken");
const FarmToken = artifacts.require("FarmToken");

module.exports = async function (callback) {
  pandaToken = await PandaToken.deployed();
  farmToken = await FarmToken.deployed();
  balance = await pandaToken.balanceOf(farmToken.address);
  console.log(web3.utils.fromWei(balance.toString()));
  callback();
};
