const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const congoContractFactory = await hre.ethers.getContractFactory("WavePortal");

    // Deploys the contract to the blockchain with 10 ETH
    const congoContract = await congoContractFactory.deploy({
        value: hre.ethers.utils.parseEther("10")
    });

    // Waits for the contract to be deployed
    await congoContract.deployed();
    console.log("Contract deployed to: ", congoContract.address);
    
    // Get Contract balance
    let contractBalance = await hre.ethers.provider.getBalance(congoContract.address);
    console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));

    let congoTxn = await congoContract.connect(randomPerson).congratulate("All the best!");
    await congoTxn.wait();
    
    contractBalance = await hre.ethers.provider.getBalance(congoContract.address);
    console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));



    congoTxn = await congoContract.congratulate("Best of luck!");
    await congoTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(congoContract.address);
    console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log("In Catch", error);
        process.exit(1);
    }
}

runMain();