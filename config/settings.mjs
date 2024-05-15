

export const MINE_RATE = 2000
export const DIFFICULTY = 3

export const GENESIS_DATA = {
    index: 1,
    timestamp: Date.now(),
    previousHash: '0',
    currentHash: '0',
    nonce: 0,
    difficulty: DIFFICULTY,
    data: { message: 'Genisis block.' }
}