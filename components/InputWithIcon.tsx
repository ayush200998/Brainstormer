import React, { ElementType } from 'react';
import { cn } from '@/lib/utils'; // Utility function for classnames
import { Input } from '@/components/ui/input';

type InputWithIconProps = {
  className?: string;
  icon: ElementType; // React component type for the icon
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWithIcon: React.FC<InputWithIconProps> = ({
  className,
  icon: Icon,
  placeholder = "Search...", // Default placeholder
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Icon className="absolute left-3 h-5 w-5 text-gray-400" aria-hidden="true" />

      <Input
        className="pl-10"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default InputWithIcon;