import { createClient } from 'redis';

const client = createClient({
    password: '1A7vV4Vf3vPoxdtnkc6DuIiL4wgh66By',
    socket: {
        host: 'redis-16317.c250.eu-central-1-1.ec2.redns.redis-cloud.com',
        port: 16317
    }
});

client.connect();

async function cacheBlockData(blockId, blockData) {
    await client.set(`block:${blockId}`, JSON.stringify(blockData), {
        EX: 3600 // Set an expiry time of 1 hour
    });
}

async function getBlockData(blockId) {
    const blockData = await client.get(`block:${blockId}`);
    return blockData ? JSON.parse(blockData) : null;
}