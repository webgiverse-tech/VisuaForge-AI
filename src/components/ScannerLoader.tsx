import React from 'react';
import { cn } from '@/lib/utils';

interface ScannerLoaderProps {
  className?: string;
}

const ScannerLoader: React.FC<ScannerLoaderProps> = ({ className }) => {
  return (
    <div className={cn(
      "relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden bg-vf-dark border-2 border-vf-blue animate-scanner-pulse",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-vf-blue to-vf-purple opacity-20 rounded-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-vf-purple animate-spin-slow" />
      </div>
      <div className="absolute w-full h-1/4 bg-gradient-to-r from-transparent via-vf-blue to-transparent animate-scanner-line" />
      <span className="relative z-10 text-vf-blue text-xs font-bold tracking-widest">SCANNING</span>
    </div>
  );
};

export default ScannerLoader;