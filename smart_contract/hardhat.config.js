require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "", // fill your http api key here
      accounts: [
        "", // fill your private account key here
      ],
    },
  },
};
