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
import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Github01Icon,
  Group01Icon,
  LinkSquare02Icon,
  Mail01Icon,
  NewTwitterIcon,
} from '@hugeicons/core-free-icons'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useSystemConfig } from '@/hooks/use-system-config'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { HomeIcon } from '@/features/home/components'

interface FooterLink {
  text: string
  href: string
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  logo?: string
  name?: string
  columns?: FooterColumnProps[]
  copyright?: string
  className?: string
}

const NEW_API_FOOTER_ATTRIBUTION_KEY = [
  'footer',
  'new' + 'api',
  'projectAttributionSuffix',
].join('.')

function FooterLinkItem(props: { link: FooterLink }) {
  const { t } = useTranslation()
  const isExternal = /^(https?:|mailto:)/.test(props.link.href)
  const label = t(props.link.text)

  if (isExternal) {
    return (
      <a
        href={props.link.href}
        target='_blank'
        rel='noopener noreferrer'
        className='text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
      >
        {label}
      </a>
    )
  }

  return (
    <Link
      to={props.link.href}
      className='text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
    >
      {label}
    </Link>
  )
}

function ProjectAttribution(props: { currentYear: number }) {
  const { t } = useTranslation()

  return (
    <div className='text-muted-foreground/45 text-center text-xs sm:text-right'>
      <span className='text-muted-foreground/45'>
        &copy; {props.currentYear}{' '}
        <a
          href='https://github.com/QuantumNous/new-api'
          target='_blank'
          rel='noopener noreferrer'
          className='text-foreground/70 hover:text-foreground font-medium transition-colors'
        >
          {t('New API')}
        </a>
        . {t(NEW_API_FOOTER_ATTRIBUTION_KEY)}
      </span>
    </div>
  )
}

export function Footer(props: FooterProps) {
  const { t } = useTranslation()
  const { systemName, logo: systemLogo, footerHtml } = useSystemConfig()
  const [qqDialogOpen, setQqDialogOpen] = useState(false)

  const displayLogo = props.logo || systemLogo || '/logo.png'
  const displayName = props.name || systemName || 'New API'
  const currentYear = new Date().getFullYear()
  const isFunToken =
    displayName.toLowerCase().replace(/\s+/g, '') === 'funtoken'

  const fallbackColumns = useMemo<FooterColumnProps[]>(
    () => [
      {
        title: t('footer.columns.about.title'),
        links: [
          {
            text: t('footer.columns.about.links.aboutProject'),
            href: 'https://token.fun.tv/',
          },
          {
            text: t('footer.columns.about.links.contact'),
            href: 'https://token.fun.tv/',
          },
          {
            text: t('footer.columns.about.links.features'),
            href: 'https://token.fun.tv/',
          },
        ],
      },
      {
        title: t('footer.columns.docs.title'),
        links: [
          {
            text: t('footer.columns.docs.links.quickStart'),
            href: 'https://token.fun.tv/',
          },
          {
            text: t('footer.columns.docs.links.installation'),
            href: 'https://token.fun.tv/',
          },
          {
            text: t('footer.columns.docs.links.apiDocs'),
            href: 'https://token.fun.tv/',
          },
        ],
      },
      {
        title: t('footer.columns.related.title'),
        links: [
          {
            text: t('footer.columns.related.links.oneApi'),
            href: 'https://github.com/songquanpeng/one-api',
          },
          {
            text: t('footer.columns.related.links.midjourney'),
            href: 'https://github.com/novicezk/midjourney-proxy',
          },
          {
            text: t('footer.columns.related.links.newApiKeyTool'),
            href: 'https://github.com/Calcium-Ion/new-api-key-tool',
          },
        ],
      },
    ],
    [t]
  )

  const displayColumns = props.columns ?? fallbackColumns

  if (footerHtml) {
    return (
      <footer
        className={cn(
          'border-border/40 relative z-10 border-t',
          props.className
        )}
      >
        <div className='mx-auto w-full max-w-6xl px-6 py-5'>
          <div className='bg-muted/20 border-border/50 flex flex-col items-center justify-between gap-4 rounded-2xl border px-4 py-4 backdrop-blur-sm sm:flex-row sm:px-5'>
            <div
              className='custom-footer text-muted-foreground min-w-0 text-center text-sm sm:text-left'
              dangerouslySetInnerHTML={{ __html: footerHtml }}
            />
            <div className='border-border/60 w-full border-t pt-4 sm:w-auto sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5'>
              <ProjectAttribution currentYear={currentYear} />
            </div>
          </div>
        </div>
      </footer>
    )
  }

  if (isFunToken) {
    return (
      <footer
        className={cn(
          'border-border/40 relative z-10 border-t',
          props.className
        )}
      >
        <div className='mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-7'>
          <Link to='/' className='group flex items-center gap-2.5'>
            <img
              src={displayLogo}
              alt={displayName}
              className='size-8 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105'
            />
            <span className='text-lg font-semibold tracking-tight text-slate-950'>
              {displayName}
            </span>
          </Link>
          <div className='text-muted-foreground flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm'>
            <span>
              &copy; {currentYear} {displayName}.{' '}
              {props.copyright ?? t('footer.defaultCopyright')}
            </span>
            <button
              type='button'
              className='hover:text-foreground inline-flex items-center gap-2 transition-colors'
              onClick={() => setQqDialogOpen(true)}
            >
              <HomeIcon icon={Group01Icon} size={17} className='text-current' />
              <span>QQ群: 1103444778</span>
            </button>
          </div>
          <ProjectAttribution currentYear={currentYear} />
        </div>
        <Dialog open={qqDialogOpen} onOpenChange={setQqDialogOpen}>
          <DialogContent className='max-w-[23rem] overflow-hidden p-0'>
            <DialogHeader className='px-5 pt-5 text-left'>
              <DialogTitle>FUN Token 售后群</DialogTitle>
              <DialogDescription>群号：1103444778</DialogDescription>
            </DialogHeader>
            <div className='px-5 pb-5'>
              <img
                src='/images/home/funtoken-qq-group.jpg'
                alt='FUN Token QQ 群二维码，群号 1103444778'
                className='mx-auto mt-1 max-h-[70vh] w-full rounded-xl object-contain'
              />
              <p className='text-muted-foreground mt-3 text-center text-sm'>
                扫一扫二维码，加入群聊
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </footer>
    )
  }

  return (
    <footer
      className={cn('border-border/40 relative z-10 border-t', props.className)}
    >
      <div className='mx-auto max-w-6xl px-6 py-8 md:py-10'>
        <div className='flex flex-col justify-between gap-8 md:flex-row md:gap-12'>
          {/* Brand column */}
          <div className='shrink-0'>
            <Link to='/' className='group flex items-center gap-2.5'>
              <img
                src={displayLogo}
                alt={displayName}
                className='size-7 rounded-lg object-contain'
              />
              <span className='text-sm font-semibold tracking-tight'>
                {displayName}
              </span>
            </Link>
            <p className='text-muted-foreground/60 mt-2.5 max-w-[240px] text-xs leading-relaxed'>
              {t('Powerful API Management Platform')}
            </p>
          </div>

          {/* Links columns */}
          <div className='grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10'>
            {displayColumns.map((column, index) => (
              <div key={index}>
                <p className='text-foreground/85 mb-3 text-lg font-semibold tracking-tight'>
                  {t(column.title)}
                </p>
                <ul className='space-y-2.5'>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className='border-border/30 mt-8 flex flex-col items-center justify-between gap-4 border-t pt-5 sm:flex-row'>
          <p className='text-muted-foreground/50 text-xs'>
            &copy; {currentYear} {displayName}.{' '}
            {props.copyright ?? t('footer.defaultCopyright')}
          </p>
          <div className='flex items-center gap-3 text-slate-500'>
            <a
              href='https://token.fun.tv/'
              target='_blank'
              rel='noopener noreferrer'
              className='funapi-interactive-chip rounded-full border border-orange-100 bg-white/80 p-2.5 shadow-[0_12px_28px_-24px_rgba(249,115,22,0.45)] transition-colors hover:text-orange-500'
            >
              <HomeIcon
                icon={Github01Icon}
                size={16}
                className='text-current'
              />
            </a>
            <a
              href='https://token.fun.tv/'
              target='_blank'
              rel='noopener noreferrer'
              className='funapi-interactive-chip rounded-full border border-orange-100 bg-white/80 p-2.5 shadow-[0_12px_28px_-24px_rgba(249,115,22,0.45)] transition-colors hover:text-orange-500'
            >
              <HomeIcon
                icon={NewTwitterIcon}
                size={16}
                className='text-current'
              />
            </a>
            <a
              href='https://token.fun.tv/'
              target='_blank'
              rel='noopener noreferrer'
              className='funapi-interactive-chip rounded-full border border-orange-100 bg-white/80 p-2.5 shadow-[0_12px_28px_-24px_rgba(249,115,22,0.45)] transition-colors hover:text-orange-500'
            >
              <HomeIcon
                icon={LinkSquare02Icon}
                size={16}
                className='text-current'
              />
            </a>
            <a
              href='https://token.fun.tv/'
              className='funapi-interactive-chip rounded-full border border-orange-100 bg-white/80 p-2.5 shadow-[0_12px_28px_-24px_rgba(249,115,22,0.45)] transition-colors hover:text-orange-500'
            >
              <HomeIcon icon={Mail01Icon} size={16} className='text-current' />
            </a>
          </div>
        </div>
        <div className='mt-3'>
          <ProjectAttribution currentYear={currentYear} />
        </div>
      </div>
    </footer>
  )
}
