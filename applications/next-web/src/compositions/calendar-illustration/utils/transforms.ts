import type { TargetAndTransition } from "motion/react"

interface Skew extends TargetAndTransition {
  rotate: number
  x: number
  y: number
}

export type SkewTuple = [Skew, Skew, Skew]

export const createSkew = (rotate: number, x: number, y: number): Skew => ({
  rotate,
  x,
  y,
})

export const createIdentitySkew = (): Skew => ({ rotate: 0, x: 0, y: 0 })

export const getInitialSkew = (skew: SkewTuple): Skew => skew[0]

export const selectSkewByState = (skew: SkewTuple, emphasized: boolean): Skew => {
  if (emphasized) {
    return skew[2]
  }
  return skew[1]
}

type EasingTuple = readonly [number, number, number, number]

const getStandardEasing = (): EasingTuple => [0.16, 0.85, 0.2, 1]

export const getTransitionConfig = (duration: number) => ({
  duration,
  ease: getStandardEasing(),
})
