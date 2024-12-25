const hre = require("hardhat");

//returns the Ethereum balance of a given address.
async function getBalance(address){
    //hardhat-network provider. get balance from this network
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.formatEther(balanceBigInt);
}

async function printBalance(addresses) {
    let idx = 0;
    for(const address of addresses){
        console.log(`address ${idx} balance:`,await getBalance(address));
        idx++
    }
}

async function printMemos(memos) {
   for(const memo of memos){
    console.log(`at ${memo.timestamp} ${memo.name} ,${memo.from} said ${memo.message}`)
   } 
}


async function main(){
    //get example account 
    const [owner,tipper,tipper2,tipper3] = await hre.ethers.getSigners();

    console.log(`owner is :`,owner.address);

    //get the contract to deploy
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.waitForDeployment();
    console.log(
        `contract has been deployed successfully, contract address is ${buyMeACoffee.target}`
    );

    console.log(`owner is :`,await buyMeACoffee.owner());

    //check the balance before the coffee purchase
    const addresses = [owner.address,tipper.address,buyMeACoffee.target]
    console.log("== start ==");
    await printBalance(addresses);
    
    //by owner a coffee;
    const tip = {value:hre.ethers.parseEther("1")};

    //connect wallet to contract. call the contract function
    await buyMeACoffee.connect(tipper).buyCoffee("ly","hello",tip);
    await buyMeACoffee.connect(tipper2).buyCoffee("ly2","hello2",tip);
    await buyMeACoffee.connect(tipper3).buyCoffee("ly3","hello3",tip);

    console.log("== bought coffee ==");
    await printBalance(addresses);

    //withdraw funds
    await buyMeACoffee.connect(owner).withdrawTips();
    console.log("== withdraw tips ==");
    await printBalance(addresses);

    //read all memos left for the owner
    console.log("== memos ==");
    const memos = await buyMeACoffee.getMemos();
    printMemos(memos)
    
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
