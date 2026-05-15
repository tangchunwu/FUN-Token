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
  type CSSProperties,
  type Key,
  type ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import './logo-loop.css'

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const

type Direction = 'left' | 'right' | 'up' | 'down'

type LogoNodeItem = {
  node: ReactNode
  title?: string
  href?: string
  ariaLabel?: string
}

type LogoImageItem = {
  src: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
  alt?: string
  title?: string
  href?: string
}

export type LogoItem = LogoNodeItem | LogoImageItem

type LogoLoopProps = {
  logos: LogoItem[]
  speed?: number
  direction?: Direction
  width?: number | string
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
  hoverSpeed?: number
  fadeOut?: boolean
  fadeOutColor?: string
  scaleOnHover?: boolean
  renderItem?: (item: LogoItem, key: Key) => ReactNode
  ariaLabel?: string
  className?: string
  style?: CSSProperties
}

type LogoLoopStyle = CSSProperties & {
  '--logoloop-gap': string
  '--logoloop-logoHeight': string
  '--logoloop-fadeColor'?: string
}

const toCssLength = (value?: number | string) =>
  typeof value === 'number' ? `${value}px` : value

function useAnimationLoop(
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean
) {
  const rafRef = useRef<number | null>(null)
  const lastTimestampRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const seqSize = isVertical ? seqHeight : seqWidth

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000
      lastTimestampRef.current = timestamp

      const target =
        isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity
      const easingFactor =
        1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU)
      velocityRef.current += (target - velocityRef.current) * easingFactor

      if (seqSize > 0) {
        const nextOffset = offsetRef.current + velocityRef.current * deltaTime
        offsetRef.current = ((nextOffset % seqSize) + seqSize) % seqSize
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      lastTimestampRef.current = null
    }
  }, [
    hoverSpeed,
    isHovered,
    isVertical,
    seqHeight,
    seqWidth,
    targetVelocity,
    trackRef,
  ])
}

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const seqRef = useRef<HTMLUListElement>(null)

  const [seqWidth, setSeqWidth] = useState(0)
  const [seqHeight, setSeqHeight] = useState(0)
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES)
  const [isHovered, setIsHovered] = useState(false)

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed
    if (pauseOnHover === true) return 0
    if (pauseOnHover === false) return undefined
    return 0
  }, [hoverSpeed, pauseOnHover])

  const isVertical = direction === 'up' || direction === 'down'

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed)
    const directionMultiplier = isVertical
      ? direction === 'up'
        ? 1
        : -1
      : direction === 'left'
        ? 1
        : -1
    const speedMultiplier = speed < 0 ? -1 : 1
    return magnitude * directionMultiplier * speedMultiplier
  }, [direction, isVertical, speed])

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0
    const sequenceRect = seqRef.current?.getBoundingClientRect()
    const sequenceWidth = sequenceRect?.width ?? 0
    const sequenceHeight = sequenceRect?.height ?? 0

    if (isVertical) {
      const parentHeight =
        containerRef.current?.parentElement?.clientHeight ?? 0
      if (containerRef.current && parentHeight > 0) {
        containerRef.current.style.height = `${Math.ceil(parentHeight)}px`
      }

      if (sequenceHeight > 0) {
        setSeqHeight(Math.ceil(sequenceHeight))
        const viewport =
          containerRef.current?.clientHeight || parentHeight || sequenceHeight
        const copiesNeeded =
          Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded))
      }
      return
    }

    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth))
      const copiesNeeded =
        Math.ceil(containerWidth / sequenceWidth) +
        ANIMATION_CONFIG.COPY_HEADROOM
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded))
    }
  }, [isVertical])

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(updateDimensions)

    if (!window.ResizeObserver) {
      window.addEventListener('resize', updateDimensions)
      return () => {
        window.cancelAnimationFrame(animationFrame)
        window.removeEventListener('resize', updateDimensions)
      }
    }

    const observers = [containerRef.current, seqRef.current]
      .filter((element): element is Element => Boolean(element))
      .map((element) => {
        const observer = new ResizeObserver(updateDimensions)
        observer.observe(element)
        return observer
      })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      observers.forEach((observer) => observer.disconnect())
    }
  }, [updateDimensions])

  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? []
    let animationFrame: number | undefined

    const scheduleUpdateDimensions = () => {
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame)
      }
      animationFrame = window.requestAnimationFrame(updateDimensions)
    }

    if (images.length === 0) {
      scheduleUpdateDimensions()
      return () => {
        if (animationFrame !== undefined) {
          window.cancelAnimationFrame(animationFrame)
        }
      }
    }

    let remainingImages = images.length
    const handleImageLoad = () => {
      remainingImages -= 1
      if (remainingImages === 0) scheduleUpdateDimensions()
    }

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad()
      } else {
        img.addEventListener('load', handleImageLoad, { once: true })
        img.addEventListener('error', handleImageLoad, { once: true })
      }
    })

    return () => {
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame)
      }
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad)
        img.removeEventListener('error', handleImageLoad)
      })
    }
  }, [gap, isVertical, logoHeight, logos, updateDimensions])

  useAnimationLoop(
    trackRef,
    targetVelocity,
    seqWidth,
    seqHeight,
    isHovered,
    effectiveHoverSpeed,
    isVertical
  )

  const cssVariables = useMemo<LogoLoopStyle>(
    () => ({
      '--logoloop-gap': `${gap}px`,
      '--logoloop-logoHeight': `${logoHeight}px`,
      ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}),
    }),
    [fadeOutColor, gap, logoHeight]
  )

  const rootClassName = useMemo(
    () =>
      [
        'logoloop',
        isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
        fadeOut && 'logoloop--fade',
        scaleOnHover && 'logoloop--scale-hover',
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [className, fadeOut, isVertical, scaleOnHover]
  )

  const handleMouseEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true)
  }, [effectiveHoverSpeed])

  const handleMouseLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false)
  }, [effectiveHoverSpeed])

  const renderLogoItem = useCallback(
    (item: LogoItem, key: Key) => {
      if (renderItem) {
        return (
          <li className='logoloop__item' key={key} role='listitem'>
            {renderItem(item, key)}
          </li>
        )
      }

      const isNodeItem = 'node' in item
      const content = isNodeItem ? (
        <span
          className='logoloop__node'
          aria-hidden={Boolean(item.href && !item.ariaLabel)}
        >
          {item.node}
        </span>
      ) : (
        <img
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ''}
          title={item.title}
          loading='lazy'
          decoding='async'
          draggable={false}
        />
      )

      const itemAriaLabel = isNodeItem
        ? (item.ariaLabel ?? item.title)
        : (item.alt ?? item.title)
      const itemContent = item.href ? (
        <a
          className='logoloop__link'
          href={item.href}
          aria-label={itemAriaLabel || 'logo link'}
          target='_blank'
          rel='noreferrer noopener'
        >
          {content}
        </a>
      ) : (
        content
      )

      return (
        <li className='logoloop__item' key={key} role='listitem'>
          {itemContent}
        </li>
      )
    },
    [renderItem]
  )

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className='logoloop__list'
          key={`copy-${copyIndex}`}
          role='list'
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, itemIndex) =>
            renderLogoItem(item, `${copyIndex}-${itemIndex}`)
          )}
        </ul>
      )),
    [copyCount, logos, renderLogoItem]
  )

  const containerStyle = useMemo(
    () => ({
      width: isVertical
        ? toCssLength(width) === '100%'
          ? undefined
          : toCssLength(width)
        : toCssLength(width) || '100%',
      ...cssVariables,
      ...style,
    }),
    [cssVariables, isVertical, style, width]
  )

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      style={containerStyle}
      role='region'
      aria-label={ariaLabel}
    >
      <div
        className='logoloop__track'
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {logoLists}
      </div>
    </div>
  )
})
