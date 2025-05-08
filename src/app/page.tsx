'use client';
import StakingCard from '@/components/StakingCard';
import Tab from '@/components/Tab';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import NumberInput from '@/components/NumberInput';
import {
  useGetPoints,
  usePeriods,
  useStakePosition,
  useStakePositions,
  useUnstakePosition,
  useVbeaBalance,
} from '@/hooks';
import { formatUnits, parseEther } from 'viem';
import { Skeleton } from '@mantine/core';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Stake');
  const tabs = ['Stake', 'Active Stakes'];

  // State for stake form
  const [amount, setAmount] = useState('');
  const { balance } = useVbeaBalance();
  const { period_30_days, period_90_days, period_180_days, period_360_days } =
    usePeriods();

  const { points, isFetchingPoints } = useGetPoints();
  const { stakePosition, isStakePending } = useStakePosition();
  const { unstakePosition, isUnstakePending } = useUnstakePosition();
  const [skipActiveStakes, setSkipActiveStakes] = useState(0);
  const [limitActiveStakes] = useState(10);
  const { stakes: activeStakes, hasMore: hasMoreActiveStakes } =
    useStakePositions({
      skip: skipActiveStakes,
      limit: limitActiveStakes,
      status: 0,
    });

  const periodMap = {
    '30': period_30_days,
    '90': period_90_days,
    '180': period_180_days,
    '360': period_360_days,
  };

  const periods = [
    {
      label: '30 Days',
      value: '30',
    },
    {
      label: '90 Days',
      value: '90',
    },
    {
      label: '180 Days',
      value: '180',
    },
    {
      label: '360 Days',
      value: '360',
    },
  ];
  const [period, setPeriod] = useState(periods[0].value);
  // Stake form content
  const stakeForm = (
    <form className='flex flex-col gap-4 w-full max-w-xs mx-auto'>
      <label className='flex flex-col gap-1'>
        <span className='text-sm text-foreground/80'>Period</span>
        <select
          className='bg-card border border-accent-1 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-1'
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          {periods.map((opt) => (
            <option
              value={opt.value}
              key={opt.label}
            >
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <label className='flex flex-col gap-1'>
        <span className='text-sm text-foreground/80'>Amount</span>
        <NumberInput
          min={1}
          step={0.0001}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Enter amount'
          rightContent={
            <button
              type='button'
              className='ml-2 px-2 py-1 text-xs font-semibold rounded transition-colors cursor-pointer'
              onClick={() => setAmount(balance)}
              tabIndex={-1}
            >
              Max
            </button>
          }
        />
      </label>
      <button
        type='button'
        className={`bg-button hover:bg-button-dark text-white font-semibold py-2 px-4 rounded transition-colors mt-2 cursor-pointer ${!amount || parseFloat(amount) < 1 ? 'opacity-50 cursor-not-allowed!' : ''}`}
        onClick={() => {
          if (!amount || parseFloat(amount) < 1 || isStakePending) return;
          stakePosition(
            parseEther(amount),
            periodMap[period as keyof typeof periodMap] as bigint
          );
        }}
        disabled={!amount || parseFloat(amount) < 1 || isStakePending}
      >
        {isStakePending ? 'Staking...' : 'Stake'}
      </button>
    </form>
  );

  const tabContents = [
    stakeForm,
    <div
      className='flex grow flex-col gap-4 w-full overflow-hidden overflow-y-auto max-h-[500px] border border-foreground rounded-xl p-4'
      key='active-stakes'
    >
      {activeStakes?.map((stake) => (
        <StakingCard
          key={stake.stakeId}
          amount={formatUnits(stake.amount, 18)}
          isUnstakePending={isUnstakePending}
          period={
            Object.keys(periodMap).find(
              (key) => periodMap[key as keyof typeof periodMap] === stake.period
            ) || ''
          }
          status='Active'
          onUnstake={() => unstakePosition(stake.stakeId)}
          startDate={new Date(Number(stake.startTime) * 1000)}
          endDate={new Date(Number(stake.endTime) * 1000)}
        />
      ))}
      {skipActiveStakes > 0 && (
        <button
          type='button'
          className='bg-button hover:bg-button-dark text-white font-semibold py-2 px-4 rounded transition-colors mt-2 cursor-pointer'
          onClick={() => {
            setSkipActiveStakes(skipActiveStakes - limitActiveStakes);
          }}
        >
          Previous
        </button>
      )}
      {hasMoreActiveStakes && (
        <button
          type='button'
          className='bg-button hover:bg-button-dark text-white font-semibold py-2 px-4 rounded transition-colors mt-2 cursor-pointer'
          onClick={() => {
            setSkipActiveStakes(skipActiveStakes + limitActiveStakes);
          }}
        >
          Next
        </button>
      )}
    </div>,
  ];

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold mb-2'>Staking</h1>
        {isFetchingPoints ? (
          <Skeleton className='w-full h-10' />
        ) : (
          <p className='text-xl text-accent-3 mb-2 rounded-xl border border-accent-1 p-4'>
            {points} Points
          </p>
        )}
        <ConnectButton
          showBalance={false}
          accountStatus={'full'}
          chainStatus='icon'
        />
        <div className='mt-8 w-full flex flex-col items-center'>
          <Tab
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabContents={tabContents}
            className='mb-6'
          />
        </div>
      </div>
    </div>
  );
}
