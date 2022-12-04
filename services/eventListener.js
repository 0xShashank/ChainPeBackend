const { ethers } = require("ethers");
const { supportedChains, getProvider } = require("./constants");
const Contract = require("../contract/artifacts/contracts/Main.sol/ChainPe.json");

const remmitPayout = require("./razorpay");

const consumer = {
  paymentCompleted: remmitPayout,
};

const registerEventListner = (chain) => {
  const provider = getProvider(chain);
  const eventEmitterContract = new ethers.Contract(
    supportedChains[chain].contract,
    Contract.abi,
    provider
  );
  console.log(chain, "registered");
  eventEmitterContract.on("PaymentCompleted", (name, vpa, amount, rate) => {
    console.log("PaymentCompleted", name, vpa, amount, rate);
    consumer.paymentCompleted(
      name,
      vpa,
      ethers.utils.formatUnits(amount) * 100
    );
  });
};

module.exports = registerEventListner;
