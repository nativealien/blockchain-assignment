import { it, describe, expect, beforeEach } from 'vitest';
import Blockchain from '../models/Blockchain.mjs';
import Block from '../models/Block.mjs';
import { GENESIS_DATA } from '../config/settings.mjs';

describe('Blockchain class', () => {
    let blockchain, blockchain2, originalChain;
    beforeEach( () => {
        blockchain = new Blockchain()
        blockchain2 = new Blockchain()
        originalChain = blockchain.chain;
    })

    describe('Chain property', () =>  {

        it('should have a chain, array, propertiy', () => {
            expect(blockchain).toHaveProperty('chain');
        })
        it('should have a genesis block at first index', () => {
            expect(blockchain.chain.at(0)).toEqual(GENESIS_DATA)
        })
        it('should be able to add new blocks', () => {
            const dummy = 'dummy data'
            blockchain.addBlock(dummy)
            expect(blockchain.chain.at(-1).data).toEqual(dummy)
        })
    })

    describe('Chain validation', () => {

        describe('When the chain deos not have correct genesis block', () => {
            it('should return false', () => {
                blockchain.chain[0] = 'False genesis'
                expect(Blockchain.validateChain(blockchain.chain)).toBe(false)
            })
            describe('When the chain start with genesis block, and multiple blocks', () => {
                beforeEach( () => {
                    blockchain.addBlock({ data: 'Ibanez'})
                    blockchain.addBlock({ data: 'Fender'})
                    blockchain.addBlock({ data: 'Gibson'})
                })
                describe('and one of the blocks previousHash has been manipulated', () => {
                    it('should return false', () => {
                        blockchain.chain[1].previousHash = 'faulty-hash'
                        expect(Blockchain.validateChain(blockchain.chain)).toBe(false)
                    })
                })
        
                describe('and the chain has a block with invalid data', () => {
                    it('should return false', () => {
                        blockchain.chain[2].data = 'faulty-data'
                        expect(Blockchain.validateChain(blockchain.chain)).toBe(false)
                    })
                })
        
                describe('and the chain is valid', () => {
                    it('should return true', () => {
                        expect(Blockchain.validateChain(blockchain.chain)).toBe(true)
                    })
                })
            })
    
        })

        describe('Replace chain', () => {
            describe('when the new chain is shorter', () => {
              it('should not replace the chain', () => {
                blockchain2.chain[0] = { info: 'chain' };
                blockchain.replaceChain(blockchain2.chain);
        
                expect(blockchain.chain).toEqual(originalChain);
              });
            });
        
            describe('when the new chain is longer', () => {
              beforeEach(() => {
                blockchain2.addBlock({ data: 'Volvo' });
                blockchain2.addBlock({ data: 'Saab' });
                blockchain2.addBlock({ data: 'Kia' });
              });
        
              describe('and the chain is invalid', () => {
                it('should not replace the chain', () => {
                  blockchain2.chain[1].currentHash = 'dummy-hash';
                  blockchain.replaceChain(blockchain2.chain);
        
                  expect(blockchain.chain).toEqual(originalChain);
                });
              });
        
              describe('and the chain is valid', () => {
                it('should replace the chain', () => {
                  blockchain.replaceChain(blockchain2.chain);
                  expect(blockchain.chain).toBe(blockchain2.chain);
                });
              });
            });
          });

    })
        
    
})