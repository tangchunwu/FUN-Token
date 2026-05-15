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
import { useState } from 'react'
import {
  ArrowRight,
  Bot,
  Code2,
  Copy,
  Globe2,
  KeyRound,
  LockKeyhole,
  Mail,
  Send,
  ShieldCheck,
  UserPlus,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { copyToClipboard } from '@/lib/copy-to-clipboard'
import { AnimateInView } from '@/components/animate-in-view'

type QuickStep = {
  number: string
  icon: LucideIcon
  title: string
  description: string
  preview: 'register' | 'key' | 'request'
}

const quickSteps: QuickStep[] = [
  {
    number: '1',
    icon: UserPlus,
    title: '注册账号',
    description: '输入邮箱即可创建账号并进入控制台',
    preview: 'register',
  },
  {
    number: '2',
    icon: KeyRound,
    title: '获取 API Key',
    description: '创建密钥，安全管理访问凭证',
    preview: 'key',
  },
  {
    number: '3',
    icon: Send,
    title: '发起第一个请求',
    description: '复制示例代码，立即完成模型调用',
    preview: 'request',
  },
] as const

const apiKeyPreview = 'sk-funtoken-••••••••••••••••'
const requestPreview = 'curl https://token.fun.tv/v1/chat/completions'

const codeTabs = ['bash', 'Python'] as const
type CodeTab = (typeof codeTabs)[number]

const codeSamples: Record<CodeTab, string> = {
  bash: `curl https://token.fun.tv/v1/chat/completions \\
  -H "Authorization: Bearer $FUNTOKEN_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"funtoken-pro","messages":[{"role":"user","content":"你好，请介绍一下 FUN Token"}]}'`,
  Python: `from openai import OpenAI

client = OpenAI(
    api_key="sk-funtoken-***",
    base_url="https://token.fun.tv/v1",
)

response = client.chat.completions.create(
    model="funtoken-pro",
    messages=[{"role": "user", "content": "你好，请介绍一下 FUN Token"}],
)
print(response.choices[0].message.content)`,
}

const advantages = [
  {
    icon: Bot,
    title: 'OpenAI 兼容',
    description: '无缝对接 OpenAI SDK',
  },
  {
    icon: Globe2,
    title: '标准 REST API',
    description: '简洁规范，轻松集成',
  },
  {
    icon: Code2,
    title: '支持 Python / Node.js / cURL',
    description: '多语言多工具，快速上手',
  },
  {
    icon: ShieldCheck,
    title: '企业级安全',
    description: '数据加密，密钥安全管控',
  },
] as const

function StepPreview({ type }: { type: QuickStep['preview'] }) {
  if (type === 'register') {
    return (
      <div className='mt-7 space-y-3'>
        <div className='flex h-11 items-center gap-3 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-400 shadow-[0_10px_28px_-26px_rgba(15,23,42,0.48)]'>
          <Mail size={18} strokeWidth={1.8} />
          <span>输入邮箱地址</span>
        </div>
        <button
          type='button'
          className='h-11 w-full rounded-md border border-orange-300 bg-white text-sm font-semibold text-orange-500 transition-colors hover:border-orange-400 hover:bg-orange-50'
        >
          开始注册
        </button>
      </div>
    )
  }

  if (type === 'key') {
    return (
      <div className='mt-7 space-y-3'>
        <div className='flex h-12 items-center gap-3 rounded-md border border-orange-100 bg-white px-4 font-mono text-[0.82rem] text-slate-700 shadow-[0_10px_28px_-26px_rgba(15,23,42,0.48)]'>
          <span className='min-w-0 flex-1 truncate'>{apiKeyPreview}</span>
          <button
            type='button'
            onClick={() => void copyToClipboard(apiKeyPreview)}
            className='text-slate-400 transition-colors hover:text-orange-500'
            aria-label='复制 API Key'
          >
            <Copy size={17} strokeWidth={1.9} />
          </button>
        </div>
        <p className='flex items-center justify-center gap-2 text-sm text-slate-500'>
          <span className='inline-flex size-4 items-center justify-center rounded border border-slate-300 text-[10px] text-slate-400'>
            <LockKeyhole size={11} strokeWidth={2} />
          </span>
          API Key 仅显示一次，请妥善保管
        </p>
      </div>
    )
  }

  return (
    <div className='mt-7'>
      <div className='flex h-12 items-center gap-3 rounded-md border border-orange-100 bg-white px-4 font-mono text-[0.72rem] text-slate-700 shadow-[0_10px_28px_-26px_rgba(15,23,42,0.48)]'>
        <span className='min-w-0 flex-1 truncate'>{requestPreview}</span>
        <button
          type='button'
          onClick={() => void copyToClipboard(requestPreview)}
          className='text-slate-400 transition-colors hover:text-orange-500'
          aria-label='复制请求命令'
        >
          <Copy size={17} strokeWidth={1.9} />
        </button>
      </div>
    </div>
  )
}

function QuickStartCode() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<CodeTab>('bash')
  const activeCode = codeSamples[activeTab]
  const lines = activeCode.trimEnd().split('\n')

  return (
    <AnimateInView
      delay={220}
      animation='fade-up'
      className='mt-5 overflow-hidden rounded-xl border border-orange-200/80 bg-white/92 shadow-[0_22px_54px_-40px_rgba(249,115,22,0.5)] backdrop-blur-xl'
    >
      <div className='flex h-10 items-center justify-between border-b border-orange-100 bg-white/75 px-5'>
        <div className='flex flex-1 justify-center gap-8 text-sm'>
          {codeTabs.map((tab) => (
            <button
              key={tab}
              type='button'
              aria-pressed={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-2 py-2 transition-colors ${
                activeTab === tab
                  ? 'font-medium text-orange-500'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
              {activeTab === tab ? (
                <span className='absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-orange-500' />
              ) : null}
            </button>
          ))}
        </div>
        <button
          type='button'
          onClick={() => void copyToClipboard(activeCode)}
          className='inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-500 transition-colors hover:border-orange-200 hover:text-orange-500'
        >
          <Copy size={14} strokeWidth={1.9} />
          {t('复制代码')}
        </button>
      </div>
      <div className='grid gap-3 px-6 py-4 md:grid-cols-[auto_1fr]'>
        <div className='hidden flex-col gap-2 text-right font-mono text-sm leading-6 text-slate-400 md:flex'>
          {lines.map((_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        <pre className='overflow-x-auto font-mono text-sm leading-6 text-slate-700'>
          <code>
            {lines.map((line, index) => (
              <div key={index}>
                <span className='text-orange-500'>
                  {line.trimStart().startsWith('curl')
                    ? line.slice(0, line.indexOf('curl') + 4)
                    : ''}
                </span>
                <span
                  className={
                    line.includes('model') ||
                    line.includes('messages') ||
                    line.includes('content')
                      ? 'text-red-500'
                      : line.includes('Authorization') ||
                          line.includes('Content-Type') ||
                          line.includes('https://')
                        ? 'text-emerald-700'
                        : 'text-slate-700'
                  }
                >
                  {line.trimStart().startsWith('curl')
                    ? line.slice(line.indexOf('curl') + 4)
                    : line || ' '}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </AnimateInView>
  )
}

function AdvantageGrid() {
  const { t } = useTranslation()

  return (
    <div className='mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {advantages.map((item, index) => (
        <AnimateInView
          key={item.title}
          delay={260 + index * 60}
          animation='fade-up'
          className='flex items-center gap-4 rounded-xl border border-orange-100 bg-white/88 p-4 shadow-[0_18px_42px_-36px_rgba(249,115,22,0.46)] backdrop-blur-xl'
        >
          <div className='flex size-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500'>
            <item.icon size={25} strokeWidth={1.8} />
          </div>
          <div className='min-w-0'>
            <h3 className='text-sm font-semibold text-slate-950'>
              {t(item.title)}
            </h3>
            <p className='mt-1 truncate text-xs text-slate-500'>
              {t(item.description)}
            </p>
          </div>
        </AnimateInView>
      ))}
    </div>
  )
}

export function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section
      id='quick-start'
      className='relative overflow-hidden px-5 py-16 md:px-6 md:py-20'
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_5%_5%,rgba(255,119,36,0.1),transparent_16rem),radial-gradient(circle_at_95%_0%,rgba(255,184,122,0.16),transparent_16rem),linear-gradient(180deg,#fffdfb_0%,#ffffff_58%,#fffaf5_100%)]' />
      <div className='absolute top-10 right-0 left-0 h-px bg-gradient-to-r from-transparent via-orange-200/80 to-transparent' />

      <div className='relative mx-auto max-w-7xl'>
        <AnimateInView className='text-center'>
          <div className='funapi-editorial-kicker mb-2 justify-center text-orange-500'>
            {t('FUN Token')}
          </div>
          <h2 className='funapi-editorial-title text-4xl text-slate-950 md:text-5xl'>
            {t('快速接入')}
          </h2>
          <p className='funapi-editorial-body mx-auto mt-3 max-w-2xl text-base text-slate-500 md:text-lg'>
            {t('3 分钟完成接入，开始你的第一个 AI 请求')}
          </p>
        </AnimateInView>

        <div className='mt-10 grid items-stretch gap-4 md:grid-cols-[1fr_2rem_1fr_2rem_1fr] lg:gap-5'>
          {quickSteps.map((step, index) => (
            <div key={step.title} className='contents'>
              <AnimateInView
                delay={index * 80}
                animation='scale-in'
                className='relative min-h-[14.5rem] rounded-xl border border-orange-200/80 bg-white/88 p-6 text-center shadow-[0_22px_54px_-40px_rgba(249,115,22,0.5)] backdrop-blur-xl'
              >
                <div className='absolute top-4 left-4 flex size-8 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white shadow-[0_14px_28px_-18px_rgba(249,115,22,0.85)]'>
                  {step.number}
                </div>
                <div className='mx-auto flex size-16 items-center justify-center rounded-full bg-orange-50 text-orange-500'>
                  <step.icon size={35} strokeWidth={1.8} />
                </div>
                <h3 className='mt-5 text-lg font-semibold text-slate-950'>
                  {t(step.title)}
                </h3>
                <p className='mt-2 text-sm leading-6 text-slate-500'>
                  {t(step.description)}
                </p>
                <StepPreview type={step.preview} />
              </AnimateInView>

              {index < quickSteps.length - 1 ? (
                <div
                  className='hidden items-center justify-center text-orange-500 md:flex'
                  aria-hidden='true'
                >
                  <div className='flex items-center gap-1'>
                    <span className='h-px w-6 border-t-2 border-dotted border-orange-400' />
                    <ArrowRight size={17} strokeWidth={2.2} />
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <QuickStartCode />
        <AdvantageGrid />
      </div>
    </section>
  )
}
