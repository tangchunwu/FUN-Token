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
import {
  AiNetworkIcon,
  ArrowRight01Icon,
  BookOpen01Icon,
  CheckmarkCircle03Icon,
  GlobeIcon,
  LockComputerIcon,
  SparklesIcon,
  ValidationApprovalIcon,
} from '@hugeicons/core-free-icons'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { HomeIcon } from '../home-icon'
import { LogoLoop, type LogoItem } from '../logo-loop'
import { ProviderLogo } from '../provider-logo'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

const metrics = [
  {
    title: '实时吞吐',
    value: '1,728',
    suffix: 'req/s',
    accent: 'orange',
    rotate: -4,
    floatDelay: 0,
  },
  {
    title: '成功率',
    value: '99.99%',
    suffix: '+0.12%',
    accent: 'green',
    rotate: 4,
    floatDelay: 0.35,
  },
  {
    title: '延迟',
    value: '<100ms',
    suffix: 'P95',
    accent: 'violet',
    rotate: 2.5,
    floatDelay: 0.7,
  },
  {
    title: 'API Status',
    value: 'All Systems',
    suffix: 'Operational',
    accent: 'green',
    rotate: -3,
    floatDelay: 1.05,
  },
] as const

const providers = [
  'DeepSeek',
  '通义千问',
  '智谱 AI',
  '豆包',
  'Kimi',
  'MiniMax',
  '跃问星辰',
  '更多模型',
] as const

const providerLogos: LogoItem[] = providers.map((provider) => ({
  node: (
    <span className='funapi-brand-chip funapi-glass-panel group relative flex h-[3.75rem] min-w-[8.1rem] items-center justify-center overflow-hidden rounded-[20px] border border-orange-100/80 bg-white/82 px-5 text-slate-800 shadow-[0_18px_42px_-34px_rgba(249,115,22,0.5)] backdrop-blur-xl md:min-w-[8.65rem] md:px-5'>
      <span className='funapi-card-shine absolute inset-0 opacity-60' />
      <ProviderLogo provider={provider} className='relative' />
    </span>
  ),
  title: provider,
}))

const highlights = [
  {
    icon: ValidationApprovalIcon,
    text: '99.9% SLA 保障',
  },
  {
    icon: AiNetworkIcon,
    text: '毫秒级响应',
  },
  {
    icon: LockComputerIcon,
    text: '企业级安全合规',
  },
] as const

function HeroMetricCard(props: {
  title: string
  value: string
  suffix: string
  accent: 'orange' | 'green' | 'violet'
  className?: string
  rotate?: number
  floatDelay?: number
}) {
  const accentClass =
    props.accent === 'green'
      ? 'from-orange-500/20 via-orange-500/10 to-transparent text-orange-600'
      : props.accent === 'violet'
        ? 'from-violet-500/20 via-violet-500/10 to-transparent text-violet-600'
        : 'from-orange-500/20 via-orange-500/10 to-transparent text-orange-600'

  return (
    <motion.div
      className={`funapi-floating-card funapi-glass-panel w-40 overflow-hidden rounded-[22px] border border-orange-100/80 bg-white/65 p-3 shadow-[0_28px_72px_-38px_rgba(249,115,22,0.5)] backdrop-blur-[18px] md:w-44 ${props.className ?? ''}`}
      style={
        props.className?.includes('absolute')
          ? { position: 'absolute' }
          : undefined
      }
      initial={{ opacity: 0, y: 16, rotate: props.rotate ?? 0, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: [0, -6, 0],
        rotate: props.rotate ?? 0,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        y: {
          duration: 5.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: props.floatDelay ?? 0,
        },
      }}
    >
      <div className='funapi-card-shine absolute inset-0' />
      <div className='relative flex items-center justify-between'>
        <div className='text-[0.8rem] text-slate-500'>{props.title}</div>
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium ${
            props.accent === 'green'
              ? 'border-orange-200/80 bg-orange-50/80 text-orange-600'
              : props.accent === 'violet'
                ? 'border-violet-200/80 bg-violet-50/80 text-violet-600'
                : 'border-orange-200/80 bg-orange-50/80 text-orange-600'
          }`}
        >
          <span className='size-1.5 rounded-full bg-current' />
          Live
        </span>
      </div>
      <div className='mt-2.5 flex items-end gap-2'>
        <div className='text-[1.55rem] font-semibold tracking-tight text-slate-900 md:text-[1.65rem]'>
          {props.value}
        </div>
        <div className='pb-1 text-sm text-slate-400'>{props.suffix}</div>
      </div>
      <div
        className={`mt-3 h-[3rem] rounded-2xl bg-gradient-to-r ${accentClass} relative overflow-hidden`}
      >
        <div className='funapi-data-wave absolute inset-0 opacity-40' />
        <div className='absolute inset-x-3 bottom-3 h-px bg-white/60' />
        <div className='absolute inset-x-3 top-3 flex items-center justify-between text-[10px] text-slate-400/80'>
          <span>00:00</span>
          <span>12:00</span>
          <span>24:00</span>
        </div>
        <svg
          viewBox='0 0 160 60'
          className='absolute inset-x-3 bottom-2 h-9 w-[calc(100%-24px)]'
          aria-hidden
        >
          <path
            d='M0 38 C16 38, 18 16, 34 19 S52 44, 67 38 85 10, 101 18 118 44, 133 32 148 28, 160 10'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
          />
        </svg>
      </div>
    </motion.div>
  )
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const docsHref = 'https://my.feishu.cn/wiki/ObyEw0lvMi76f2kK558coOHynzP'

  return (
    <section className='relative overflow-hidden px-6 pt-[8rem] pb-6 md:pt-40 md:pb-8'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,155,69,0.2),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(255,207,157,0.28),transparent_30%),radial-gradient(circle_at_50%_68%,rgba(255,214,178,0.18),transparent_28%),linear-gradient(180deg,#fffaf5_0%,#fffdfb_58%,#ffffff_100%)]' />
      <div className='funapi-hero-grid absolute inset-0 opacity-55' />
      <div className='funapi-hero-glow absolute -top-28 right-[8%] h-[28rem] w-[28rem]' />
      <div className='funapi-hero-glow absolute bottom-[-12rem] left-[-8rem] h-[24rem] w-[24rem] opacity-60' />

      <div className='relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-start'>
        <div className='max-w-2xl'>
          <div className='landing-animate-fade-up funapi-editorial-kicker funapi-premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-slate-600'>
            <HomeIcon icon={SparklesIcon} size={16} className='text-current' />
            {t('企业级 AI 接口聚合平台')}
          </div>

          <h1
            className='landing-animate-fade-up funapi-editorial-title mt-6 text-[clamp(3rem,7vw,5.25rem)] text-slate-950'
            style={{ animationDelay: '80ms' }}
          >
            {t('让模型接入，')}
            <br />
            {t('像')}
            <span className='funapi-editorial-emphasis mx-2 not-italic'>{t('风')}</span>
            {t('一样自由')}
          </h1>

          <p
            className='landing-animate-fade-up funapi-editorial-body mt-6 max-w-xl text-lg opacity-0 md:text-[1.28rem]'
            style={{ animationDelay: '160ms' }}
          >
            {t(
              '统一接入全球领先大模型，稳定、低延迟、可观测，帮助企业与开发者更快构建 AI 应用。'
            )}
          </p>

          <div
            className='landing-animate-fade-up mt-8 flex flex-wrap items-center gap-4 opacity-0'
            style={{ animationDelay: '220ms' }}
          >
            {props.isAuthenticated ? (
              <Button
                size='lg'
                className='h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-base shadow-[0_24px_45px_-22px_rgba(249,115,22,0.82)] hover:from-orange-400 hover:to-orange-500'
                render={<Link to='/dashboard' />}
              >
                {t('进入控制台')}
                <HomeIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  className='text-current'
                />
              </Button>
            ) : (
              <Button
                size='lg'
                className='h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-base shadow-[0_24px_45px_-22px_rgba(249,115,22,0.82)] hover:from-orange-400 hover:to-orange-500'
                render={<Link to='/sign-up' />}
              >
                {t('免费获取 API Key')}
                <HomeIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  className='text-current'
                />
              </Button>
            )}
            <Button
              size='lg'
              variant='outline'
              className='h-14 rounded-full border-white/90 bg-white/72 px-7 text-base text-slate-700 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl hover:bg-white'
              render={
                <a href={docsHref} target='_blank' rel='noopener noreferrer' />
              }
            >
              <HomeIcon
                icon={BookOpen01Icon}
                size={18}
                className='text-current'
              />
              {t('阅读开发文档')}
            </Button>
          </div>

          <div
            className='landing-animate-fade-up mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm text-slate-500 opacity-0'
            style={{ animationDelay: '300ms' }}
          >
            {highlights.map((item) => (
              <div key={item.text} className='flex items-center gap-2.5'>
                <span className='flex size-8 items-center justify-center rounded-full border border-orange-100 bg-white/80 text-orange-500 shadow-[0_10px_30px_-20px_rgba(249,115,22,0.8)]'>
                  <HomeIcon
                    icon={item.icon}
                    size={16}
                    className='text-current'
                  />
                </span>
                <span>{t(item.text)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='relative min-h-[30rem] overflow-visible lg:min-h-[31.5rem]'>
          <motion.div
            className='funapi-orbit funapi-orbit-a absolute inset-x-[4%] top-[10%] h-[72%] rounded-full border border-orange-200/45'
            animate={{ opacity: [0.35, 0.72, 0.35], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className='funapi-orbit funapi-orbit-b absolute inset-x-[12%] top-[18%] h-[57%] rounded-full border border-orange-100/55'
            animate={{ opacity: [0.28, 0.58, 0.28], x: [0, -8, 0] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
          />
          <motion.div
            className='funapi-orbit funapi-orbit-c absolute inset-x-[21%] top-[27%] h-[42%] rounded-full border border-orange-100/45'
            animate={{ opacity: [0.22, 0.5, 0.22], x: [0, 6, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
          />
          <div className='funapi-radial-sweep absolute inset-x-[5%] bottom-[3%] h-[50%] rounded-full' />

          <motion.div
            className='absolute right-[-3%] bottom-[1%] z-10 flex aspect-square w-[91%] items-center justify-center md:right-[0%] md:bottom-[1%] md:w-[82%]'
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src='/images/home/funapi-pedestal-stage.svg'
              alt=''
              aria-hidden
              className='absolute inset-x-[-3%] bottom-[-2%] w-[106%] opacity-95'
            />
            <div className='funapi-ring funapi-ring-a absolute inset-x-[10%] top-[35%] bottom-[10%] rounded-full border border-orange-100/45' />
            <div className='funapi-ring funapi-ring-b absolute inset-x-[17%] top-[41%] bottom-[15%] rounded-full border border-orange-200/45' />
            <div className='funapi-ring funapi-ring-c absolute inset-x-[24%] top-[47%] bottom-[20%] rounded-full border border-orange-100/70' />
            <div className='absolute inset-x-[18%] top-[37%] bottom-[18%] rounded-full bg-[radial-gradient(circle,rgba(255,245,236,0.96),rgba(255,255,255,0.08)_62%,transparent_78%)] blur-2xl' />
            <div className='absolute inset-x-[29%] bottom-[20%] h-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,140,56,0.34),rgba(255,255,255,0)_74%)] blur-xl' />
            <div className='absolute top-[10%] left-[46%] h-[76%] w-[57%] -translate-x-1/2'>
              <img
                src='/images/home/funtoken-mark-3d.svg'
                alt=''
                aria-hidden
                className='absolute top-[18%] left-[10%] h-[72%] w-[72%] object-contain opacity-24 blur-[13px] saturate-160'
              />
              <img
                src='/images/home/funtoken-mark-3d.svg'
                alt=''
                aria-hidden
                className='absolute top-[11%] left-[6%] h-[82%] w-[82%] object-contain opacity-38 blur-[4px] saturate-145'
              />
              <img
                src='/images/home/funtoken-mark-3d.svg'
                alt='FUN Token'
                className='relative z-10 h-full w-full object-contain drop-shadow-[0_40px_86px_rgba(249,115,22,0.38)]'
              />
              <div className='absolute inset-x-[26%] bottom-[15%] h-[10%] rounded-full bg-[radial-gradient(circle,rgba(255,145,59,0.48),rgba(255,255,255,0)_72%)] blur-xl' />
            </div>
          </motion.div>

          <HeroMetricCard
            {...metrics[0]}
            className='absolute top-[4%] left-[6%] z-30 hidden md:block'
          />
          <HeroMetricCard
            {...metrics[1]}
            className='absolute top-[15%] right-[9%] z-30 hidden md:block'
          />
          <HeroMetricCard
            {...metrics[2]}
            className='absolute bottom-[5%] left-[9%] z-30 hidden md:block'
          />
          <HeroMetricCard
            {...metrics[3]}
            className='absolute right-[1%] bottom-[15%] z-30 hidden md:w-52 lg:block'
          />

          <div className='absolute inset-0'>
            <span className='funapi-orb absolute top-[12%] left-[38%] size-4' />
            <span className='funapi-orb absolute top-[31%] right-[16%] size-3' />
            <span className='funapi-orb absolute right-[6%] bottom-[28%] size-4' />
            <span className='funapi-orb absolute bottom-[16%] left-[18%] size-3' />
            <span className='absolute top-[44%] left-[18%] rounded-2xl border border-white/60 bg-white/50 p-2 shadow-[0_20px_40px_-28px_rgba(249,115,22,0.6)] backdrop-blur-xl'>
              <HomeIcon
                icon={GlobeIcon}
                size={20}
                className='text-orange-400'
              />
            </span>
            <span className='absolute top-[62%] right-[20%] rounded-2xl border border-white/60 bg-white/50 p-2 shadow-[0_20px_40px_-28px_rgba(249,115,22,0.6)] backdrop-blur-xl'>
              <HomeIcon
                icon={CheckmarkCircle03Icon}
                size={20}
                className='text-orange-500'
              />
            </span>
          </div>
        </div>
      </div>

      <div className='relative mx-auto mt-5 max-w-7xl'>
        <div className='funapi-editorial-kicker mb-4 flex items-center justify-center gap-3 text-orange-500'>
          <span className='size-2 rounded-full bg-orange-400' />
          {t('领先模型生态，持续接入中')}
          <span className='size-2 rounded-full bg-orange-400' />
        </div>
        <div className='relative mx-auto h-[5.25rem] max-w-[calc(100vw-3rem)] py-1'>
          <LogoLoop
            logos={providerLogos}
            speed={70}
            direction='left'
            logoHeight={60}
            gap={14}
            hoverSpeed={12}
            scaleOnHover
            fadeOut
            fadeOutColor='#fffaf5'
            ariaLabel={t('领先模型生态，持续接入中')}
          />
        </div>
      </div>
    </section>
  )
}
