import React from 'react';

// TODO: complete variants
type Variant = 'primary' | 'outline' | 'link';
type Size = 'small' | 'normal';

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  size?: Size;
  title: string;
  variant?: Variant;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

const sizeClassName: Record<Size, string> = {
  small: 'min-w-36 ',
  normal: 'w-full',
};

// TODO: complete colors
const variantClassName: Record<Variant, string> = {
  primary: `
    bg-primary-blue
    border-primary-blue
    text-neutral-white
    
    active:bg-primary-dark 
    active:border-primary-dark 
    
    disabled:bg-primary-light
    disabled:border-primary-light
    `,
  outline: `
    border-primary-blue
    text-primary-blue
    
    active:border-primary-dark 
    active:text-primary-dark 
    
    disabled:bg-neutral-lighter
    disabled:border-neutral-normal
    disabled:text-neutral-normal
  `,
  link: `
    bg-transparent 
    border-transparent 
    text-primary-blue  
    px-0  
    min-w-fit   
    
    active:text-primary-dark 
    
    disabled:text-neutral-normal
  `,
};

const Button = ({
  title,
  disabled = false,
  variant = 'primary',
  size = 'normal',
  className,
  type = 'button',
  onClick,
}: ButtonProps) => (
  <button
    className={`h-12 rounded-lg p-2 border ${sizeClassName[size]} ${variantClassName[variant]} ${className}`}
    type={type}
    title={title}
    aria-label={title}
    disabled={disabled}
    onClick={() => onClick?.()}
  >
    {title}
  </button>
);

export default Button;
