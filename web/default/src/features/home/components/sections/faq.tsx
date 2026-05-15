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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AnimateInView } from '@/components/animate-in-view'

const faqItems = [
  {
    question: 'FUN Token 和普通中转站有什么区别？',
    answer:
      'FUN Token 是企业级大模型 API 网关，并非简单的请求转发。所有上游均对接官方平台、模型原厂或持有合法授权的算力推理服务商，全链路透明可审计，确保合规与稳定性。',
  },
  {
    question: '平台资质如何？API 算力从哪来？',
    answer:
      'FUN Token 是合规运营的企业级 AI 接入平台。算力来源覆盖官方平台与模型原厂直签通道，以及经过资质审核的推理服务商，保障每一次调用都可追溯、可认证。',
  },
  {
    question: '用户数据安全吗？会被存储或训练吗？',
    answer:
      '我们严格遵循零存储隐私协议——不读取、不留存任何对话内容，也不会将数据用于模型训练或其他商业用途。FUN Token 仅承担安全网关角色；使用特定模型时，请同时参阅对应原厂的数据政策。',
  },
  {
    question: '定价策略是怎样的？为什么没有大幅低于官方？',
    answer:
      '我们提供的是正版、足额、无量化阉割的原生算力。刻意压低价格通常伴随质量缩水或合规风险；FUN Token 选择按需计费、透明定价，同时通过规模化采购为用户带来更高并发配额与更低延迟。',
  },
  {
    question: '兼容哪些 API 格式？',
    answer:
      '平台内置协议转换引擎，原生兼容 OpenAI Chat Completions、Anthropic Messages、Google Gemini 等主流格式。无论底层模型来自哪家，均可通过统一接口调用，一键切换无需改代码。',
  },
  {
    question: '可以对接哪些 Coding Agent 和开发工具？',
    answer:
      '几乎所有支持自定义 Base URL 的工具都能直接接入，例如 AionUI、Cherry Studio、Claude Code、OpenClaw、OpenAI Codex CLI 等。填入地址和 API Key 即可开始使用。',
  },
] as const

export function FAQ() {
  const { t } = useTranslation()

  return (
    <section
      id='faq'
      className='relative overflow-hidden px-5 py-12 md:px-6 md:py-16'
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,167,92,0.18),transparent_18rem),radial-gradient(circle_at_100%_100%,rgba(255,139,47,0.16),transparent_20rem),linear-gradient(180deg,#fffaf5_0%,#fffefd_42%,#fff7ef_100%)]' />
      <div className='absolute top-12 right-[8%] hidden h-16 w-16 bg-[radial-gradient(circle,rgba(249,115,22,0.25)_1.8px,transparent_2px)] [background-size:14px_14px] md:block' />
      <div className='absolute bottom-24 left-[7%] hidden h-12 w-16 bg-[radial-gradient(circle,rgba(249,115,22,0.22)_1.7px,transparent_2px)] [background-size:14px_14px] md:block' />
      <div className='absolute top-1/3 right-[9%] size-3 rounded-full bg-orange-400/80 shadow-[0_0_24px_rgba(249,115,22,0.35)]' />
      <div className='absolute bottom-[18%] left-[10%] size-2 rounded-full bg-orange-300/80' />

      <div className='relative mx-auto max-w-6xl'>
        <AnimateInView className='text-center'>
          <div className='mx-auto mb-4 inline-flex items-center gap-3 rounded-full border border-orange-100 bg-white/72 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-[0_14px_38px_-28px_rgba(15,23,42,0.55)] backdrop-blur-xl md:text-base'>
            <img
              src='/images/home/funtoken-mark.svg'
              alt=''
              className='size-5 object-contain'
            />
            <span>{t('FUN Token · FAQ / 常见问题')}</span>
          </div>
          <h2 className='funapi-editorial-title text-foreground text-[clamp(2.25rem,5.2vw,4.4rem)] leading-[1.06]'>
            {t('常见问题解答')}
          </h2>
          <p className='funapi-editorial-body mx-auto mt-4 max-w-3xl text-base text-slate-500 md:text-lg'>
            {t(
              '关于 FUN Token、模型接入、合规与开发支持，你关心的问题都在这里'
            )}
          </p>
        </AnimateInView>

        <AnimateInView
          delay={120}
          animation='fade-up'
          className='mx-auto mt-8 max-w-4xl'
        >
          <Accordion defaultValue='faq-0' className='gap-2.5'>
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className='overflow-hidden rounded-lg border border-slate-200/80 bg-white/86 shadow-[0_20px_54px_-42px_rgba(15,23,42,0.52)] backdrop-blur-xl transition-all data-[open]:border-orange-300 data-[open]:shadow-[0_24px_60px_-42px_rgba(249,115,22,0.42)]'
              >
                <AccordionTrigger className='px-4 py-3.5 text-left hover:no-underline md:px-6 md:py-4 [&_[data-slot=accordion-trigger-icon]]:text-orange-500'>
                  <span className='flex min-w-0 items-center gap-3.5 pr-4'>
                    <span className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm font-semibold text-orange-500 md:size-11 md:text-base'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className='text-base leading-6 font-semibold text-slate-950 md:text-lg'>
                      {t(item.question)}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className='px-4 pb-4 pl-[4.25rem] text-sm leading-7 text-slate-700 md:px-6 md:pb-5 md:pl-[5.75rem] md:text-base'>
                  {t(item.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateInView>
      </div>
    </section>
  )
}
