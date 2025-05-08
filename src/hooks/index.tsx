import { formatUnits } from 'viem';
import {
  stakingContractAddress,
  useReadStakingContractGetStakeInfo,
  useReadStakingContractGetUserPoints,
  useReadStakingContractPeriod_180Days,
  useReadStakingContractPeriod_30Days,
  useReadStakingContractPeriod_360Days,
  useReadStakingContractPeriod_90Days,
  useReadVbeaAllowance,
  useReadVbeaBalanceOf,
  useReadVbeaSymbol,
  useWriteStakingContractStake,
  useWriteStakingContractUnstake,
  useWriteVbeaApprove,
} from '@/wagmi/hooks';
import { useCallback, useEffect } from 'react';
import {
  BaseError,
  useAccount,
  usePublicClient,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { notifications } from '@mantine/notifications';
import { Text, Title } from '@mantine/core';
import Link from 'next/link';

let baseScan = 'https://sepolia.basescan.org';
if (process.env.NEXT_PUBLIC_NETWORK === 'mainnet') {
  baseScan = 'https://basescan.org';
}

const baseScanUrl = (txHash: string) => `${baseScan}/tx/${txHash}`;

export function useStakePosition({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  const publicClient = usePublicClient();
  const {
    data: approveTxHash,
    writeContractAsync: approveToken,
    isPending: isApprovePending,
  } = useWriteVbeaApprove();
  const {
    data: stakeTxHash,
    writeContractAsync: stakeTokens,
    isPending: isStakePending,
  } = useWriteStakingContractStake();

  const { data: allowance } = useReadVbeaAllowance();
  const handleStake = async (amount: bigint, period: bigint) => {
    try {
      // Reset transaction hashes at the start of each stake action
      if (!allowance || allowance < amount) {
        await approveToken({
          args: [stakingContractAddress, amount],
        });
      }
      await stakeTokens({
        args: [amount, period],
      });
    } catch (error: unknown) {
      const _error = error as BaseError;
      notifications.show({
        title: (
          <Title
            c='red'
            order={3}
          >
            Error
          </Title>
        ),
        position: 'top-right',
        message: <Text c='red'>{_error?.shortMessage ?? _error.message}</Text>,
        color: 'red',
      });
    }
  };

  const {
    isLoading: isApproveLoading,
    isError: isApproveError,
    error: approveError,
  } = useWaitForTransactionReceipt({
    hash: approveTxHash,
  });

  const {
    isLoading: isStakeLoading,
    isError: isStakeError,
    error: stakeError,
    isSuccess: isStakeSuccess,
  } = useWaitForTransactionReceipt({
    hash: stakeTxHash,
  });

  const handleApproveNotification = useCallback(async () => {
    if (!approveTxHash || !publicClient) return;
    if (isApproveError && approveError) {
      const approveTxReceipt = await publicClient.getTransactionReceipt({
        hash: approveTxHash,
      });
      notifications.show({
        id: 'approve-error',
        title: (
          <Title
            c='red'
            order={3}
          >
            Approval Failed
          </Title>
        ),
        position: 'top-right',
        message: (
          <Text c='red'>
            {(approveError as BaseError)?.shortMessage ??
              'Failed to approve tokens'}
            <Text
              component={Link}
              ml={8}
              c='gray'
              target='_blank'
              href={baseScanUrl(approveTxReceipt.transactionHash)}
            >
              View on BaseScan
            </Text>
          </Text>
        ),
        color: 'red',
      });
    }
  }, [approveTxHash, publicClient, isApproveError, approveError]);

  useEffect(() => {
    handleApproveNotification();
  }, [handleApproveNotification]);

  const handleStakeNotification = useCallback(async () => {
    if (!stakeTxHash || !publicClient) return;

    if (isStakeError && stakeError) {
      const stakeTxReceipt = await publicClient.getTransactionReceipt({
        hash: stakeTxHash,
      });

      notifications.show({
        title: (
          <Title
            c='red'
            order={3}
          >
            Staking Failed
          </Title>
        ),
        position: 'top-right',
        message: (
          <Text c='red'>
            {(stakeError as BaseError)?.shortMessage ??
              'Failed to stake tokens'}
            <Text
              component={Link}
              ml={8}
              c='gray'
              target='_blank'
              href={baseScanUrl(stakeTxReceipt.transactionHash)}
            >
              View on BaseScan
            </Text>
          </Text>
        ),
        color: 'red',
      });
    }
    if (isStakeSuccess) {
      const stakeTxReceipt = await publicClient.getTransactionReceipt({
        hash: stakeTxHash,
      });
      notifications.show({
        id: 'stake-success',
        title: (
          <Title
            c='green'
            order={3}
          >
            Staking Successful
          </Title>
        ),
        position: 'top-right',
        message: (
          <Text c='green'>
            Tokens staked successfully
            <Text
              component={Link}
              ml={8}
              c='gray'
              target='_blank'
              href={baseScanUrl(stakeTxReceipt.transactionHash)}
            >
              View on BaseScan
            </Text>
          </Text>
        ),
        color: 'green',
      });
      onSuccess?.();
    }
  }, [
    isStakeError,
    stakeError,
    stakeTxHash,
    publicClient,
    isStakeSuccess,
    onSuccess,
  ]);

  useEffect(() => {
    handleStakeNotification();
  }, [handleStakeNotification]);

  return {
    stakePosition: handleStake,
    isStakePending:
      isStakePending || isStakeLoading || isApprovePending || isApproveLoading,
  };
}

export function useUnstakePosition({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  const publicClient = usePublicClient();
  const {
    data: unstakeTxHash,
    isPending: isUnstakePending,
    writeContractAsync: unstakePosition,
  } = useWriteStakingContractUnstake();

  const handleUnstake = async (positionIndex: bigint) => {
    try {
      await unstakePosition({
        args: [positionIndex],
      });
    } catch (error) {
      const _error = error as BaseError;
      notifications.show({
        title: (
          <Title
            c='red'
            order={3}
          >
            Error
          </Title>
        ),
        position: 'top-right',
        message: <Text c='red'>{_error?.shortMessage ?? _error.message}</Text>,
        color: 'red',
      });
    }
  };

  const {
    isLoading: isUnstakeLoading,
    isError: isUnstakeError,
    error: unstakeError,
    isSuccess: isUnstakeSuccess,
  } = useWaitForTransactionReceipt({
    hash: unstakeTxHash,
    query: {
      enabled: !!unstakeTxHash,
    },
  });

  const handleUnstakeNotification = useCallback(async () => {
    if (!unstakeTxHash || !publicClient) return;
    if (isUnstakeError && unstakeError) {
      const unstakeTxReceipt = await publicClient.getTransactionReceipt({
        hash: unstakeTxHash,
      });
      notifications.show({
        title: (
          <Title
            c='red'
            order={3}
          >
            Unstaking Failed
          </Title>
        ),
        position: 'top-right',
        message: (
          <Text c='red'>
            {(unstakeError as BaseError)?.shortMessage ??
              'Failed to unstake tokens'}
            <Text
              component={Link}
              ml={8}
              c='gray'
              target='_blank'
              href={baseScanUrl(unstakeTxReceipt.transactionHash)}
            >
              View on BaseScan
            </Text>
          </Text>
        ),
        color: 'red',
      });
    }
    if (isUnstakeSuccess) {
      const unstakeTxReceipt = await publicClient.getTransactionReceipt({
        hash: unstakeTxHash,
      });
      notifications.show({
        title: (
          <Title
            c='green'
            order={3}
          >
            Unstaking Successful
          </Title>
        ),
        position: 'top-right',
        message: (
          <Text c='green'>
            Tokens unstaked successfully
            <Text
              component={Link}
              ml={8}
              c='gray'
              target='_blank'
              href={baseScanUrl(unstakeTxReceipt.transactionHash)}
            >
              View on BaseScan
            </Text>
          </Text>
        ),
      });
      onSuccess?.();
    }
  }, [
    isUnstakeError,
    unstakeError,
    isUnstakeSuccess,
    unstakeTxHash,
    publicClient,
    onSuccess,
  ]);

  useEffect(() => {
    handleUnstakeNotification();
  }, [handleUnstakeNotification]);

  return {
    unstakePosition: handleUnstake,
    isUnstakePending: isUnstakePending || isUnstakeLoading,
  };
}

export function usePeriods() {
  const { data: period_30_days } = useReadStakingContractPeriod_30Days();
  const { data: period_90_days } = useReadStakingContractPeriod_90Days();
  const { data: period_180_days } = useReadStakingContractPeriod_180Days();
  const { data: period_360_days } = useReadStakingContractPeriod_360Days();
  return {
    period_30_days,
    period_90_days,
    period_180_days,
    period_360_days,
  };
}

export function useVbeaBalance() {
  const { address, isConnected } = useAccount();
  const {
    data: symbol,
    refetch,
    isFetching,
  } = useReadVbeaSymbol({
    query: {
      enabled: isConnected && address !== undefined,
    },
  });
  const { data: balance } = useReadVbeaBalanceOf({
    query: {
      enabled: isConnected && address !== undefined,
    },
    args: [address as `0x${string}`],
  });
  const { data: allowance } = useReadVbeaAllowance({
    query: {
      enabled: isConnected && address !== undefined,
    },
    args: [address as `0x${string}`, stakingContractAddress],
  });

  return {
    refetch,
    symbol: symbol,
    allowance: formatUnits(allowance ?? BigInt(0), 18),
    isFetching,
    balance: formatUnits(balance ?? BigInt(0), 18),
  };
}

export function useStakePositions({
  skip,
  limit,
  status,
}: {
  skip?: number;
  limit?: number;
  status?: number;
}) {
  const { address, isConnected } = useAccount();
  const { data: stakes, isFetching } = useReadStakingContractGetStakeInfo({
    query: {
      enabled: isConnected && address !== undefined,
    },
    args: [
      address as `0x${string}`,
      BigInt(skip ?? 0),
      BigInt(limit ?? 10),
      status ?? 0,
    ],
  });
  return {
    stakes: stakes?.[0],
    hasMore: stakes?.[1],
    isFetchingStakes: isFetching,
  };
}

export function useGetPoints() {
  const { address, isConnected } = useAccount();
  const { data: points, isFetching } = useReadStakingContractGetUserPoints({
    query: {
      enabled: isConnected && address !== undefined,
      staleTime: 5000,
    },
    args: [address as `0x${string}`],
  });
  return {
    points: parseFloat(formatUnits(points ?? BigInt(0), 18)).toFixed(2),
    isFetchingPoints: isFetching,
  };
}
