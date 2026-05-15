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
import {
  ActivitySparkIcon,
  AiNetworkIcon,
  AnalyticsUpIcon,
  ChartBarBigIcon,
  CheckmarkBadge03Icon,
  CubeIcon,
  FlashIcon,
  LockComputerIcon,
  NewTwitterEllipseIcon,
  SparklesIcon,
} from '@hugeicons/core-free-icons'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'
import { HomeIcon } from '../home-icon'
import { ProviderLogo } from '../provider-logo'

const benefits = [
  {
    icon: FlashIcon,
    title: '极速响应',
    description: '全球加速网络，毫秒级响应，更快的体验，更高的效率',
  },
  {
    icon: CheckmarkBadge03Icon,
    title: '稳定可靠',
    description: '99.9% SLA 保障，智能容灾，业务连续，始终在线',
  },
  {
    icon: CubeIcon,
    title: '统一接口',
    description: '标准化 API 设计，一次接入兼容多模型，简单高效',
  },
  {
    icon: AiNetworkIcon,
    title: '智能路由',
    description: '多维度智能调度，最优路径自动切换，体验更流畅',
  },
  {
    icon: LockComputerIcon,
    title: '企业级安全',
    description: '多重安全防护，数据隔离，合规可控，安心使用',
  },
  {
    icon: AnalyticsUpIcon,
    title: '成本更优',
    description: '规模化资源整合，智能优化降低成本，提升 ROI',
  },
] as const

const useCases = [
  { text: 'Web 应用', icon: NewTwitterEllipseIcon },
  { text: '移动应用', icon: ActivitySparkIcon },
  { text: '后端服务', icon: ChartBarBigIcon },
  { text: 'AI Agent', icon: SparklesIcon },
] as const
const modules = [
  { text: '统一鉴权', icon: CheckmarkBadge03Icon },
  { text: '智能路由', icon: AiNetworkIcon },
  { text: '用量统计', icon: ChartBarBigIcon },
  { text: '安全防护', icon: LockComputerIcon },
] as const
const ecosystems = [
  'DeepSeek',
  '通义千问',
  '智谱 AI',
  '豆包',
  'Kimi',
  'MiniMax',
  '跃问星辰',
] as const

export function Stats() {
  const { t } = useTranslation()

  return (
    <section
      id='why-funapi'
      className='relative scroll-mt-24 overflow-hidden px-6 py-6 md:py-8'
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,180,105,0.16),transparent_28%),linear-gradient(180deg,#ffffff_0%,#fff9f3_100%)]' />
      <div className='relative mx-auto max-w-7xl'>
        <AnimateInView className='mb-5 text-center'>
          <div className='funapi-editorial-kicker mb-2 inline-flex items-center gap-3 text-orange-500'>
            <HomeIcon icon={SparklesIcon} size={16} className='text-current' />
            {t('企业级体验')}
            <HomeIcon icon={SparklesIcon} size={16} className='text-current' />
          </div>
          <h2 className='funapi-editorial-title text-[clamp(2rem,3.6vw,3.45rem)] text-slate-950'>
            {t('为什么选择')}
            <span className='funapi-editorial-emphasis ml-3'>
              {t('FUN Token')}
            </span>
          </h2>
          <p className='funapi-editorial-body mx-auto mt-2 max-w-2xl text-[0.95rem]'>
            {t('企业级基础设施，让开发者专注于创造价值')}
          </p>
        </AnimateInView>

        <div className='grid gap-3.5 md:grid-cols-3'>
          {benefits.slice(0, 3).map((item, index) => (
            <AnimateInView
              key={item.title}
              delay={index * 70}
              className='funapi-interactive-card funapi-glass-panel rounded-[22px] border border-orange-100/80 bg-white/78 p-4 shadow-[0_20px_48px_-38px_rgba(249,115,22,0.42)] backdrop-blur-xl'
            >
              <div className='flex items-start gap-3.5'>
                <div className='flex size-12 shrink-0 items-center justify-center rounded-[18px] border border-orange-100 bg-[radial-gradient(circle,rgba(255,255,255,0.96),rgba(255,240,228,0.9))] text-orange-500 shadow-[0_20px_40px_-32px_rgba(249,115,22,0.65)]'>
                  <HomeIcon
                    icon={item.icon}
                    size={24}
                    className='text-current'
                  />
                </div>
                <div>
                  <h3 className='funapi-editorial-card-title text-[1.28rem] text-slate-900'>
                    {t(item.title)}
                  </h3>
                  <p className='funapi-editorial-body mt-1.5 text-[0.86rem] leading-6'>
                    {t(item.description)}
                  </p>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>

        <div className='mt-3.5 grid gap-3.5 md:grid-cols-3'>
          {benefits.slice(3).map((item, index) => (
            <AnimateInView
              key={item.title}
              delay={(index + 3) * 70}
              className='funapi-interactive-card funapi-glass-panel rounded-[22px] border border-orange-100/80 bg-white/78 p-4 shadow-[0_20px_48px_-38px_rgba(249,115,22,0.42)] backdrop-blur-xl'
            >
              <div className='flex items-start gap-3.5'>
                <div className='flex size-12 shrink-0 items-center justify-center rounded-[18px] border border-orange-100 bg-[radial-gradient(circle,rgba(255,255,255,0.96),rgba(255,240,228,0.9))] text-orange-500 shadow-[0_20px_40px_-32px_rgba(249,115,22,0.65)]'>
                  <HomeIcon
                    icon={item.icon}
                    size={24}
                    className='text-current'
                  />
                </div>
                <div>
                  <h3 className='funapi-editorial-card-title text-[1.28rem] text-slate-900'>
                    {t(item.title)}
                  </h3>
                  <p className='funapi-editorial-body mt-1.5 text-[0.86rem] leading-6'>
                    {t(item.description)}
                  </p>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>

        <AnimateInView
          animation='scale-in'
          className='relative mt-5 overflow-hidden rounded-[28px] border border-orange-100/80 bg-[radial-gradient(circle_at_top,rgba(255,232,210,0.62),rgba(255,255,255,0.8)_38%,rgba(255,255,255,0.92)_100%)] p-4 shadow-[0_28px_76px_-46px_rgba(249,115,22,0.42)] backdrop-blur-xl md:p-5'
        >
          <img
            src='/images/home/funapi-pedestal-stage.svg'
            alt=''
            aria-hidden
            className='pointer-events-none absolute inset-x-[16%] bottom-[-8%] hidden w-[68%] opacity-92 lg:block'
          />
          <svg
            viewBox='0 0 1200 420'
            aria-hidden
            className='funapi-architecture-flow pointer-events-none absolute inset-x-[6%] top-[28%] z-[2] hidden h-[56%] w-[88%] lg:block'
          >
            <defs>
              <linearGradient id='funapi-link-left' x1='0' y1='0' x2='1' y2='0'>
                <stop offset='0' stopColor='rgba(255,255,255,0)' />
                <stop offset='0.55' stopColor='#FFBB78' />
                <stop offset='1' stopColor='#FFD9B8' />
              </linearGradient>
              <linearGradient id='funapi-flow-left' x1='1' y1='0' x2='0' y2='0'>
                <stop offset='0' stopColor='#FFF7ED' stopOpacity='0.1' />
                <stop offset='0.38' stopColor='#FDBA74' stopOpacity='0.72' />
                <stop offset='0.7' stopColor='#FF7A1A' />
                <stop offset='1' stopColor='#FFF2E4' stopOpacity='0.1' />
              </linearGradient>
              <linearGradient
                id='funapi-link-right'
                x1='1'
                y1='0'
                x2='0'
                y2='0'
              >
                <stop offset='0' stopColor='rgba(255,255,255,0)' />
                <stop offset='0.55' stopColor='#FFBB78' />
                <stop offset='1' stopColor='#FFD9B8' />
              </linearGradient>
              <linearGradient
                id='funapi-flow-right'
                x1='0'
                y1='0'
                x2='1'
                y2='0'
              >
                <stop offset='0' stopColor='#FFF7ED' stopOpacity='0.1' />
                <stop offset='0.38' stopColor='#FDBA74' stopOpacity='0.72' />
                <stop offset='0.7' stopColor='#FF7A1A' />
                <stop offset='1' stopColor='#FFF2E4' stopOpacity='0.1' />
              </linearGradient>
              <filter
                id='funapi-link-glow'
                x='0'
                y='0'
                width='1200'
                height='420'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
              >
                <feGaussianBlur stdDeviation='6' />
              </filter>
            </defs>
            <g opacity='0.65' filter='url(#funapi-link-glow)'>
              <path
                d='M170 92C286 92 306 126 440 126'
                stroke='url(#funapi-link-left)'
                strokeWidth='6'
                strokeLinecap='round'
              />
              <path
                d='M170 170C286 170 306 170 440 170'
                stroke='url(#funapi-link-left)'
                strokeWidth='6'
                strokeLinecap='round'
              />
              <path
                d='M170 248C286 248 306 214 440 214'
                stroke='url(#funapi-link-left)'
                strokeWidth='6'
                strokeLinecap='round'
              />
              <path
                d='M760 126C894 126 914 92 1030 92'
                stroke='url(#funapi-link-right)'
                strokeWidth='6'
                strokeLinecap='round'
              />
              <path
                d='M760 170C894 170 914 170 1030 170'
                stroke='url(#funapi-link-right)'
                strokeWidth='6'
                strokeLinecap='round'
              />
              <path
                d='M760 214C894 214 914 248 1030 248'
                stroke='url(#funapi-link-right)'
                strokeWidth='6'
                strokeLinecap='round'
              />
            </g>
            <g opacity='0.95'>
              <path
                d='M170 92C286 92 306 126 440 126'
                stroke='url(#funapi-link-left)'
                strokeWidth='2.4'
                strokeLinecap='round'
              />
              <path
                d='M170 170C286 170 306 170 440 170'
                stroke='url(#funapi-link-left)'
                strokeWidth='2.4'
                strokeLinecap='round'
              />
              <path
                d='M170 248C286 248 306 214 440 214'
                stroke='url(#funapi-link-left)'
                strokeWidth='2.4'
                strokeLinecap='round'
              />
              <path
                d='M760 126C894 126 914 92 1030 92'
                stroke='url(#funapi-link-right)'
                strokeWidth='2.4'
                strokeLinecap='round'
              />
              <path
                d='M760 170C894 170 914 170 1030 170'
                stroke='url(#funapi-link-right)'
                strokeWidth='2.4'
                strokeLinecap='round'
              />
              <path
                d='M760 214C894 214 914 248 1030 248'
                stroke='url(#funapi-link-right)'
                strokeWidth='2.4'
                strokeLinecap='round'
              />
              <circle cx='440' cy='126' r='6.5' fill='#FF9A45' />
              <circle cx='440' cy='170' r='6.5' fill='#FF9A45' />
              <circle cx='440' cy='214' r='6.5' fill='#FF9A45' />
              <circle cx='760' cy='126' r='6.5' fill='#FF9A45' />
              <circle cx='760' cy='170' r='6.5' fill='#FF9A45' />
              <circle cx='760' cy='214' r='6.5' fill='#FF9A45' />
            </g>
            <g className='funapi-link-flow' aria-hidden='true'>
              <path
                className='funapi-flow-line funapi-flow-line-a'
                d='M440 126C306 126 286 92 170 92'
                stroke='url(#funapi-flow-left)'
                strokeWidth='3.6'
                strokeLinecap='round'
              />
              <path
                className='funapi-flow-line funapi-flow-line-b'
                d='M440 170C306 170 286 170 170 170'
                stroke='url(#funapi-flow-left)'
                strokeWidth='3.6'
                strokeLinecap='round'
              />
              <path
                className='funapi-flow-line funapi-flow-line-c'
                d='M440 214C306 214 286 248 170 248'
                stroke='url(#funapi-flow-left)'
                strokeWidth='3.6'
                strokeLinecap='round'
              />
              <path
                className='funapi-flow-line funapi-flow-line-a'
                d='M760 126C894 126 914 92 1030 92'
                stroke='url(#funapi-flow-right)'
                strokeWidth='3.6'
                strokeLinecap='round'
              />
              <path
                className='funapi-flow-line funapi-flow-line-b'
                d='M760 170C894 170 914 170 1030 170'
                stroke='url(#funapi-flow-right)'
                strokeWidth='3.6'
                strokeLinecap='round'
              />
              <path
                className='funapi-flow-line funapi-flow-line-c'
                d='M760 214C894 214 914 248 1030 248'
                stroke='url(#funapi-flow-right)'
                strokeWidth='3.6'
                strokeLinecap='round'
              />
              <circle className='funapi-flow-node' cx='440' cy='126' r='5' />
              <circle className='funapi-flow-node' cx='440' cy='170' r='5' />
              <circle className='funapi-flow-node' cx='440' cy='214' r='5' />
              <circle className='funapi-flow-node' cx='760' cy='126' r='5' />
              <circle className='funapi-flow-node' cx='760' cy='170' r='5' />
              <circle className='funapi-flow-node' cx='760' cy='214' r='5' />
              <circle className='funapi-flow-spark' r='5.5'>
                <animateMotion
                  dur='2.6s'
                  repeatCount='indefinite'
                  path='M440 126C306 126 286 92 170 92'
                />
              </circle>
              <circle className='funapi-flow-spark funapi-flow-spark-b' r='5.5'>
                <animateMotion
                  dur='2.6s'
                  begin='-0.85s'
                  repeatCount='indefinite'
                  path='M440 170C306 170 286 170 170 170'
                />
              </circle>
              <circle className='funapi-flow-spark funapi-flow-spark-c' r='5.5'>
                <animateMotion
                  dur='2.6s'
                  begin='-1.7s'
                  repeatCount='indefinite'
                  path='M440 214C306 214 286 248 170 248'
                />
              </circle>
              <circle className='funapi-flow-spark' r='5.5'>
                <animateMotion
                  dur='2.6s'
                  repeatCount='indefinite'
                  path='M760 126C894 126 914 92 1030 92'
                />
              </circle>
              <circle className='funapi-flow-spark funapi-flow-spark-b' r='5.5'>
                <animateMotion
                  dur='2.6s'
                  begin='-0.85s'
                  repeatCount='indefinite'
                  path='M760 170C894 170 914 170 1030 170'
                />
              </circle>
              <circle className='funapi-flow-spark funapi-flow-spark-c' r='5.5'>
                <animateMotion
                  dur='2.6s'
                  begin='-1.7s'
                  repeatCount='indefinite'
                  path='M760 214C894 214 914 248 1030 248'
                />
              </circle>
            </g>
          </svg>
          <div className='relative z-10 grid gap-4 lg:grid-cols-[1fr_0.72fr_1fr] lg:items-center'>
            <div className='funapi-glass-panel mx-auto w-full max-w-[220px] rounded-[24px] border border-orange-100/80 bg-white/72 p-3.5 shadow-[0_24px_58px_-42px_rgba(249,115,22,0.46)] backdrop-blur-2xl lg:mx-0 lg:justify-self-end'>
              <div className='funapi-editorial-caption mb-3 text-center text-[1rem] font-medium text-slate-950'>
                {t('开发者 / 应用')}
              </div>
              <div className='grid gap-2'>
                {useCases.map((item) => (
                  <button
                    key={item.text}
                    type='button'
                    className='funapi-interactive-chip flex w-full items-center gap-3 rounded-xl border border-orange-50/90 bg-white/76 px-3.5 py-2 text-left text-[0.92rem] text-slate-700 shadow-[0_14px_34px_-30px_rgba(249,115,22,0.48)]'
                  >
                    <HomeIcon
                      icon={item.icon}
                      size={17}
                      className='text-orange-500'
                    />
                    <span>{t(item.text)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className='relative mx-auto w-full max-w-[280px] px-1 py-2'>
              <div className='absolute top-[45%] left-[-0.45rem] hidden size-2.5 rounded-full bg-orange-400 shadow-[0_0_0_4px_rgba(255,255,255,0.75),0_0_18px_rgba(249,115,22,0.38)] lg:block' />
              <div className='absolute top-[45%] right-[-0.45rem] hidden size-2.5 rounded-full bg-orange-400 shadow-[0_0_0_4px_rgba(255,255,255,0.75),0_0_18px_rgba(249,115,22,0.38)] lg:block' />
              <div className='relative rounded-[22px] border border-orange-200/80 bg-white/86 p-3.5 text-center shadow-[0_28px_70px_-38px_rgba(249,115,22,0.5)] backdrop-blur-xl'>
                <div className='relative mx-auto mb-2 h-[2.85rem] w-[2.85rem]'>
                  <img
                    src='/images/home/funtoken-mark-3d.svg'
                    alt=''
                    aria-hidden
                    className='absolute top-[16%] left-[10%] h-[74%] w-[74%] object-contain opacity-24 blur-[10px] saturate-160'
                  />
                  <img
                    src='/images/home/funtoken-mark-3d.svg'
                    alt='FUN Token'
                    className='relative z-10 h-full w-full object-contain drop-shadow-[0_14px_28px_rgba(249,115,22,0.32)]'
                  />
                </div>
                <div className='funapi-editorial-subtitle text-[1rem] text-slate-950'>
                  {t('funtoken 智能网关')}
                </div>
                <div className='mt-2.5 grid gap-1.5'>
                  {modules.map((item) => (
                    <button
                      key={item.text}
                      type='button'
                      className='funapi-interactive-chip flex items-center justify-center gap-2 rounded-lg border border-orange-100/80 bg-white/88 px-3 py-1.5 text-[0.76rem] font-medium text-slate-700 shadow-[0_16px_40px_-34px_rgba(249,115,22,0.5)]'
                    >
                      <HomeIcon
                        icon={item.icon}
                        size={16}
                        className='text-orange-500'
                      />
                      {t(item.text)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className='funapi-glass-panel mx-auto w-full max-w-[200px] rounded-[24px] border border-orange-100/80 bg-white/72 p-3 shadow-[0_24px_58px_-42px_rgba(249,115,22,0.46)] backdrop-blur-2xl lg:mx-0 lg:justify-self-start'>
              <div className='funapi-editorial-caption mb-2.5 text-center text-[0.95rem] font-medium text-slate-950'>
                {t('模型生态')}
              </div>
              <div className='grid gap-1'>
                {ecosystems.map((item) => (
                  <button
                    key={item}
                    type='button'
                    className='funapi-interactive-chip flex w-full items-center gap-2.5 rounded-xl border border-orange-50/90 bg-white/76 px-3 py-1 text-left text-slate-700 shadow-[0_14px_34px_-30px_rgba(249,115,22,0.48)]'
                  >
                    <ProviderLogo
                      provider={item}
                      compact
                      className='w-full justify-start [&>span:last-child]:text-[0.78rem]'
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
