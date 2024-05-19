import crypto from 'crypto'

export const generateHash = (string) => {
    return crypto.createHash('sha256').update(string).digest('hex');
}