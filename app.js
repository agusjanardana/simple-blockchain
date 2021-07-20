const { SHA256 } = require('crypto-js');
const express = require('express');
const Blockchain = require('./Controllers/blockChain.controller');

// const { sha256 } = require('js-sha256');
let BlockChain = require('./Controllers/blockChain.controller');

let blockChain = new BlockChain();

// seharusnya nonce adalah angka yg digunakan sekali, tetapi sementara pakai ini dulu.
// dari kode validasi API waktu soal no 3 recruitment.
let NONCE = 15;

let validProof = (proof) => {
  let guessHash = SHA256(proof.toString()).toString();
  let fixedHash = SHA256(NONCE.toString()).toString();
  console.log('Hashing : ', guessHash);
  return guessHash == fixedHash;
};

let proofOfWork = () => {
  var proof = 0;

  while (true) {
    if (!validProof(proof)) {
      proof++;
    } else {
      break;
    }
  }
  return proof;
};

//kebutuhan check.
// console.log('hasil PoW', proofOfWork());
// console.log(proofOfWork() == NONCE);

// Konsensus berfungsi untuk validasi, dimana, ketika kita ingin menambah block
// tentu tidak bisa asal nambah, kita harus melakukan beberapa validasi.
// validasi yang saya buat disini adalah validasi dengan NONCE , walaupun nonce itu number only use once, tetapi sementara pakai penamaan itu.

if (proofOfWork() == NONCE) {
  blockChain.addNewTransaction('agus', 'alex', '55555');
  let prevHash = blockChain.latestBlock()
    ? SHA256(blockChain.latestBlock())
    : 'Genesis PrevHash';
  blockChain.addNewBlock(prevHash);
}

console.log('Chain : ', blockChain.chain);
