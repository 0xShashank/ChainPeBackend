require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const helmet = require("helmet");

const  registerEventListner  = require("./services/eventListener");

var app = express();

if (process.env.NODE_ENV === "development") {
  app.use(cors());
  // app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

if (process.env.MODULE == "api" || process.env.MODULE == "mono") {
  app.use(cors());

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
    })
  );
  app.disable("x-powered-by");
  app.use(helmet.noSniff());

  app.get("/api/health", (req, res) => {
    const data = {
      uptime: process.uptime(),
      message: "Ok",
      ts: Date.now(),
    };

    res.send(data);
  });
}
if (process.env.MODULE == "client" || process.env.MODULE == "mono") {
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
    })
  );
  app.disable("x-powered-by");
  app.use(helmet.noSniff());
  const connectSources = [
    "'self'",
    "https://*.pandasale.finance/",
    "wss://*.walletlink.org/rpc",
    "wss://*.bridge.walletconnect.org/",
    "https://registry.walletconnect.com/",
    "https://api.coingecko.com/",
    "https://evm-t3.cronos.org",
    "wss://ws-nd-662-649-070.p2pify.com",
    "wss://ws-nd-712-277-412.p2pify.com",
    "https://nd-662-649-070.p2pify.com",
    "https://nd-712-277-412.p2pify.com",
    "https://polygonapi.terminet.io",
    "https://*.getblock.io",
    "https://*.ethercluster.com",
    "https://*.dogechain.dog/",
    "https://*.shibchain.app",
    "https://*.binance.org:8545/",
    "https://*.kyberengineering.io",
    "https://*.binance.org",
    "https://*.alchemy.com",
    "wss://*.alchemy.com",
    "https://*.pinata.cloud",
    "https://*.mypinata.cloud",
    "https://nftstorage.link",
    "https://*.nft.storage",
    "https://*.ipfs.nftstorage.link",
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com",
    "https://youtube.com",
    "https://vimeo.com/",
    "https://noembed.com/",
    "https://*.imgur.com",
    "https://*.netlify.app",
    "https://*.dcscan.org",
    "https://*.web3.storage",
    "https://*.ipfs.w3s.link",
    "https://*.kcc.network",
    "https://*.ethereumpow.org",
    "https://*.nodereal.io",
    "wss://*.nodereal.io",
    "https://rpc.icecreamswap.com",
    "https://*.brisescan.com",
  ];
  const imgSrc = [
    "'self'",
    "https:",
    "data:",
    "blob:",
    "registry.walletconnect.com",
  ];
  const scriptSrc = [
    "'self'",
    "data:",
    "*.youtube.com",
    "https://vimeo.com/",
    "https://www.googletagmanager.com/",
  ];
  const frameSrc = ["youtube.com", "www.youtube.com/"];
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        connectSrc: connectSources,
        scriptSrc: scriptSrc,
        imgSrc: imgSrc,
        "frame-src": frameSrc,
      },
    })
  );

  app.get("*", (req, res, next) => {
    res.setHeader("Cache-Control", "public, max-age=500");
    next();
  });

  app.use(express.static(path.resolve(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}
registerEventListner("FUSE_SPARK");
registerEventListner("BSC-TEST");
// reloadFinalize();
module.exports = app;
