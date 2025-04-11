require('dotenv').config();
require('colors');
const fs = require('fs');
const ethers = require('ethers');
const readlineSync = require('readline-sync');
const chalk = require('chalk'); // untuk banner warna
const {
  loadNetworkConfig,
  getUserInput,
  delay,
} = require('./src/utils');
const { generateContractCode } = require('./src/contractCode');

// Banner
function showBanner() {
  console.clear();
  console.log(chalk.magentaBright(`
========================================
  █████╗ ██╗   ██╗████████╗ ██████╗ 
 ██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗
 ███████║██║   ██║   ██║   ██║   ██║
 ██╔══██║██║   ██║   ██║   ██║   ██║
 ██║  ██║╚██████╔╝   ██║   ╚██████╔╝
 ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ 
SAT SET 
                           [by Chandra]
========================================
`));
}

async function deployWithWallet(privateKey, network, abi, bytecode, index, count) {
  try {
    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);

    for (let i = 0; i < count; i++) {
      console.log(`\n🤡 Akun ke-${index + 1} (${wallet.address}) | Deploy ke-${i + 1} ...`.yellow);
      const contract = await factory.deploy();
      await contract.waitForDeployment();
      console.log(`✅ Akun ke-${index + 1} | Deploy ke-${i + 1} sukses!`.green);
      console.log(`Contract: ${contract.target}`.cyan);
      console.log(`Explorer: ${network.explorer}/address/${contract.target}`.blue);
      await delay(2000); // tunggu 2 detik antar deploy
    }

    return true;
  } catch (error) {
    console.error(`❌ Error akun ke-${index + 1}: ${error.message}`.red);
    return false;
  }
}

async function main() {
  showBanner();

  const networkType = process.argv[2] || 'testnet';
  const networks = loadNetworkConfig(networkType);

  console.log(`Available networks:`.yellow);
  networks.forEach((network, index) => {
    console.log(`${index + 1}. ${network.name}`);
  });

  const networkIndex = parseInt(readlineSync.question('\nPilih jaringan (nomor): '.cyan)) - 1;
  const selectedNetwork = networks[networkIndex];

  if (!selectedNetwork) {
    console.error('❌ Jaringan tidak valid.'.red);
    process.exit(1);
  }

  const { name, symbol, supply } = getUserInput();
  const deployCount = parseInt(readlineSync.question('\nBerapa kali deploy per wallet?: '.cyan));

  if (!deployCount || deployCount < 1) {
    console.error('❌ Jumlah deploy tidak valid.'.red);
    process.exit(1);
  }

  const keyFile = 'keys.txt';
  if (!fs.existsSync(keyFile)) {
    console.error(`❌ File ${keyFile} tidak ditemukan.`.red);
    process.exit(1);
  }

  const privateKeys = fs.readFileSync(keyFile, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  if (privateKeys.length === 0) {
    console.error('❌ Tidak ada private key di file.'.red);
    process.exit(1);
  }

  const { bytecode, abi } = generateContractCode(name, symbol, supply);

  console.log(`\nJumlah wallet: ${privateKeys.length}`.cyan);
  console.log(`Deploy per wallet: ${deployCount}\n`.cyan);

  let successCount = 0;

  for (let i = 0; i < privateKeys.length; i++) {
    const result = await deployWithWallet(privateKeys[i], selectedNetwork, abi, bytecode, i, deployCount);
    if (result) successCount++;
  }

  console.log(`\n✅ Selesai! Total akun sukses deploy: ${successCount}/${privateKeys.length}`.green.bold);
}

main().catch((err) => {
  console.error(`Fatal Error: ${err.message}`.red);
});

