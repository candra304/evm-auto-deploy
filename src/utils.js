function loadNetworkConfig(type) {
  if (type === 'testnet') {
    return [
      {
        name: 'Seismic Devnet',
        rpcUrl: 'https://node-2.seismicdev.net/rpc',
        explorer: 'https://explorer-2.seismicdev.net'
      },
      {
        name: '0G-Galileo-Testnet',
        rpcUrl: 'https://evmrpc-testnet.0g.ai/',
        explorer: 'https://chainscan-galileo.0g.ai/'
      }
    ];
  } else if (type === 'mainnet') {
    return [
      {
        name: 'Ethereum Mainnet',
        rpcUrl: 'https://mainnet.infura.io/v3/YOUR_API_KEY',
        explorer: 'https://etherscan.io'
      },
    ];
  } else {
    return [];
  }
}

function getUserInput() {
  const readlineSync = require('readline-sync');
  const name = readlineSync.question('Token name: ');
  const symbol = readlineSync.question('Token symbol: ');
  const supply = readlineSync.question('Total supply: ');
  return { name, symbol, supply };
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  loadNetworkConfig,
  getUserInput,
  delay,
};
