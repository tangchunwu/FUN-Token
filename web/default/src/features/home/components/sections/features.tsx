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
  Copy01Icon,
} from '@hugeicons/core-free-icons'
import { useTranslation } from 'react-i18next'
import { copyToClipboard } from '@/lib/copy-to-clipboard'
import { AnimateInView } from '@/components/animate-in-view'
import { CountUp } from '../count-up'
import { HomeIcon } from '../home-icon'

const tabs = ['Python', 'Node.js', 'cURL', 'Go'] as const
type CodeTab = (typeof tabs)[number]

const codeSamples: Record<CodeTab, string> = {
  Python: `import requests
import json
base_url = 'https://token.fun.tv/v1'
api_key = 'sk-funtoken-***'
headers = {
  'Authorization': f'Bearer {api_key}',
  'Content-Type': 'application/json'
}
payload = {
  'model': 'funtoken-pro',
  'messages': [{'role': 'user', 'content': '你好，请介绍一下 funtoken。'}],
  'stream': False
}
response = requests.post(f'{base_url}/chat/completions', headers=headers, json=payload)
result = response.json()
print(result['choices'][0]['message']['content'])`,
  'Node.js': `const baseUrl = 'https://token.fun.tv/v1'
const apiKey = 'sk-funtoken-***'

const response = await fetch(\`\${baseUrl}/chat/completions\`, {
  method: 'POST',
  headers: {
    Authorization: \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'funtoken-pro',
    messages: [{ role: 'user', content: '你好，请介绍一下 funtoken。' }],
    stream: false,
  }),
})

const result = await response.json()
console.log(result.choices[0].message.content)`,
  cURL: `curl https://token.fun.tv/v1/chat/completions \\
  -H "Authorization: Bearer sk-funtoken-***" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "funtoken-pro",
    "messages": [
      {
        "role": "user",
        "content": "你好，请介绍一下 funtoken。"
      }
    ],
    "stream": false
  }'`,
  Go: `package main

import (
  "bytes"
  "fmt"
  "io"
  "net/http"
)

func main() {
  baseURL := "https://token.fun.tv/v1"
  apiKey := "sk-funtoken-***"
  payload := []byte(\`{"model":"funtoken-pro","messages":[{"role":"user","content":"你好，请介绍一下 funtoken。"}],"stream":false}\`)

  req, _ := http.NewRequest("POST", baseURL+"/chat/completions", bytes.NewReader(payload))
  req.Header.Set("Authorization", "Bearer "+apiKey)
  req.Header.Set("Content-Type", "application/json")

  resp, _ := http.DefaultClient.Do(req)
  defer resp.Body.Close()
  body, _ := io.ReadAll(resp.Body)
  fmt.Println(string(body))
}`,
}

const metrics = [
  {
    title: '总请求数（今日）',
    from: 0,
    to: 1728329,
    separator: ',',
    suffix: '',
    change: '',
    accent: 'orange',
  },
  {
    title: '成功率（今日）',
    from: 0,
    to: 99.92,
    separator: '',
    suffix: '%',
    change: '↑ 0.12%',
    accent: 'green',
  },
  {
    title: '平均延迟（今日）',
    from: 0,
    to: 382,
    separator: '',
    suffix: 'ms',
    change: '↓ 8.87%',
    accent: 'violet',
  },
  {
    title: '已使用 Tokens（今日）',
    from: 0,
    to: 862320,
    separator: ',',
    suffix: 'K',
    change: '',
    accent: 'orange',
  },
] as const

export function Features() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<CodeTab>('Python')
  const activeCode = codeSamples[activeTab]
  const activeCodeLines = activeCode.split('\n')

  return (
    <section className='relative overflow-hidden px-6 py-10 md:py-12'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,175,90,0.13),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,196,146,0.18),transparent_32%),linear-gradient(180deg,#fffdfb_0%,#fff8f3_100%)]' />
      <div className='relative mx-auto max-w-7xl'>
        <AnimateInView className='mb-6 text-center'>
          <div className='funapi-editorial-kicker mb-2.5 inline-flex items-center gap-3 text-orange-500'>
            <span className='size-2 rounded-full bg-orange-400' />
            {t('为开发者而生')}
            <span className='size-2 rounded-full bg-orange-400' />
          </div>
          <h2 className='funapi-editorial-title text-foreground text-[clamp(1.95rem,3.7vw,3.45rem)]'>
            {t('为')}
            <span className='funapi-editorial-emphasis mx-2'>
              {t('开发者')}
            </span>
            {t('而生')}
          </h2>
          <p className='funapi-editorial-body mx-auto mt-2.5 max-w-2xl text-[0.98rem] md:text-[1.02rem]'>
            {t('极致的开发体验，从接入到监控更高效')}
          </p>
        </AnimateInView>

        <div className='grid gap-4 xl:grid-cols-[1.04fr_0.82fr] xl:items-start'>
          <AnimateInView
            animation='fade-right'
            className='relative self-start overflow-hidden rounded-[24px] border border-slate-900/15 bg-[#18181d] shadow-[0_24px_58px_-38px_rgba(15,23,42,0.82)]'
          >
            <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/80 to-transparent' />
            <div className='flex items-center justify-between border-b border-white/8 px-4 py-2.5'>
              <div className='flex items-center gap-2 text-[0.95rem] text-slate-300'>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type='button'
                    aria-pressed={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`funapi-code-tab rounded-2xl px-3.5 py-1.5 ${activeTab === tab ? 'bg-white/8 text-white shadow-[inset_0_-2px_0_rgb(249,115,22)]' : 'text-slate-400'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button
                type='button'
                onClick={() => void copyToClipboard(activeCode)}
                className='funapi-code-copy rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300'
                aria-label={t('Copy code')}
              >
                <HomeIcon
                  icon={Copy01Icon}
                  size={16}
                  className='text-current'
                />
              </button>
            </div>
            <div className='grid gap-2 px-4 py-2.5 md:grid-cols-[auto_1fr]'>
              <div className='hidden flex-col gap-1 pt-0.5 text-right text-[0.84rem] text-slate-500 md:flex'>
                {activeCodeLines.map((_, index) => (
                  <span key={index}>{index + 1}</span>
                ))}
              </div>
              <pre className='overflow-x-auto text-[0.82rem] leading-[1.52] text-slate-100'>
                <code>
                  {activeCodeLines.map((line, index) => (
                    <div key={index}>
                      {line.includes('https://') ? (
                        <>
                          <span className='text-emerald-300'>
                            {line.slice(0, line.indexOf('https://'))}
                          </span>
                          <span className='text-amber-300'>
                            {line.slice(line.indexOf('https://'))}
                          </span>
                        </>
                      ) : line.includes('Authorization') ? (
                        <>
                          <span className='text-amber-300'>
                            {line.slice(0, line.indexOf('Authorization'))}
                            Authorization
                          </span>
                          <span className='text-emerald-300'>
                            {line.slice(
                              line.indexOf('Authorization') +
                                'Authorization'.length
                            )}
                          </span>
                        </>
                      ) : line.includes('model') &&
                        line.includes('funtoken-pro') ? (
                        <>
                          <span className='text-amber-300'>
                            {line.slice(0, line.indexOf('funtoken-pro'))}
                          </span>
                          <span className='text-emerald-300'>funtoken-pro</span>
                          <span className='text-amber-300'>
                            {line.slice(
                              line.indexOf('funtoken-pro') +
                                'funtoken-pro'.length
                            )}
                          </span>
                        </>
                      ) : line.includes('messages') ? (
                        <>
                          <span className='text-amber-300'>
                            {line.slice(0, line.indexOf('messages'))}
                            messages
                          </span>
                          <span className='text-slate-200'>
                            {line.slice(
                              line.indexOf('messages') + 'messages'.length
                            )}
                          </span>
                        </>
                      ) : line.includes('print(') ||
                        line.includes('console.log') ? (
                        <>
                          <span className='text-violet-300'>
                            {line.includes('print(') ? 'print' : 'console.log'}
                          </span>
                          <span className='text-slate-100'>
                            {line.slice(
                              line.includes('print(')
                                ? 'print'.length
                                : 'console.log'.length
                            )}
                          </span>
                        </>
                      ) : (
                        <span
                          className={
                            line ? 'text-slate-200' : 'text-transparent'
                          }
                        >
                          {line || '.'}
                        </span>
                      )}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
            <div className='pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-[linear-gradient(180deg,transparent,rgba(249,115,22,0.14))]' />
          </AnimateInView>

          <div className='grid gap-3.5 sm:grid-cols-2 xl:grid-cols-2'>
            {metrics.map((item, index) => (
              <AnimateInView
                key={item.title}
                delay={index * 70}
                animation='fade-left'
                className='funapi-interactive-card funapi-glass-panel rounded-[22px] border border-orange-100/80 bg-white/78 p-3.5 shadow-[0_18px_46px_-38px_rgba(249,115,22,0.38)] backdrop-blur-xl'
              >
                <div className='flex items-center gap-2 text-[0.86rem] text-slate-500'>
                  <span
                    className={`size-2.5 rounded-full ${
                      item.accent === 'green'
                        ? 'bg-emerald-400'
                        : item.accent === 'violet'
                          ? 'bg-violet-400'
                          : 'bg-orange-400'
                    }`}
                  />
                  {t(item.title)}
                </div>
                <div className='mt-1.5 flex items-end justify-between gap-2'>
                  <div className='text-foreground text-[1.62rem] font-semibold tracking-tight'>
                    <CountUp
                      from={item.from}
                      to={item.to}
                      separator={item.separator}
                      duration={1.25}
                      delay={index * 0.08}
                      className='tabular-nums'
                    />
                    {item.suffix}
                  </div>
                  {item.change ? (
                    <div
                      className={`pb-0.5 text-[0.84rem] font-medium ${
                        item.accent === 'green'
                          ? 'text-emerald-500'
                          : 'text-violet-500'
                      }`}
                    >
                      {item.change}
                    </div>
                  ) : null}
                </div>
                <div className='relative mt-2 h-16 overflow-hidden rounded-[16px] bg-[linear-gradient(180deg,rgba(255,247,239,0.95),rgba(255,255,255,0.25))]'>
                  <div className='funapi-data-wave absolute inset-0 opacity-35' />
                  <svg viewBox='0 0 220 86' className='h-full w-full'>
                    <path
                      d='M12 58 C30 56, 42 34, 62 40 S95 72, 118 54 148 24, 170 33 195 72, 208 38'
                      fill='none'
                      stroke={
                        item.accent === 'green'
                          ? '#22c55e'
                          : item.accent === 'violet'
                            ? '#8b5cf6'
                            : '#fb923c'
                      }
                      strokeWidth='3'
                      strokeLinecap='round'
                    />
                  </svg>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
