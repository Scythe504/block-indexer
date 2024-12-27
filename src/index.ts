import { JsonRpcProvider, id } from "ethers";

const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/eKm412KeNrgkmWWylxZV8EXhFyDZw_Sx");

async function pollBlock(blockNumber: number) {
    try {
        const logs = await provider.getLogs({
            address: "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT contract
            fromBlock: blockNumber,
            toBlock: blockNumber,
            topics: [id("Transfer(address,address,uint256)")],
        });

        if (logs.length > 0) {
            console.log(`Logs for block ${blockNumber}:`, logs);
        } else {
            console.log(`No logs for block ${blockNumber}.`);
        }
    } catch (error) {
        console.error(`Error fetching logs for block ${blockNumber}:`, error);
    }
}

(async function main() {
    let currentBlock = await provider.getBlockNumber(); // Start from the latest block
    console.log(`Starting block: ${currentBlock}`);

    while (true) {
        await pollBlock(currentBlock);

        currentBlock++; // Increment to the next block
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay to avoid rate limiting
    }
})();
