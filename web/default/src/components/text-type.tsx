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
  createElement,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'
import './text-type.css'

interface VariableSpeed {
  min: number
  max: number
}

export interface TextTypeProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'children'
> {
  text: string | string[]
  as?: ElementType
  typingSpeed?: number
  initialDelay?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  showCursor?: boolean
  hideCursorWhileTyping?: boolean
  cursorCharacter?: ReactNode
  cursorClassName?: string
  cursorBlinkDuration?: number
  textColors?: string[]
  variableSpeed?: VariableSpeed
  renderDisplayedText?: (displayedText: string, index: number) => ReactNode
  onSentenceComplete?: (sentence: string, index: number) => void
  startOnVisible?: boolean
  reverseMode?: boolean
}

export function TextType(props: TextTypeProps) {
  const {
    as: Component = 'div',
    className,
    cursorBlinkDuration = 0.5,
    cursorCharacter = '|',
    cursorClassName,
    deletingSpeed = 30,
    hideCursorWhileTyping = false,
    initialDelay = 0,
    loop = true,
    onSentenceComplete,
    pauseDuration = 2000,
    renderDisplayedText,
    reverseMode = false,
    showCursor = true,
    startOnVisible = false,
    text,
    textColors = [],
    typingSpeed = 50,
    variableSpeed,
    ...containerProps
  } = props
  const [displayedText, setDisplayedText] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnVisible)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const setContainerElement = useCallback((node: HTMLElement | null) => {
    containerRef.current = node
  }, [])

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed

    return (
      Math.random() * (variableSpeed.max - variableSpeed.min) +
      variableSpeed.min
    )
  }, [typingSpeed, variableSpeed])

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (!showCursor) return undefined
    if (!cursorRef.current) return undefined

    gsap.set(cursorRef.current, { opacity: 1 })
    const tween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    })

    return () => {
      tween.kill()
    }
  }, [cursorBlinkDuration, showCursor])

  useEffect(() => {
    if (!isVisible || textArray.length === 0) return undefined

    let timeout: ReturnType<typeof setTimeout> | undefined
    const currentText = textArray[currentTextIndex] ?? ''
    const processedText = reverseMode
      ? currentText.split('').reverse().join('')
      : currentText

    if (isDeleting) {
      if (displayedText === '') {
        if (!loop && currentTextIndex === textArray.length - 1) {
          return undefined
        }

        timeout = setTimeout(() => {
          setIsDeleting(false)
          setCurrentTextIndex((previousIndex) => {
            return (previousIndex + 1) % textArray.length
          })
          setCurrentCharIndex(0)
        }, deletingSpeed)
      } else {
        timeout = setTimeout(() => {
          setDisplayedText((previousText) => previousText.slice(0, -1))
        }, deletingSpeed)
      }
    } else if (currentCharIndex < processedText.length) {
      let delay = typingSpeed

      if (currentCharIndex === 0 && displayedText === '') {
        delay = initialDelay
      } else if (variableSpeed) {
        delay = getRandomSpeed()
      }

      timeout = setTimeout(() => {
        setDisplayedText((previousText) => {
          return previousText + processedText[currentCharIndex]
        })
        setCurrentCharIndex((previousIndex) => previousIndex + 1)
      }, delay)
    } else {
      timeout = setTimeout(() => {
        onSentenceComplete?.(currentText, currentTextIndex)

        if (!loop && currentTextIndex === textArray.length - 1) {
          return
        }

        setIsDeleting(true)
      }, pauseDuration)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [
    currentCharIndex,
    currentTextIndex,
    deletingSpeed,
    displayedText,
    getRandomSpeed,
    initialDelay,
    isDeleting,
    isVisible,
    loop,
    onSentenceComplete,
    pauseDuration,
    reverseMode,
    textArray,
    typingSpeed,
    variableSpeed,
  ])

  const currentTextColor =
    textColors.length > 0
      ? textColors[currentTextIndex % textColors.length]
      : 'inherit'
  const currentText = textArray[currentTextIndex] ?? ''
  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < currentText.length || isDeleting)

  const children = [
    <span
      key='content'
      className='text-type__content'
      style={{ color: currentTextColor || 'inherit' }}
    >
      {renderDisplayedText
        ? renderDisplayedText(displayedText, currentTextIndex)
        : displayedText}
    </span>,
    showCursor && (
      <span
        key='cursor'
        ref={cursorRef}
        className={cn(
          'text-type__cursor',
          cursorClassName,
          shouldHideCursor && 'text-type__cursor--hidden'
        )}
      >
        {cursorCharacter}
      </span>
    ),
  ]
  return createElement(
    Component,
    {
      ...containerProps,
      className: cn('text-type', className),
    },
    <span ref={setContainerElement} className='text-type__inner'>
      {children}
    </span>
  )
}

export default TextType
