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
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { Markdown } from '@/components/ui/markdown'
import { PublicLayout, type TopNavLink } from '@/components/layout'
import { Footer } from '@/components/layout/components/footer'
import { CTA, FAQ, Hero, HowItWorks, Stats } from './components'
import { ClickSpark } from './components/click-spark'
import { useHomePageContent } from './hooks'

const homeNavLinks: TopNavLink[] = [
  { title: '首页', href: '/' },
  { title: '控制台', href: '/dashboard' },
  { title: '模型广场', href: '/pricing' },
  { title: '官网', href: 'https://token.fun.tv/', external: true },
  { title: '关于我们', href: '/about' },
]

const funTokenLogo = (
  <img
    src='/images/home/funtoken-mark.svg'
    alt=''
    className='size-full object-contain'
  />
)

export function Home() {
  const { t } = useTranslation()
  const { auth } = useAuthStore()
  const isAuthenticated = !!auth.user
  const { content, isLoaded, isUrl } = useHomePageContent()

  if (!isLoaded) {
    return (
      <PublicLayout
        showMainContainer={false}
        navLinks={homeNavLinks}
        showNotifications={false}
        logo={funTokenLogo}
        siteName='FUN Token'
        headerProps={{ showNotifications: false }}
      >
        <main className='flex min-h-screen items-center justify-center'>
          <div className='text-muted-foreground'>{t('Loading...')}</div>
        </main>
      </PublicLayout>
    )
  }

  if (content) {
    return (
      <PublicLayout
        showMainContainer={false}
        navLinks={homeNavLinks}
        showNotifications={false}
        logo={funTokenLogo}
        siteName='FUN Token'
        headerProps={{ showNotifications: false }}
      >
        <main className='overflow-x-hidden'>
          {isUrl ? (
            <iframe
              src={content}
              className='h-screen w-full border-none'
              title={t('Custom Home Page')}
            />
          ) : (
            <div className='container mx-auto py-8'>
              <Markdown className='custom-home-content'>{content}</Markdown>
            </div>
          )}
        </main>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout
      showMainContainer={false}
      navLinks={homeNavLinks}
      showNotifications={false}
      logo={funTokenLogo}
      siteName='FUN Token'
      headerProps={{ showNotifications: false }}
    >
      <main className='funapi-home overflow-x-hidden'>
        <ClickSpark
          sparkColor='#fb7213'
          sparkSize={12}
          sparkRadius={20}
          sparkCount={9}
          duration={460}
          extraScale={1.12}
        >
          <Hero isAuthenticated={isAuthenticated} />
          <Stats />
          <HowItWorks />
          <FAQ />
          <CTA isAuthenticated={isAuthenticated} />
          <Footer
            logo='/images/home/funtoken-mark.svg'
            name='FUN Token'
            copyright={t('All rights reserved.')}
          />
        </ClickSpark>
      </main>
    </PublicLayout>
  )
}
