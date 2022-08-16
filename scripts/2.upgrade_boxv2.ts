import { ethers } from "hardhat";
import { upgrades } from "hardhat";

const proxyAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
// const proxyAddress = '0x1CD0c84b7C7C1350d203677Bb22037A92Cc7e268'

async function main() {
  console.log(proxyAddress," original Box(proxy) address")
  const BoxV2 = await ethers.getContractFactory("BoxV2")
  console.log("upgrade to BoxV2...")
  const boxV2 = await upgrades.upgradeProxy(proxyAddress, BoxV2)
  console.log(boxV2.address," BoxV2 address(should be the same)")

  console.log(await upgrades.erc1967.getImplementationAddress(boxV2.address)," getImplementationAddress")
  console.log(await upgrades.erc1967.getAdminAddress(boxV2.address), " getAdminAddress")    
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

/**
 * 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0  original Box(proxy) address
upgrade to BoxV2...
0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0  BoxV2 address(should be the same)
0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9  getImplementationAddress
0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512  getAdminAddress
*/