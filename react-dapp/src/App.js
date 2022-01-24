import { createRef, useState } from "react";
import { ethers } from "ethers";

// import contracts
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";

// Update with the contract address logged out to the CLI when it was deployed
const greeterAddress = "<greeter contract address>";
const tokenAddress = "<token contract address>";

function App() {
  // store greeting in local state
  const [greeting, setGreeting] = useState("");
  const [greetingValue, setGreetingValue] = useState("");
  const [err, setErr] = useState(false);

  const balanceRef = createRef();
  const messageRef = createRef();
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );

      try {
        const data = await contract.greet();
        setGreetingValue(data);
      } catch (err) {
        setErr(err);
      }
    }
  }

  // call the smart contract, send an update
  async function setNewGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
      setGreetingValue("");
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
      balanceRef.current.value = balance.toString();
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
      messageRef.current.value = `${amount} Coins successfully sent to ${userAccount}`;
      setAmount("");
      setUserAccount("");
    }
  }

  return (
    <>
      <div id="container">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <br />
        Greeting: {greetingValue}
        <br />
        <input
          onChange={(e) => setGreeting(e.target.value)}
          placeholder="Set greeting"
          value={greeting}
        />
        <button onClick={setNewGreeting}>Set Greeting</button>
        {err && <div>{err.message}</div>}
      </div>

      <div id="container">
        <button onClick={getBalance}>Get Balance</button>
        <input ref={balanceRef} disabled />
        <br />
        <button onClick={sendCoins}>Send Coins</button>
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Account ID"
          value={userAccount}
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          value={amount}
        />
        <br />
        <span ref={messageRef} disabled />
      </div>
    </>
  );
}

export default App;
