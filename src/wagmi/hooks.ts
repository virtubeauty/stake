import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StakingContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakingContractAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'stakeId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'period',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Staked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'stakeId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Unstaked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERIOD_180_DAYS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERIOD_30_DAYS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERIOD_360_DAYS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERIOD_90_DAYS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_period', internalType: 'uint256', type: 'uint256' }],
    name: 'getPointsPerDay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: 'offset', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
      {
        name: 'status',
        internalType: 'enum StakingContract.StakeStatusFilter',
        type: 'uint8',
      },
    ],
    name: 'getStakeInfo',
    outputs: [
      {
        name: 'stakesPage',
        internalType: 'struct StakingContract.StakeInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'stakeId', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'period', internalType: 'uint256', type: 'uint256' },
          {
            name: 'status',
            internalType: 'enum StakingContract.StakeStatus',
            type: 'uint8',
          },
        ],
      },
      { name: 'hasMore', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getUserPoints',
    outputs: [
      { name: 'availablePoints', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_stakingToken', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maximumStake',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minimumStake',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'pointsPerDay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newMaximum', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaximumStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newMinimum', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinimumStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_period', internalType: 'uint256', type: 'uint256' },
      { name: '_points', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setPointsPerDay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_period', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'stakes',
    outputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      { name: 'period', internalType: 'uint256', type: 'uint256' },
      {
        name: 'status',
        internalType: 'enum StakingContract.StakeStatus',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingToken',
    outputs: [
      { name: '', internalType: 'contract ERC20Upgradeable', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalStaked',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_stakeId', internalType: 'uint256', type: 'uint256' }],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userPoints',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userStakeCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userTotalStaked',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

export const stakingContractAddress =
  '0x8c71EaeEB75ffC3c83F46281De5B0cb469C03177' as const

export const stakingContractConfig = {
  address: stakingContractAddress,
  abi: stakingContractAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VBEA
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vbeaAbi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

export const vbeaAddress = '0xDD67CE74cfD3BB09B25FC02D4899e966E493Bc15' as const

export const vbeaConfig = { address: vbeaAddress, abi: vbeaAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__
 */
export const useReadStakingContract = /*#__PURE__*/ createUseReadContract({
  abi: stakingContractAbi,
  address: stakingContractAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"PERIOD_180_DAYS"`
 */
export const useReadStakingContractPeriod_180Days =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'PERIOD_180_DAYS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"PERIOD_30_DAYS"`
 */
export const useReadStakingContractPeriod_30Days =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'PERIOD_30_DAYS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"PERIOD_360_DAYS"`
 */
export const useReadStakingContractPeriod_360Days =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'PERIOD_360_DAYS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"PERIOD_90_DAYS"`
 */
export const useReadStakingContractPeriod_90Days =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'PERIOD_90_DAYS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadStakingContractUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"getPointsPerDay"`
 */
export const useReadStakingContractGetPointsPerDay =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'getPointsPerDay',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"getStakeInfo"`
 */
export const useReadStakingContractGetStakeInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'getStakeInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"getUserPoints"`
 */
export const useReadStakingContractGetUserPoints =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'getUserPoints',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"maximumStake"`
 */
export const useReadStakingContractMaximumStake =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'maximumStake',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"minimumStake"`
 */
export const useReadStakingContractMinimumStake =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'minimumStake',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"owner"`
 */
export const useReadStakingContractOwner = /*#__PURE__*/ createUseReadContract({
  abi: stakingContractAbi,
  address: stakingContractAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"pointsPerDay"`
 */
export const useReadStakingContractPointsPerDay =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'pointsPerDay',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadStakingContractProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"stakes"`
 */
export const useReadStakingContractStakes = /*#__PURE__*/ createUseReadContract(
  {
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'stakes',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"stakingToken"`
 */
export const useReadStakingContractStakingToken =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'stakingToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"totalStaked"`
 */
export const useReadStakingContractTotalStaked =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'totalStaked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"userPoints"`
 */
export const useReadStakingContractUserPoints =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'userPoints',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"userStakeCount"`
 */
export const useReadStakingContractUserStakeCount =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'userStakeCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"userTotalStaked"`
 */
export const useReadStakingContractUserTotalStaked =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'userTotalStaked',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingContractAbi}__
 */
export const useWriteStakingContract = /*#__PURE__*/ createUseWriteContract({
  abi: stakingContractAbi,
  address: stakingContractAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteStakingContractInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteStakingContractRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"setMaximumStake"`
 */
export const useWriteStakingContractSetMaximumStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'setMaximumStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"setMinimumStake"`
 */
export const useWriteStakingContractSetMinimumStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'setMinimumStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"setPointsPerDay"`
 */
export const useWriteStakingContractSetPointsPerDay =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'setPointsPerDay',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"stake"`
 */
export const useWriteStakingContractStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'stake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteStakingContractTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"unstake"`
 */
export const useWriteStakingContractUnstake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'unstake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteStakingContractUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingContractAbi}__
 */
export const useSimulateStakingContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateStakingContractInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateStakingContractRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"setMaximumStake"`
 */
export const useSimulateStakingContractSetMaximumStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'setMaximumStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"setMinimumStake"`
 */
export const useSimulateStakingContractSetMinimumStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'setMinimumStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"setPointsPerDay"`
 */
export const useSimulateStakingContractSetPointsPerDay =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'setPointsPerDay',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"stake"`
 */
export const useSimulateStakingContractStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'stake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateStakingContractTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"unstake"`
 */
export const useSimulateStakingContractUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'unstake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingContractAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateStakingContractUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingContractAbi}__
 */
export const useWatchStakingContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingContractAbi,
    address: stakingContractAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingContractAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchStakingContractInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchStakingContractOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingContractAbi}__ and `eventName` set to `"Staked"`
 */
export const useWatchStakingContractStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    eventName: 'Staked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingContractAbi}__ and `eventName` set to `"Unstaked"`
 */
export const useWatchStakingContractUnstakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    eventName: 'Unstaked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingContractAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchStakingContractUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingContractAbi,
    address: stakingContractAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vbeaAbi}__
 */
export const useReadVbea = /*#__PURE__*/ createUseReadContract({
  abi: vbeaAbi,
  address: vbeaAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadVbeaAllowance = /*#__PURE__*/ createUseReadContract({
  abi: vbeaAbi,
  address: vbeaAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadVbeaBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: vbeaAbi,
  address: vbeaAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadVbeaDecimals = /*#__PURE__*/ createUseReadContract({
  abi: vbeaAbi,
  address: vbeaAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"name"`
 */
export const useReadVbeaName = /*#__PURE__*/ createUseReadContract({
  abi: vbeaAbi,
  address: vbeaAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadVbeaSymbol = /*#__PURE__*/ createUseReadContract({
  abi: vbeaAbi,
  address: vbeaAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadVbeaTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: vbeaAbi,
  address: vbeaAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vbeaAbi}__
 */
export const useWriteVbea = /*#__PURE__*/ createUseWriteContract({
  abi: vbeaAbi,
  address: vbeaAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteVbeaApprove = /*#__PURE__*/ createUseWriteContract({
  abi: vbeaAbi,
  address: vbeaAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteVbeaTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: vbeaAbi,
  address: vbeaAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteVbeaTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: vbeaAbi,
  address: vbeaAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vbeaAbi}__
 */
export const useSimulateVbea = /*#__PURE__*/ createUseSimulateContract({
  abi: vbeaAbi,
  address: vbeaAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateVbeaApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: vbeaAbi,
  address: vbeaAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateVbeaTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: vbeaAbi,
  address: vbeaAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vbeaAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateVbeaTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vbeaAbi,
    address: vbeaAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vbeaAbi}__
 */
export const useWatchVbeaEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: vbeaAbi,
  address: vbeaAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vbeaAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchVbeaApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vbeaAbi,
    address: vbeaAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vbeaAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchVbeaTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vbeaAbi,
    address: vbeaAddress,
    eventName: 'Transfer',
  })
