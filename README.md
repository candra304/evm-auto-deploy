# evm-auto-deploy

> **SAT SET - [by Chandra]**

Script ini dibuat untuk melakukan **auto-deploy smart contract ERC20** ke jaringan EVM secara massal menggunakan banyak wallet (private key). Cocok untuk project airdrop, token testing, ataupun deployment eksperimen.

---

## Fitur
- Auto deploy ERC20 dari multi akun (private key)
- Support banyak jaringan (custom RPC)
- Bisa set jumlah deploy per wallet
- Modular dan mudah dikembangkan
- Banner dan log hasil deploy yang rapi dan informatif

---

## Cara Pakai

### 1. Clone Repo
```bash
git clone https://github.com/candra304/evm-auto-deploy.git
cd evm-auto-deploy
```

### 2. Install Dependency
```bash
npm install
```

### 3. Buat File yang Dibutuhkan

**keys.txt**
```txt
PRIVATE_KEY_1
PRIVATE_KEY_2
...dst
```

### 4. Struktur Folder
```
EVMautodeploy/
├── keys.txt
├── .env
├── index.js
├── package.json
├── src/
│   ├── utils.js
│   ├── contractCode.js
│   └── network.js
```


Script akan menanyakan:
- Jaringan yang dipilih
- Nama Token, Simbol, dan Supply
- Berapa kali deploy per wallet

---

## Custom Jaringan (RPC)
Edit file 
```
nano src/network.js
```
isi sesui format
```
[
  {
    "name": "0G-Galileo-Testnet",
    "rpcUrl": "https://evmrpc-testnet.0g.ai/",
    "explorer": "https://chainscan-galileo.0g.ai/"
  },
  {
    "name": "Seismic Devnet",
    "rpcUrl": "https://node-2.seismicdev.net/rpc",
    "explorer": "https://explorer-2.seismicdev.net"
  }
]

```
---

## Credit
Dibuat oleh: **Chandra (candra304)**

Script ini bebas dikembangkan ulang, silakan fork atau kontribusi!

## Menjalankan Script
```bash
node index.js
```

## file txt 
```
nano keys.txt
```

