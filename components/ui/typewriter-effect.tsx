"use client"

import { cn } from "@/lib/utils"
import { motion, useAnimate, useInView } from "framer-motion"
import { useEffect, useState } from "react"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  cursorImage,
  sentences,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
  cursorImage?: string
  sentences?: {
    text: string
    className?: string
  }[][]
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [displayedChars, setDisplayedChars] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const activeSentence = sentences ? sentences[currentSentenceIndex] : words

  // split text inside of words into array of characters
  const wordsArray = activeSentence.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    }
  })

  const totalChars = wordsArray.reduce((acc, word) => acc + word.text.length, 0)

  const [scope] = useAnimate()
  const isInView = useInView(scope)

  useEffect(() => {
    if (!isInView || isPaused) return

    const typingSpeed = 100 // milliseconds per character
    const deletingSpeed = 50 // faster deletion
    const pauseBeforeDelete = 2000 // pause when fully typed
    const pauseBeforeRetype = 500 // pause when fully deleted

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing forward
          if (displayedChars < totalChars) {
            setDisplayedChars(displayedChars + 1)
          } else {
            setIsPaused(true)
            setTimeout(() => {
              setIsPaused(false)
              setIsDeleting(true)
            }, pauseBeforeDelete)
          }
        } else {
          // Deleting backward
          if (displayedChars > 0) {
            setDisplayedChars(displayedChars - 1)
          } else {
            setIsPaused(true)
            setIsDeleting(false)
            setTimeout(() => {
              if (sentences && sentences.length > 1) {
                setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length)
              }
              setIsPaused(false)
            }, pauseBeforeRetype)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timer)
  }, [isInView, displayedChars, isDeleting, totalChars, sentences, currentSentenceIndex, isPaused])

  const renderWords = () => {
    let charCount = 0
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => {
                const currentCharIndex = charCount++
                const isVisible = currentCharIndex < displayedChars
                return (
                  <span
                    key={`char-${index}`}
                    className={cn(
                      `dark:text-white text-black transition-opacity duration-100`,
                      isVisible ? "opacity-100" : "opacity-0",
                      word.className,
                    )}
                  >
                    {char}
                  </span>
                )
              })}
              &nbsp;
            </div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={cn("text-base sm:text-xl md:text-3xl lg:text-7xl font-bold w-fit", className)}>
      {renderWords()}
      {cursorImage ? (
        <motion.img
          src={cursorImage}
          alt="cursor"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className={cn("inline-block h-4 md:h-6 lg:h-10 w-auto object-contain", cursorClassName)}
        />
      ) : (
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className={cn("inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500", cursorClassName)}
        ></motion.span>
      )}
    </div>
  )
}

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  cursorImage,
  sentences,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
  cursorImage?: string
  sentences?: {
    text: string
    className?: string
  }[][]
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [widthPercent, setWidthPercent] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const activeSentence = sentences ? sentences[currentSentenceIndex] : words

  // split text inside of words into array of characters
  const wordsArray = activeSentence.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    }
  })

  useEffect(() => {
    if (isPaused) return

    const typingDuration = 2000 // 2 seconds to type
    const deletingDuration = 1000 // 1 second to delete
    const pauseBeforeDelete = 2000 // pause when fully typed
    const pauseBeforeRetype = 500 // pause when fully deleted
    const fps = 60
    const frameTime = 1000 / fps

    let animationFrame: NodeJS.Timeout

    const animate = () => {
      if (!isDeleting) {
        // Typing forward
        if (widthPercent < 100) {
          const increment = (100 / typingDuration) * frameTime
          setWidthPercent(Math.min(100, widthPercent + increment))
        } else {
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setIsDeleting(true)
          }, pauseBeforeDelete)
          return
        }
      } else {
        // Deleting backward
        if (widthPercent > 0) {
          const decrement = (100 / deletingDuration) * frameTime
          setWidthPercent(Math.max(0, widthPercent - decrement))
        } else {
          setIsPaused(true)
          setIsDeleting(false)
          setTimeout(() => {
            if (sentences && sentences.length > 1) {
              setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length)
            }
            setIsPaused(false)
          }, pauseBeforeRetype)
          return
        }
      }

      animationFrame = setTimeout(animate, frameTime)
    }

    animationFrame = setTimeout(animate, frameTime)

    return () => clearTimeout(animationFrame)
  }, [widthPercent, isDeleting, sentences, currentSentenceIndex, isPaused])

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span key={`char-${index}`} className={cn(`dark:text-white text-black `, word.className)}>
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn("inline-flex items-center space-x-1 my-6 w-fit", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        animate={{
          width: `${widthPercent}%`,
        }}
        transition={{
          duration: 0,
        }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-7xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      {cursorImage ? (
        <motion.img
          src={cursorImage}
          alt="cursor"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 1,
          }}
          className={cn("block h-4 sm:h-6 xl:h-40 w-auto object-contain", cursorClassName)}
        />
      ) : (
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className={cn("block rounded-sm w-[4px]  h-4 sm:h-6 xl:h-12 bg-blue-500", cursorClassName)}
        ></motion.span>
      )}
    </div>
  )
}
