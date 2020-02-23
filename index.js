import React, { useState, useEffect, useRef } from 'react'

export const LQIP = props => {
  const {
    mobileThumbSrc,
    desktopThumbSrc,

    mobileSrc,
    desktopSrc,

    mobileBreakPoint = 767,
    desktopBreakPoint = 767,

    alt,
    fallback,

    className,
    style,

    ...others
  } = props

  if (!mobileSrc || !desktopSrc) return null

  const imgEl = useRef(null)
  const [mobile, setMobile] = useState(mobileThumbSrc)
  const [desktop, setDesktop] = useState(desktopThumbSrc)

  useEffect(() => {
    let targetImage = imgEl.current

    let io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (
          window.innerWidth <= mobileBreakPoint &&
          entry.isIntersecting &&
          targetImage.src !== mobileSrc
        ) {
          setMobile(mobileSrc)
          io.unobserve(targetImage)
        }

        if (
          window.innerWidth > desktopBreakPoint &&
          entry.isIntersecting &&
          targetImage.src !== desktopSrc
        ) {
          setDesktop(desktopSrc)
          io.unobserve(targetImage)
        }
      })
    })

    io.observe(targetImage)

    return () => io.unobserve(targetImage)
  }, [])

  return (
    <picture>
      <source media={`(max-width: ${mobileBreakPoint}px)`} srcSet={mobile} />
      <source media={`(min-width: ${desktopBreakPoint}px)`} srcSet={desktop} />

      <img
        ref={imgEl}
        src={fallback}
        alt={alt}
        className={className}
        style={{
          transition: `0.5s filter linear`,
          ...style
        }}
        {...others}
      />
    </picture>
  )
}
