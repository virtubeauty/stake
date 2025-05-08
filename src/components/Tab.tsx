import React from 'react';

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
  tabContents?: React.ReactNode[];
}

const Tab: React.FC<TabProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  tabContents,
}) => {
  const activeIndex = tabs.indexOf(activeTab);
  return (
    <>
      <div className={`w-full flex flex-col items-center ${className || ''}`}>
        <div className='flex space-x-2 bg-card rounded-lg p-1'>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm cursor-pointer
              ${
                activeTab === tab
                  ? 'bg-button text-white shadow'
                  : 'bg-transparent text-foreground'
              }
            `}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {tabContents && tabContents[activeIndex] && (
        <div className='mt-4 flex justify-center w-full'>
          {tabContents[activeIndex]}
        </div>
      )}
    </>
  );
};

export default Tab;
