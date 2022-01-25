const PandaToken = artifacts.require("PandaToken");
const FarmToken = artifacts.require("FarmToken");

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts();
  const pandaToken = await PandaToken.deployed();
  const farmToken = await FarmToken.deployed();

  // Verify accounts[0] and farmToken balance of PandaToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await pandaToken.balanceOf(accounts[0]);
  balanceMyTokenBeforeFarmToken = await pandaToken.balanceOf(farmToken.address);
  console.log("*** My Token ***");
  console.log(
    "Balance PandaToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  );
  console.log(
    "Balance PandaToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  );

  console.log("*** Farm Token ***");
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0]);
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(
    farmToken.address
  );
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  );
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  );

  // Call Deposit function from FarmToken
  console.log("Call Withdraw Function");
  await farmToken.withdraw(web3.utils.toWei("100", "ether"));

  console.log("*** My Token ***");
  balanceMyTokenAfterAccounts0 = await pandaToken.balanceOf(accounts[0]);
  balanceMyTokenAfterFarmToken = await pandaToken.balanceOf(farmToken.address);
  console.log(
    "Balance PandaToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  );
  console.log(
    "Balance PandaToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  );

  console.log("*** Farm Token ***");
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0]);
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address);
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  );
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  );

  // End function
  callback();
};
