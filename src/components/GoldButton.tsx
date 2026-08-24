import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'solid' | 'outline' | 'ghost';

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ variant = 'solid', className = '', children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide select-none transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:pointer-events-none active:scale-95 ${className}`}
        style={
          variant === 'solid'
            ? {
                background: 'linear-gradient(135deg, #fef08a 0%, #e9b13a 55%, #b87d1c 100%)',
                color: '#140e05',
                border: '1px solid rgba(254, 240, 138, 0.7)',
                boxShadow: '0 0 25px rgba(233, 177, 58, 0.35), 0 8px 20px rgba(0, 0, 0, 0.4)',
              }
            : variant === 'outline'
              ? {
                  background: 'rgba(15, 15, 22, 0.6)',
                  color: '#f3d98e',
                  border: '1px solid rgba(233, 177, 58, 0.45)',
                  boxShadow: '0 0 15px rgba(233, 177, 58, 0.15)',
                  backdropFilter: 'blur(10px)',
                }
              : {
                  background: 'transparent',
                  color: '#e6e6ea',
                }
        }
        {...rest}
      >
        {/* Shimmer Sweep Animation on Hover (for solid variant) */}
        {variant === 'solid' && (
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        )}

        <span className="relative z-10 flex items-center gap-2 font-semibold">
          {children}
        </span>
      </button>
    );
  },
);

GoldButton.displayName = 'GoldButton';
