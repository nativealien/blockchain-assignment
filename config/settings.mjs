

export const MINE_RATE = 2000
export const DIFFICULTY = 3

export const GENESIS_DATA = {
    id: 1,
    date: Date.now(),
    preHash: '0',
    hash: '0',
    nonce: 0,
    diff: DIFFICULTY,
    data: { message: 'Genisis block.' }
}