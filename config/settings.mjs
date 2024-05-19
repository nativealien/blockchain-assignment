

export const MINE_RATE = 5000
export const DIFFICULTY = 4

export const GENESIS_DATA = {
    id: 1,
    date: new Date(),
    preHash: '0',
    hash: '0',
    nonce: 0,
    diff: DIFFICULTY,
    data: { message: 'Genisis block.' }
}