import { Loader2 } from 'lucide-react';

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const LoadingSpinner = () => {
  return <Loader2 className="animate-spin" />;
};
