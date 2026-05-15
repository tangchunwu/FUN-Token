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
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'

type CountUpProps = {
  to: number
  from?: number
  direction?: 'up' | 'down'
  delay?: number
  duration?: number
  className?: string
  startWhen?: boolean
  separator?: string
  onStart?: () => void
  onEnd?: () => void
}

function getDecimalPlaces(num: number) {
  const str = num.toString()

  if (str.includes('.')) {
    const decimals = str.split('.')[1]

    if (Number.parseInt(decimals, 10) !== 0) {
      return decimals.length
    }
  }

  return 0
}

export function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const completedRef = useRef(false)
  const motionValue = useMotionValue(direction === 'down' ? to : from)
  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)
  const springValue = useSpring(motionValue, { damping, stiffness })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  const maxDecimals = useMemo(
    () => Math.max(getDecimalPlaces(from), getDecimalPlaces(to)),
    [from, to]
  )

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0
      const formattedNumber = Intl.NumberFormat('en-US', {
        useGrouping: Boolean(separator),
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      }).format(latest)

      return separator
        ? formattedNumber.replaceAll(',', separator)
        : formattedNumber
    },
    [maxDecimals, separator]
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from)
    }
  }, [direction, formatValue, from, to])

  useEffect(() => {
    if (!isInView || !startWhen) return

    completedRef.current = false
    onStart?.()
    const targetValue = direction === 'down' ? from : to

    const timeoutId = setTimeout(() => {
      motionValue.set(targetValue)
    }, delay * 1000)

    const durationTimeoutId = setTimeout(
      () => {
        motionValue.set(targetValue)
        springValue.set(targetValue)
        completedRef.current = true
        if (ref.current) {
          ref.current.textContent = formatValue(targetValue)
        }
        onEnd?.()
      },
      delay * 1000 + duration * 1000
    )

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(durationTimeoutId)
    }
  }, [
    delay,
    direction,
    duration,
    from,
    isInView,
    motionValue,
    onEnd,
    onStart,
    springValue,
    startWhen,
    to,
    formatValue,
  ])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (completedRef.current) return

      if (ref.current) {
        ref.current.textContent = formatValue(latest)
      }
    })

    return () => unsubscribe()
  }, [formatValue, springValue])

  return <span className={className} ref={ref} />
}
