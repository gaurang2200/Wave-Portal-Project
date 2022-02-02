const main = async() => {
    const [owner] = await hre.ethers.getSigners();
    let accountBalance = await owner.getBalance();

    console.log("Deploying contracts by ", owner.address);
    console.log("Account Balance: %s ETH", (accountBalance / 1e18).toString());

    const Token = await hre.ethers.getContractFactory("WavePortal");
    const portal = await Token.deploy({
        value: hre.ethers.utils.parseEther("1")
    });
    await portal.deployed();

    console.log("WavePortal address: ", portal.address);
}

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}

runMain();