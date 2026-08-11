'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from '../utils/useTranslations';
import type { Language } from '../types/data';
import styles from './Navigation.module.scss';

interface NavigationProps {
  language: Language;
}

export default function Navigation({ language }: NavigationProps) {
  const pathname = usePathname();
  const { t } = useTranslations(language);

  const navItems = [
    { href: `/${language}`, label: t.navHome },
    { href: `/${language}/filozofi`, label: t.navPhilosophers },
    { href: `/${language}/recnik`, label: t.navDictionary },
    { href: `/${language}/o-projektu`, label: t.navAbout },
  ];

  return (
    <nav className={styles.navigation}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={pathname === item.href ? styles.active : ''}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
