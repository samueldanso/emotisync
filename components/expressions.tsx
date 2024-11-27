"use client"
import {
  ExpressionColors,
  isExpressionColor,
} from "@/lib/constants/expression-colors"
import { expressionLabels } from "@/lib/constants/expressions"
import { motion } from "framer-motion"
import type { CSSProperties } from "react"
import * as R from "remeda"

export default function Expressions({
  values,
}: {
  values: Record<string, number>
}) {
  const top3 = R.pipe(
    values,
    R.entries(),
    R.sortBy(R.pathOr([1], 0)),
    R.reverse(),
    R.take(3),
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2"
    >
      {top3.map(([key, value]) => (
        <motion.div
          key={key}
          className="flex items-center gap-1.5 rounded-full bg-muted/50 px-2 py-1 text-xs"
          whileHover={{ scale: 1.05 }}
          style={
            {
              "--bg": isExpressionColor(key)
                ? ExpressionColors[key]
                : "var(--bg)",
            } as CSSProperties
          }
        >
          <div
            className="h-3.5 w-3.5 rounded-full"
            style={{ backgroundColor: "var(--bg)" }}
          />
          <span className="font-medium">{expressionLabels[key]}</span>
          <span className="text-muted-foreground">
            {(value * 100).toFixed(0)}%
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}
