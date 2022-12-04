const axios = require("axios");
const API_KEY = "rzp_test_AjYz6szGRfG1xJ";
const API_SECRET = "epexOHp3oGY3KuIYRuwVuyqp";
const ACCOUNT = "2323230011764585";

const createContact = async (name) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://api.razorpay.com/v1/contacts",
        {
          name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: API_KEY,
            password: API_SECRET,
          },
        }
      )
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const createFundAccount = async (cont_id, vpa) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://api.razorpay.com/v1/fund_accounts",
        {
          account_type: "vpa",
          contact_id: cont_id,
          vpa: {
            address: vpa,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: API_KEY,
            password: API_SECRET,
          },
        }
      )
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const createTransfer = async (fund_id, amount) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://api.razorpay.com/v1/payouts",
        {
          account_number: ACCOUNT,
          fund_account_id: fund_id,
          amount: amount,
          currency: "INR",
          mode: "UPI",
          purpose: "payout",
          queue_if_low_balance: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: API_KEY,
            password: API_SECRET,
          },
        }
      )
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const remmitPayout = async (name, vpa, amount) => {
  const contact = await createContact(name);
  const fundAccount = await createFundAccount(contact.id, vpa);
  const transfer = await createTransfer(fundAccount.id, amount);
  return transfer;
};

module.exports = remmitPayout;
