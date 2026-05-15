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
  DeepSeek,
  Doubao,
  Minimax,
  Moonshot,
  Qwen,
  Stepfun,
  Zhipu,
} from '@lobehub/icons'
import { cn } from '@/lib/utils'

type ProviderName =
  | 'DeepSeek'
  | '智谱 AI'
  | '通义千问'
  | '豆包'
  | 'Kimi'
  | 'MiniMax'
  | '跃问星辰'
  | '更多模型'

interface ProviderLogoProps {
  provider: ProviderName
  className?: string
  compact?: boolean
}

function MoreModelsLogo(props: { compact?: boolean }) {
  return (
    <svg
      viewBox='0 0 18 18'
      className={cn(props.compact ? 'h-3.5 w-3.5' : 'h-4 w-4')}
      aria-hidden
    >
      <circle cx='4' cy='9' r='1.35' fill='#9CA3AF' />
      <circle cx='9' cy='9' r='1.35' fill='#9CA3AF' />
      <circle cx='14' cy='9' r='1.35' fill='#9CA3AF' />
    </svg>
  )
}

export function ProviderLogo(props: ProviderLogoProps) {
  const iconClass = props.compact ? 'h-[18px] w-[18px]' : 'h-[22px] w-[22px]'
  const iconSize = props.compact ? 18 : 22
  const labelClass = props.compact
    ? 'text-[0.92rem] font-semibold tracking-[-0.02em]'
    : 'text-[1.02rem] font-semibold tracking-[-0.025em]'
  const iconWrapClass = props.compact ? 'h-5 w-5' : 'h-6 w-6'

  const icon =
    props.provider === 'DeepSeek' ? (
      <DeepSeek.Avatar size={iconSize} className={iconClass} />
    ) : props.provider === '智谱 AI' ? (
      <Zhipu.Avatar size={iconSize} className={iconClass} />
    ) : props.provider === '通义千问' ? (
      <Qwen.Avatar size={iconSize} className={iconClass} />
    ) : props.provider === '豆包' ? (
      <Doubao.Avatar size={iconSize} className={iconClass} />
    ) : props.provider === 'Kimi' ? (
      <Moonshot.Avatar size={iconSize} className={iconClass} />
    ) : props.provider === 'MiniMax' ? (
      <Minimax.Avatar size={iconSize} className={iconClass} />
    ) : props.provider === '跃问星辰' ? (
      <Stepfun.Avatar size={iconSize} className={iconClass} />
    ) : (
      <MoreModelsLogo compact={props.compact} />
    )

  const label =
    props.provider === '更多模型' ? '更多模型' : props.provider

  return (
    <span
      className={cn(
        'inline-flex items-center text-slate-800',
        props.compact ? 'gap-2.5' : 'gap-3',
        props.className
      )}
    >
      <span
        className={cn(
          'flex shrink-0 items-center justify-center',
          iconWrapClass
        )}
      >
        {icon}
      </span>
      <span className={cn('whitespace-nowrap', labelClass)}>{label}</span>
    </span>
  )
}
