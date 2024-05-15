import { it, describe, expect, beforeEach } from 'vitest'
import hexToBinary from 'hex-to-binary';
import { createHash } from '../utilities/crypto-utils.mjs';

import { GENESIS_DATA, MINE_RATE } from '../config/settings.mjs';
import Block from '../models/Block.mjs';

describe('Block class', () => {
    const index = 0;
    const timestamp = Date.now();
    const previousHash = '0';
    const currentHash = '0';
    const nonce = 1;
    const difficulty = 1;
    const data = { amount: 4, sender: 'Oskar', recipe: 'Kalle' }

    const block = new Block( { index, timestamp, previousHash, currentHash, nonce, difficulty, data } )

    describe('Properties', () => {
        it('should have properites: ', () => {
            expect(block).toHaveProperty('index');
            expect(block).toHaveProperty('timestamp');
            expect(block).toHaveProperty('previousHash');
            expect(block).toHaveProperty('currentHash');
            expect(block).toHaveProperty('nonce');
            expect(block).toHaveProperty('difficulty');
            expect(block).toHaveProperty('data');
        })
        it('should have values for all properties', () => {
            expect(block.index).toEqual(index);
            expect(block.timestamp).toEqual(timestamp);
            expect(block.previousHash).toEqual(previousHash);
            expect(block.currentHash).toEqual(currentHash);
            expect(block.nonce).toEqual(nonce);
            expect(block.difficulty).toEqual(difficulty);
            expect(block.data).toEqual(data);
        })
    })

    describe('Genesis block', () => {
        const genesis = Block.genesis
        it('should be of instance Block class', () => {
            expect(genesis).toBeInstanceOf(Block)
        })
        it('should return the genesis data', () => {
            expect(GENESIS_DATA).toEqual(GENESIS_DATA); // ska vara genesis eg..
        });
    })

    describe('mineBlock() function', () => {
        let lastBlock, data, minedBlock;
        beforeEach( () => {
            lastBlock = Block.genesis,
            data = { message: 'hej'},
            minedBlock = Block.mineBlock({ lastBlock, data })
        })
        it('should return instance of Block class', () => {
            expect(minedBlock).toBeInstanceOf(Block)
        })
        it('should have timestamp', () => {
            expect(minedBlock.timestamp).not.toBeUndefined()
        });
        it('should set the previousHash to match the lastBlock currentHash', () => {
            expect(minedBlock.previousHash).toEqual(lastBlock.currentHash)
        })
        it('should set the data', () => {
            expect(minedBlock.previousHash).toEqual(lastBlock.currentHash)
        })
        it('should produce a hash, in line with difficulty', () => {
            expect(hexToBinary(minedBlock.currentHash)
                .substring(0, minedBlock.difficulty))
                .toEqual('0'.repeat(minedBlock.difficulty))
        })
        it('should produce a hash based on rightt inputs', () => {
            expect(minedBlock.currentHash).toEqual(
                createHash(
                    minedBlock.timestamp,
                    minedBlock.previousHash,
                    minedBlock.nonce,
                    minedBlock.difficulty,
                    data)
            )
        })
    })

    describe('adjustToDifficulty', () => {
        it('should raise difficulty when blocks mines fast', () => {
            console.log(block);
            expect(Block.adjustDifficultyLevel({
                    block: block, 
                    timestamp: block.timestamp + MINE_RATE - 100,
                })).toEqual( block.difficulty +1 )
        })
        it('should lower difficulty when blocks mines slow', () => {
            expect(Block.adjustDifficultyLevel({
                block: block,
                timestamp: block.timestamp + MINE_RATE + 100,
            })).toEqual(block.difficulty -1)
        })
    })
})