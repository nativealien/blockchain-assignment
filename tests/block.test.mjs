import { it, describe, expect, beforeEach } from 'vitest'
import hexToBinary from 'hex-to-binary';
import { hashString } from '../utilities/crypto-utilities.mjs';

import { GENESIS_DATA, MINE_RATE } from '../config/settings.mjs';
import Block from '../models/Block.mjs';

describe('Block class', () => {
    const id = 0;
    const date = Date.now();
    const preHash = '0';
    const hash = '0';
    const nonce = 1;
    const diff = 2;
    const data = { amount: 4, sender: 'Oskar', recipe: 'Kalle' }

    const block = new Block( { id, date, preHash, hash, nonce, diff, data } )

    describe('Properties', () => {
        it('should have properites: ', () => {
            expect(block).toHaveProperty('id');
            expect(block).toHaveProperty('date');
            expect(block).toHaveProperty('preHash');
            expect(block).toHaveProperty('hash');
            expect(block).toHaveProperty('nonce');
            expect(block).toHaveProperty('diff');
            expect(block).toHaveProperty('data');
        })
        it('should have values for all properties', () => {
            expect(block.id).toEqual(id);
            expect(block.date).toEqual(date);
            expect(block.preHash).toEqual(preHash);
            expect(block.hash).toEqual(hash);
            expect(block.nonce).toEqual(nonce);
            expect(block.diff).toEqual(diff);
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
            expect(minedBlock.date).not.toBeUndefined()
        });
        it('should set the previousHash to match the lastBlock hash', () => {
            expect(minedBlock.preHash).toEqual(lastBlock.hash)
        })
        it('should set the data', () => {
            expect(minedBlock.preHash).toEqual(lastBlock.hash)
        })
        it('should produce a hash, in line with difficulty', () => {
            expect(hexToBinary(minedBlock.hash)
                .substring(0, minedBlock.diff))
                .toEqual('0'.repeat(minedBlock.diff))
        })
        it('should produce a hash based on rightt inputs', () => {
            expect(minedBlock.hash).toEqual(
                hashString(
                    minedBlock.date,
                    minedBlock.preHash,
                    minedBlock.nonce,
                    minedBlock.diff,
                    data)
            )
        })
    })

    describe('adjustToDifficulty', () => {
        it('should raise difficulty when blocks mines fast', () => {
            expect(Block.adjustDifficultyLevel({
                    block: block, 
                    date: block.date + MINE_RATE - 100,
                })).toEqual( block.diff +1 )
        })
        it('should lower difficulty when blocks mines slow', () => {
            expect(Block.adjustDifficultyLevel({
                block: block,
                date: block.date + MINE_RATE + 100,
            })).toEqual(block.diff -1)
        })
    })
})