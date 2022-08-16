import {ethers,upgrades} from "hardhat"

async function main(){
    const Box = await ethers.getContractFactory("Box")
    console.log("deploying box....")
    const box = await upgrades.deployProxy(Box,[42],{initializer:'store'})

    console.log(box.address," box(proxy) address")
    console.log(await upgrades.erc1967.getImplementationAddress(box.address),"getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(box.address),"getAdminAddress")
}

main().catch(err=>{
    process.exitCode = 1;
})

/**
 * 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9  box(proxy) address
0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 getImplementationAddress
0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9 getAdminAddress
*/