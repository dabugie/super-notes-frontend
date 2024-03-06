import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const LoadingSpinner = ({ size = 24, className, ...props }: ISVGProps) => {
  return <Loader2 className="animate-spin" />;
};
