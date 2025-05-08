import React from 'react';

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const NumberInput: React.FC<NumberInputProps> = ({
  leftContent,
  rightContent,
  className = '',
  onChange,
  value,
  ...props
}) => {
  // Only allow decimals (with . or ,)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(',', '.');
    // Allow only numbers and one dot
    if (/^\d*(\.?\d*)?$/.test(val) || val === '') {
      if (onChange) {
        onChange({ ...e, target: { ...e.target, value: val } });
      }
    }
  };

  return (
    <div
      className={`flex items-center bg-card border border-accent-1 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-accent-1 ${className}`}
    >
      {leftContent && (
        <span className='mr-2 text-foreground/70'>{leftContent}</span>
      )}
      <input
        type='text'
        inputMode='decimal'
        pattern='^[0-9]*[.,]?[0-9]*$'
        min={1}
        step='0.0001'
        className='flex-1 bg-transparent outline-none border-none'
        value={value}
        onChange={handleChange}
        onWheel={(e) => e.currentTarget.blur()}
        {...props}
      />
      {rightContent && (
        <span className='ml-2 text-foreground/70'>{rightContent}</span>
      )}
    </div>
  );
};

export default NumberInput;
