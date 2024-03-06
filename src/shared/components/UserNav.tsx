import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components';
import { useAuth } from '@/context/AuthContext';
import type { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const UserNav = () => {
  const { t } = useTranslation();

  const { signOut }: any = useAuth();

  const { user } = useSelector((state: RootState) => state.auth);
  const [avatarInitials, setAvatarInitials] = useState<any>(null);

  const getAvatarInitials = () => {
    const nameWords = user?.firstName?.split(' ');
    if (nameWords) {
      if (user.imageUrl) setAvatarInitials(null);
      if (nameWords.length >= 3) setAvatarInitials(nameWords[0][0] + nameWords[2][0]);
      setAvatarInitials(nameWords.map((word: any) => word[0]).join(''));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    getAvatarInitials();
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user ? user.imageUrl : ''} alt="@shadcn" />
            <AvatarFallback>{avatarInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user ? `${user.firstName} ${user.lastName}` : ''}</p>
            <p className="text-xs leading-none text-muted-foreground">{user ? user.email : ''}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>{t('logout')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
