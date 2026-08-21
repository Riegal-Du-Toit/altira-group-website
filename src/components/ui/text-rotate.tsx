"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  AnimatePresence,
  type AnimatePresenceProps,
  motion,
  type MotionProps,
  type Transition,
} from "motion/react";

import { cn } from "@/lib/utils";

interface TextRotateProps extends MotionProps {
  texts: string[];
  rotationInterval?: number;
  animatePresenceMode?: AnimatePresenceProps["mode"];
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  transition?: Transition;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "words" | "characters" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

export interface TextRotateRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(function TextRotate(
  {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...props
  },
  ref,
) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitIntoCharacters = (text: string): string[] => {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), ({ segment }) => segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === "characters") {
      return currentText.split(" ").map((word, index, words) => ({
        characters: splitIntoCharacters(word),
        needsSpace: index !== words.length - 1,
      }));
    }
    return splitBy === "words"
      ? currentText.split(" ")
      : splitBy === "lines"
        ? currentText.split("\n")
        : currentText.split(splitBy);
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback((index: number, total: number) => {
    if (staggerFrom === "first") return index * staggerDuration;
    if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
    if (staggerFrom === "center") return Math.abs(Math.floor(total / 2) - index) * staggerDuration;
    if (staggerFrom === "random") return Math.abs(Math.floor(Math.random() * total) - index) * staggerDuration;
    return Math.abs(staggerFrom - index) * staggerDuration;
  }, [staggerFrom, staggerDuration]);

  const changeIndex = useCallback((index: number) => {
    setCurrentTextIndex(index);
    onNext?.(index);
  }, [onNext]);

  const next = useCallback(() => {
    const index = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (index !== currentTextIndex) changeIndex(index);
  }, [changeIndex, currentTextIndex, loop, texts.length]);

  const previous = useCallback(() => {
    const index = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
    if (index !== currentTextIndex) changeIndex(index);
  }, [changeIndex, currentTextIndex, loop, texts.length]);

  const jumpTo = useCallback((index: number) => {
    const validIndex = Math.max(0, Math.min(index, texts.length - 1));
    if (validIndex !== currentTextIndex) changeIndex(validIndex);
  }, [changeIndex, currentTextIndex, texts.length]);

  const reset = useCallback(() => jumpTo(0), [jumpTo]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [jumpTo, next, previous, reset]);

  useEffect(() => {
    if (!auto || texts.length < 2) return;
    const intervalId = window.setInterval(next, rotationInterval);
    return () => window.clearInterval(intervalId);
  }, [auto, next, rotationInterval, texts.length]);

  const words = splitBy === "characters"
    ? elements as WordObject[]
    : (elements as string[]).map((element, index, array) => ({ characters: [element], needsSpace: index !== array.length - 1 }));
  const characterCount = words.reduce((sum, word) => sum + word.characters.length, 0);

  return (
    <motion.span className={cn("flex flex-wrap whitespace-pre-wrap", mainClassName)} {...props} layout transition={transition}>
      <span className="sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span key={currentTextIndex} className={cn("flex flex-wrap", splitBy === "lines" && "w-full flex-col")} layout aria-hidden="true">
          {words.map((word, wordIndex, array) => {
            const previousCharacters = array.slice(0, wordIndex).reduce((sum, item) => sum + item.characters.length, 0);
            return (
              <span key={wordIndex} className={cn("inline-flex", splitLevelClassName)}>
                {word.characters.map((character, characterIndex) => (
                  <motion.span
                    key={characterIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{ ...transition, delay: getStaggerDelay(previousCharacters + characterIndex, characterCount) }}
                    className={cn("inline-block", elementLevelClassName)}
                  >
                    {character}
                  </motion.span>
                ))}
                {word.needsSpace && <span className="whitespace-pre"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

TextRotate.displayName = "TextRotate";

export { TextRotate };
