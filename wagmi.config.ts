import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import { stakingContractAbi } from './src/abis/staking';
import { erc20Abi } from 'viem';

export default defineConfig({
  out: 'src/wagmi/hooks.ts',
  contracts: [
    {
      name: 'StakingContract',
      abi: stakingContractAbi,
      address: process.env
        .NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as `0x${string}`,
    },
    {
      name: 'VBEA',
      abi: erc20Abi,
      address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`,
    },
  ],
  plugins: [react()],
});
