const PushAPI = require("@pushprotocol/restapi");
const ethers = require("ethers");

const PK = "6c6b9bed10e762e7cb50e80e34a21a7b152d89c82b2a912af6e05e8d6330bba9"; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async (address, amount) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `Payment Completed`,
        body: `Payment Completed ✔️ Amount: ${amount}`,
      },
      payload: {
        title: `Payment Status-`,
        body: `Payment Completed ✔️ Amount: ${amount}`,
        cta: "",
        img: "",
      },
      recipients: `eip155:5:${address}`, // recipient address
      channel: "eip155:5:0x24500B204296fBDc1C9935fd6732D7F22CeFa334", // your channel address
      env: "staging",
    });

    // apiResponse?.status === 204, if sent successfully!
    console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
};

module.exports = sendNotification;
