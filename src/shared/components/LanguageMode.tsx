import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LANGUAGES } from '@/models/languages.model';
import { Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const languageCodesArray = LANGUAGES.map((lang) => lang.code) as string[];
type LanguageCodes = (typeof languageCodesArray)[number];

export const LanguageMode = () => {
  const { i18n } = useTranslation();

  const [lenguage, setLenguage] = useState<LanguageCodes>(
    () => (localStorage.getItem('i18nextLng') as LanguageCodes) || 'es'
  );

  useEffect(() => {
    i18n.changeLanguage(lenguage);
  }, [i18n, lenguage]);

  const onChangeLang = (value: string) => {
    localStorage.setItem('i18nextLng', value);
    i18n.changeLanguage(value);
    setLenguage(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={lenguage} onValueChange={onChangeLang}>
          {LANGUAGES.map(({ code, label }) => (
            <DropdownMenuRadioItem key={code} value={code}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
