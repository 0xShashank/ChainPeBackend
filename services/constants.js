const { ethers } = require("ethers");

const supportedChains = {
  BSC: {
    private_https_url: "https://bsc-dataseed1.binance.org",
    private_wss_url: "",
    contract: "0x58eb410EdcAd08467B1D07427c126F542614B575",
    buyCurrency: {
      BNB: ethers.constants.AddressZero,
      BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    },
    wrappedCoin: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  POLYGON: {
    private_https_url:
      "https://polygon-mainnet.nodereal.io/v1/03a0b2cf53304a3081080ae6aee7de32",
    private_wss_url:
      "wss://polygon-mainnet.nodereal.io/ws/v1/03a0b2cf53304a3081080ae6aee7de32",
    contract: "0x0722780aD3c122A639675dFBd9Bad77F400B2B7A",
    routers: {
      Quickswap: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
    },
    buyCurrency: {
      MATIC: ethers.constants.AddressZero,
    },
    wrappedCoin: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
  },
  "BSC-TEST": {
    private_https_url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    private_wss_url:
      "wss://ws-nd-662-649-070.p2pify.com/b534ae32576b4d520af2158db9443216",
    contract: "0xc0E1565b83d175b647DfFB81902554224375C4b8",
    buyCurrency: {
      BNB: ethers.constants.AddressZero,
      BUSD: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
      USDT: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    },
    wrappedCoin: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
  },
  "FUSE_SPARK": {
    private_https_url: "https://rpc.fusespark.io/",
    private_wss_url:
      "wss://rpc.fusespark.io/",
    contract: "0x5CA6ba1Ec356Dd2832eBDa811Eae46c3DFB78611",
    buyCurrency: {
      BNB: ethers.constants.AddressZero,
      BUSD: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
      USDT: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    },
    wrappedCoin: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
  },
};

const getProvider = (chain) => {
  const provider = new ethers.providers.JsonRpcProvider(
    supportedChains[chain].private_https_url
  );
  return provider;
};

module.exports = { supportedChains, getProvider };
