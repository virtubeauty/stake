import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import { stakingContractAbi } from './src/abis/staking';
import fs from 'fs';
import dotenv from 'dotenv';
import { erc20Abi } from 'viem';

const network = process.env.NETWORK || 'testnet';
const env = fs.readFileSync(`.env.${network}`);

const config = dotenv.parse(env);

export default defineConfig({
  out: 'src/wagmi/hooks.ts',
  contracts: [
    {
      name: 'StakingContract',
      abi: stakingContractAbi,
      address: config.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as `0x${string}`,
    },
    {
      name: 'VBEA',
      abi: erc20Abi,
      address: config.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`,
    },
  ],
  plugins: [react()],
});
