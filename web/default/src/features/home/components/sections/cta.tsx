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
import { Link } from '@tanstack/react-router'
import { ArrowRight, BookOpenText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { AnimateInView } from '@/components/animate-in-view'
import { TextType } from '@/components/text-type'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()
  const docsHref = 'https://my.feishu.cn/wiki/ObyEw0lvMi76f2kK558coOHynzP'
  const titleLead = t('立即开始你的')
  const titleAccent = 'AI'
  const titleTail = t('之旅')
  const titleText = `${titleLead}${titleAccent}\n${titleTail}`
  const titleTypingSpeed = 72
  const renderTitleText = (displayedText: string) => {
    const firstLineLength = titleLead.length + titleAccent.length
    const firstLine = displayedText.slice(0, firstLineLength)
    const leadText = firstLine.slice(0, titleLead.length)
    const accentText = firstLine.slice(titleLead.length)
    const tailText =
      displayedText.length > firstLineLength
        ? displayedText.slice(firstLineLength + 1)
        : ''

    return (
      <>
        {leadText}
        {accentText && (
          <span className='funapi-editorial-emphasis mx-3 inline-block'>
            {accentText}
          </span>
        )}
        {displayedText.length > firstLineLength && <br />}
        {tailText}
      </>
    )
  }

  return (
    <section className='relative px-6 pt-4 pb-16 md:pb-20'>
      <AnimateInView
        animation='scale-in'
        className='relative mx-auto max-w-7xl overflow-hidden px-4 py-6 md:px-8 md:py-10'
      >
        <div className='absolute inset-y-0 right-[-8%] hidden w-[56%] rounded-full bg-[radial-gradient(circle,rgba(255,176,83,0.24),transparent_58%)] blur-3xl lg:block' />
        <div className='relative grid gap-8 lg:grid-cols-[0.86fr_1fr] lg:items-center'>
          <div>
            <h2
              className='funapi-editorial-title text-foreground text-[clamp(2.4rem,4vw,4.5rem)]'
              aria-label={`${titleLead} ${titleAccent} ${titleTail}`}
            >
              <TextType
                as='span'
                className='block'
                text={titleText}
                typingSpeed={titleTypingSpeed}
                loop={false}
                hideCursorWhileTyping
                cursorClassName='text-orange-500'
                renderDisplayedText={renderTitleText}
                startOnVisible
                aria-hidden='true'
              />
            </h2>
            <p className='funapi-editorial-body mt-4 max-w-xl text-lg'>
              {t('几分钟完成接入，开启稳定、高效、可观测的 AI 能力')}
            </p>
            <div className='mt-7 flex flex-wrap gap-4'>
              <Button
                size='lg'
                className='h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-base shadow-[0_24px_45px_-22px_rgba(249,115,22,0.82)] hover:from-orange-400 hover:to-orange-500'
                render={
                  <Link
                    to={props.isAuthenticated ? '/dashboard' : '/sign-up'}
                  />
                }
              >
                {props.isAuthenticated
                  ? t('进入控制台')
                  : t('免费获取 API Key')}
                <ArrowRight className='size-4.5' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='h-14 rounded-full border-white/90 bg-white/72 px-7 text-base text-slate-700 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl hover:bg-white'
                render={
                  <a
                    href={docsHref}
                    target='_blank'
                    rel='noopener noreferrer'
                  />
                }
              >
                <BookOpenText className='size-4.5' />
                {t('阅读开发文档')}
              </Button>
            </div>
          </div>
          <div className='relative min-h-[15rem] lg:min-h-[16.5rem]'>
            <div className='absolute inset-x-[8%] top-[20%] bottom-[12%] bg-[radial-gradient(circle_at_center,rgba(255,187,120,0.2),transparent_58%)] blur-3xl' />
            <div className='absolute right-[6%] bottom-[14%] left-[16%] h-[56%] bg-[radial-gradient(ellipse_at_bottom,rgba(255,196,140,0.32),rgba(255,255,255,0)_72%)]' />
            <div className='absolute right-[2%] bottom-[18%] left-[22%] h-[42%] bg-[linear-gradient(115deg,rgba(255,231,210,0),rgba(255,182,110,0.18),rgba(255,255,255,0))] blur-sm' />
            <div className='absolute right-[8%] bottom-[20%] left-[18%] h-px bg-gradient-to-r from-transparent via-orange-200/80 to-transparent' />
            <span className='funapi-orb absolute top-[16%] right-[22%] size-3' />
            <span className='funapi-orb absolute bottom-[18%] left-[18%] size-4' />
            <div className='absolute inset-x-[14%] bottom-[4%] h-[26%] bg-[radial-gradient(ellipse_at_center,rgba(255,184,110,0.28),rgba(255,255,255,0)_70%)] blur-2xl' />
            <div className='absolute inset-x-[22%] bottom-[7%] h-[8%] rounded-full border border-orange-100/80' />
            <div className='absolute inset-x-[28%] bottom-[10%] h-[5%] rounded-full border border-orange-100/70' />
            <div className='absolute inset-x-[18%] inset-y-[12%] flex items-center justify-center'>
              <img
                src='/images/home/funtoken-mark-3d.svg'
                alt='FUN Token'
                className='h-36 w-36 drop-shadow-[0_18px_34px_rgba(249,115,22,0.35)] md:h-44 md:w-44'
              />
            </div>
          </div>
        </div>
      </AnimateInView>
    </section>
  )
}
