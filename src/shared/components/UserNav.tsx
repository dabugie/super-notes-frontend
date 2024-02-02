import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components';
import { useAuth } from '@/context/AuthContext';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function UserNav() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const { user: userData } = useSelector((state: RootState) => state.auth);

  const [avatarInitials, setAvatarInitials] = useState<any>(null);

  const getAvatarInitials = () => {
    const nameWords = userData?.fullName?.split(' ');

    if (nameWords) {
      if (userData.avatarUrl) setAvatarInitials(null);
      if (nameWords.length >= 3) setAvatarInitials(nameWords[0][0] + nameWords[2][0]);
      setAvatarInitials(nameWords.map((word: any) => word[0]).join(''));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    getAvatarInitials();
    console.log({ avatarInitials });
  }, [userData]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={userData ? userData.avatarUrl : ''} alt="@shadcn" />
            <AvatarFallback>{avatarInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData ? userData.fullName : ''}</p>
            <p className="text-xs leading-none text-muted-foreground">{userData ? userData.email : ''}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
