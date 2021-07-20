const SHA256 = require('crypto-js/sha256');

class Blockchain {
  constructor() {
    //buat objek nampung blockchain
    this.chain = [];
    //untuk menyimpan transaction sekarang
    this.current_transactions = [];
  }

  addNewBlock(prevHash) {
    let block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transaction: this.current_transactions,
      prevHash: prevHash,
    };
    this.hash = SHA256(block);
    // push ke dalam chain
    this.chain.push(block);
    this.current_transactions = [];
    return block;
  }

  addNewTransaction(sender, recipient, amount) {
    this.current_transactions.push({ sender, recipient, amount });
  }

  latestBlock() {
    return this.chain.slice(-1)[0];
  }

  isEmpty() {
    return this.chain.length == 0;
  }
}

module.exports = Blockchain;
