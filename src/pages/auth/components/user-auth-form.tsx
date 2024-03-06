import { Button, Input, Toaster, useToast } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import type { HTMLAttributes, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  isLoginPage: boolean;
}

export const UserAuthForm = ({ className, isLoginPage, ...props }: UserAuthFormProps) => {
  const { t } = useTranslation();

  const { signUp, signIn }: any = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { toast } = useToast();

  const handleChange = ({ target: { name, value } }: any) => setUser({ ...user, [name]: value });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log({
      user
    });

    try {
      if (isLoginPage) {
        await signIn(user.email, user.password);
      } else {
        await signUp({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password
        });
      }
    } catch (error: any) {
      toast({
        title: 'Authentication Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = isLoginPage
    ? user.email && user.password
    : user.firstName && user.lastName && user.email && user.password;

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Toaster />
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {isLoginPage ? null : (
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                name="firstName"
                placeholder={t('first-name')}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Input
                type="text"
                name="lastName"
                placeholder={t('last-name')}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          )}
          <Input
            type="email"
            name="email"
            placeholder={t('email')}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input type="password" name="password" placeholder="********" onChange={handleChange} disabled={isLoading} />
          <Button disabled={isLoading || !isFormValid}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoginPage ? t('sign-in') : t('sign-up')}
          </Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div> */}
    </div>
  );
};
