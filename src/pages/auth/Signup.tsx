import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { UserAuthForm } from './components/user-auth-form';
import { useTranslation } from 'react-i18next';

export const Signup = () => {
  const { t } = useTranslation();

  return (
    <div className="container relative md:h-auto lg:h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link to="/signin" className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-8 top-8')}>
        {t('sign-in')}
      </Link>

      <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />

        <div className="relative z-20 flex items-center text-lg font-medium">Ballancify</div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            {/* <p className='text-lg'>
                            &ldquo;This app has revolutionized how I manage my finances,
                            saving me precious time and empowering me to make smarter
                            financial decisions with ease. Experience the future of financial
                            management today.&rdquo;
                        </p>
                        <footer className='text-sm'>Daniel Reyes</footer> */}
          </blockquote>
        </div>
      </div>

      <div className="h-screen flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{t('sign-up')}</h1>
            <p className="text-sm text-muted-foreground">{t('sign-up-desc')}</p>
          </div>
          <UserAuthForm isLoginPage={false} />
          {/* <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <span className="underline underline-offset-4 hover:text-primary">Terms of Service</span> and{' '}
            <span className="underline underline-offset-4 hover:text-primary">Privacy Policy</span>.
          </p> */}
        </div>
      </div>
    </div>
  );
};
