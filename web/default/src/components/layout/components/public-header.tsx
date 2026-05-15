/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import { useNotifications } from '@/hooks/use-notifications'
import { useSystemConfig } from '@/hooks/use-system-config'
import { useTopNavLinks } from '@/hooks/use-top-nav-links'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { LanguageSwitcher } from '@/components/language-switcher'
import { NotificationButton } from '@/components/notification-button'
import { NotificationDialog } from '@/components/notification-dialog'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { defaultTopNavLinks } from '../config/top-nav.config'
import type { TopNavLink } from '../types'
import { HeaderLogo } from './header-logo'

export interface PublicHeaderProps {
  navLinks?: TopNavLink[]
  mobileLinks?: TopNavLink[]
  navContent?: React.ReactNode
  showThemeSwitch?: boolean
  showLanguageSwitcher?: boolean
  logo?: React.ReactNode
  siteName?: string
  homeUrl?: string
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
  showNavigation?: boolean
  showAuthButtons?: boolean
  showNotifications?: boolean
  className?: string
}

export function PublicHeader(props: PublicHeaderProps) {
  const {
    navLinks = defaultTopNavLinks,
    showThemeSwitch = true,
    showLanguageSwitcher = true,
    logo: customLogo,
    siteName: customSiteName,
    homeUrl = '/',
    showAuthButtons = true,
    showNotifications = true,
  } = props

  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { auth } = useAuthStore()
  const {
    systemName,
    logo: systemLogo,
    loading,
    logoLoaded,
  } = useSystemConfig()
  const dynamicLinks = useTopNavLinks()
  const notifications = useNotifications()
  const routerState = useRouterState()
  const pathname = routerState.location.pathname

  const user = auth.user
  const isAuthenticated = !!user
  const displaySiteName = customSiteName || systemName || 'New API'
  const links = dynamicLinks.length > 0 ? dynamicLinks : navLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header className='pointer-events-none fixed inset-x-0 top-0 z-50'>
        <div
              className={cn(
                'pointer-events-auto mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                scrolled
                  ? 'max-w-[78rem] px-4 pt-4'
                  : 'max-w-[92rem] px-4 pt-3 md:px-7'
              )}
        >
          <nav
              className={cn(
                'flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                scrolled
                  ? 'h-16 rounded-[28px] border border-orange-100/85 bg-white/78 px-5 shadow-[0_24px_60px_-36px_rgba(249,115,22,0.28)] backdrop-blur-2xl'
                  : 'h-16 rounded-[28px] bg-transparent px-2 md:px-3'
              )}
            >
            {/* Logo */}
            <Link
              to={homeUrl}
              className='group flex shrink-0 items-center gap-2.5'
            >
              <div className='flex size-7 shrink-0 items-center justify-center transition-all duration-300 group-hover:scale-105'>
                {loading ? (
                  <Skeleton className='size-full rounded-lg' />
                ) : customLogo ? (
                  customLogo
                ) : (
                  <HeaderLogo
                    src={systemLogo}
                    loading={loading}
                    logoLoaded={logoLoaded}
                    className='size-full rounded-lg object-contain'
                  />
                )}
              </div>
              <span className='text-lg font-semibold tracking-tight text-slate-900'>
                {loading ? <Skeleton className='h-4 w-16' /> : displaySiteName}
              </span>
            </Link>

            {/* Desktop nav */}
            <div className='hidden items-center gap-1 sm:flex'>
              {links.map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href))
                if (link.external) {
                  return (
                    <a
                      key={i}
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='rounded-full px-4 py-2 text-[15px] font-medium text-slate-700 transition-colors duration-200 hover:text-orange-500'
                    >
                      {t(link.title)}
                    </a>
                  )
                }
                return (
                  <Link
                    key={i}
                    to={link.href}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-[15px] font-medium transition-all duration-200 hover:bg-white/65 hover:shadow-[0_12px_30px_-24px_rgba(249,115,22,0.42)]',
                      isActive
                        ? 'text-slate-950 after:absolute after:inset-x-4 after:-bottom-1 after:h-[3px] after:rounded-full after:bg-orange-500'
                        : 'text-slate-700 hover:text-orange-500'
                    )}
                  >
                    {t(link.title)}
                  </Link>
                )
              })}

              {(showLanguageSwitcher ||
                showThemeSwitch ||
                showNotifications) && (
                <div className='mx-2 h-5 w-px bg-orange-100' />
              )}

              {showLanguageSwitcher && <LanguageSwitcher />}
              {showThemeSwitch && <ThemeSwitch />}
              {showNotifications && (
                <NotificationButton
                  unreadCount={notifications.unreadCount}
                  onClick={() => notifications.openDialog()}
                />
              )}

              {showAuthButtons && (
                <>
                  <div className='mx-1 h-5 w-px bg-orange-100' />
                  {loading ? (
                    <Skeleton className='h-10 w-24 rounded-full' />
                  ) : isAuthenticated ? (
                    <ProfileDropdown />
                  ) : (
                    <div className='flex items-center gap-3'>
                      <Button
                        size='lg'
                        variant='outline'
                        className='h-11 rounded-full border-orange-100 bg-white/75 px-6 text-sm font-medium text-slate-700 shadow-[0_16px_35px_-28px_rgba(249,115,22,0.35)] backdrop-blur-xl hover:bg-white'
                        render={<Link to='/sign-in' />}
                      >
                        {t('登录')}
                      </Button>
                      <Button
                        size='lg'
                        className='h-11 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 text-sm font-medium shadow-[0_20px_40px_-24px_rgba(249,115,22,0.78)] hover:from-orange-400 hover:to-orange-500'
                        render={<Link to='/sign-up' />}
                      >
                        {t('注册')}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile: compact actions + hamburger */}
            <div className='flex items-center gap-2 sm:hidden'>
              {showThemeSwitch && <ThemeSwitch />}
              {showAuthButtons && !loading && isAuthenticated && (
                <ProfileDropdown />
              )}
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='size-10 rounded-full border border-orange-100 bg-white/70 text-slate-700 shadow-[0_16px_30px_-24px_rgba(249,115,22,0.35)] backdrop-blur-xl'
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={t('Toggle navigation menu')}
              >
                <div className='relative size-4'>
                  <span
                    className={cn(
                      'absolute inset-x-0 block h-[1.5px] origin-center rounded-full bg-current transition-all duration-300',
                      mobileOpen ? 'top-[7px] rotate-45' : 'top-[3px]'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute inset-x-0 top-[7px] block h-[1.5px] rounded-full bg-current transition-all duration-300',
                      mobileOpen ? 'scale-x-0 opacity-0' : 'opacity-100'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute inset-x-0 block h-[1.5px] origin-center rounded-full bg-current transition-all duration-300',
                      mobileOpen ? 'top-[7px] -rotate-45' : 'top-[11px]'
                    )}
                  />
                </div>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(255,247,239,0.98))] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pointer-events-none sm:hidden',
          mobileOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        <div className='flex h-full flex-col justify-between px-8 pt-20 pb-10'>
          <nav className='flex flex-col gap-1'>
            {links.map((link, i) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={i}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 py-3 text-base font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    mobileOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0',
                    isActive ? 'text-slate-950' : 'text-slate-600'
                  )}
                  style={{
                    transitionDelay: mobileOpen ? `${100 + i * 50}ms` : '0ms',
                  }}
                >
                  {t(link.title)}
                </Link>
              )
            })}
          </nav>

          <div
            className={cn(
              'flex flex-col gap-3 transition-all duration-500',
              mobileOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: mobileOpen ? '250ms' : '0ms' }}
          >
            {showAuthButtons && (
              <Link
                to={isAuthenticated ? '/dashboard' : '/sign-in'}
                onClick={() => setMobileOpen(false)}
                className='inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-sm font-medium text-white shadow-[0_20px_40px_-24px_rgba(249,115,22,0.78)] transition-opacity hover:opacity-90 active:opacity-80'
              >
                {isAuthenticated ? t('进入控制台') : t('登录')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Notification Dialog */}
      {showNotifications && (
        <NotificationDialog
          open={notifications.dialogOpen}
          onOpenChange={notifications.setDialogOpen}
          activeTab={notifications.activeTab}
          onTabChange={notifications.setActiveTab}
          notice={notifications.notice}
          announcements={notifications.announcements}
          loading={notifications.loading}
          onCloseToday={notifications.closeToday}
        />
      )}
    </>
  )
}
