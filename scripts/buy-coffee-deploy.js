const hre = require("hardhat");

async function main(){
        //get the contract to deploy
        const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
        const buyMeACoffee = await BuyMeACoffee.deploy();
        await buyMeACoffee.waitForDeployment();
        console.log(
            `contract has been deployed successfully, contract address is ${buyMeACoffee.target}`
        );
    
        console.log(`owner is :`,await buyMeACoffee.owner());
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });