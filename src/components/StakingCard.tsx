import React from 'react';

interface StakingCardProps {
  amount: string;
  period: string;
  status?: string;
  onUnstake?: () => void;
  startDate?: Date | number;
  endDate?: Date | number;
  isUnstakePending?: boolean;
}

const statusColor = (status?: string) => {
  if (status === 'Active') return 'bg-accent-1 text-white';
  if (status === 'Finished') return 'bg-red-400 text-foreground';
  return 'bg-green-100 text-green-700';
};

const getProgress = (startDate?: Date | number, endDate?: Date | number) => {
  if (!startDate || !endDate) return 0;
  const now = Date.now();
  const start = typeof startDate === 'number' ? startDate : startDate.getTime();
  const end = typeof endDate === 'number' ? endDate : endDate.getTime();
  if (now <= start) return 0;
  if (now >= end) return 100;
  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
};

const StakingCard: React.FC<StakingCardProps> = ({
  amount,
  period,
  status,
  onUnstake,
  startDate,
  endDate,
  isUnstakePending,
}) => {
  const progress = getProgress(startDate, endDate);
  return (
    <div className='bg-card rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-accent-1 max-w-sm w-[400px]'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>Staking Period</h2>
        {status && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(status)}`}
          >
            {status}
          </span>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span className='text-foreground/80'>Amount</span>
          <span className='font-semibold'>{amount} VBEA</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-foreground/80'>Period</span>
          <span className='font-semibold'>{period} Days</span>
        </div>
      </div>
      {/* Progress Bar */}
      {startDate && endDate && (
        <div className='mt-2'>
          <div className='flex justify-between text-xs mb-1 text-foreground/60'>
            <span>
              {typeof startDate === 'number'
                ? new Date(startDate).toLocaleDateString()
                : startDate.toLocaleDateString()}
            </span>
            <span>
              {typeof endDate === 'number'
                ? new Date(endDate).toLocaleDateString()
                : endDate.toLocaleDateString()}
            </span>
          </div>
          <div className='w-full h-2 bg-green-100 rounded-full overflow-hidden'>
            <div
              className={`h-full transition-all duration-500 ${status === 'Finished' ? 'bg-red-400' : 'bg-green-500'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {onUnstake && (
        <button
          disabled={progress !== 100 || isUnstakePending}
          className={`flex-1 mt-4 bg-button hover:bg-button-dark text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer ${progress !== 100 ? 'opacity-50 cursor-not-allowed!' : ''}`}
          onClick={onUnstake}
        >
          {isUnstakePending ? 'Unstaking...' : 'Unstake'}
        </button>
      )}
    </div>
  );
};

export default StakingCard;
