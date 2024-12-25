require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config() //为了可以使用.env里定义的变量

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    sepolia:{
      url:SEPOLIA_URL,
      accounts:[PRIVATE_KEY],
      chainId:11155111
    }
  },
  etherscan: {
    // Your API key for Etherscan,，允许你在 Hardhat 中自动验证和上传智能合约源代码到 Etherscan。
    //使用 Etherscan 的验证功能可以提高合约的透明度，允许其他开发者和用户查看和审核你的合约代码，增加可信度。
    apiKey: {
      sepolia:API_KEY
    }
  },
};
