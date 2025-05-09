"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, BarChart, PieChart, Activity, Users } from "lucide-react"
import type { TableData } from "@/types/table-data"
import type { Scenario } from "@/types/scenario"
import { useState } from "react"

interface StatisticsProps {
  tableData: TableData
  scenarios: Scenario[]
}

export function Statistics({ tableData, scenarios }: StatisticsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Calculate statistics
  const variantCount = tableData.length
  const totalOptionsCount = tableData.reduce((sum, row) => sum + row.options.length, 0)
  const averageOptionsPerVariant = variantCount > 0 ? (totalOptionsCount / variantCount).toFixed(1) : "0"
  const scenarioCount = scenarios.length

  // Calculate most used options
  const optionUsage: Record<string, number> = {}
  scenarios.forEach((scenario) => {
    Object.entries(scenario.selections).forEach(([variant, option]) => {
      const key = `${variant}: ${option}`
      optionUsage[key] = (optionUsage[key] || 0) + 1
    })
  })

  // Sort by usage count and get top 3
  const topOptions = Object.entries(optionUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  // Calculate theoretical combinations
  const theoreticalCombinations = tableData.reduce((product, row) => {
    return product * (row.options.length || 1)
  }, 1)

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-2 w-full flex justify-between items-center"
      >
        <span className="flex items-center">
          <BarChart className="h-4 w-4 mr-2" />
          Statistics
        </span>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Variants & Options</CardTitle>
              <BarChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{variantCount} variants</div>
              <p className="text-xs text-gray-500">
                {totalOptionsCount} total options ({averageOptionsPerVariant} avg per variant)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Scenarios</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scenarioCount}</div>
              <p className="text-xs text-gray-500">
                Out of {formatNumber(theoreticalCombinations)} possible combinations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Coverage</CardTitle>
              <PieChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {theoreticalCombinations > 0 ? ((scenarioCount / theoreticalCombinations) * 100).toFixed(6) : "0"}%
              </div>
              <p className="text-xs text-gray-500">Of all possible combinations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Most Used Options</CardTitle>
              <Activity className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {topOptions.length > 0 ? (
                  topOptions.map(([option, count], index) => (
                    <div key={index} className="text-xs">
                      <span className="font-medium">{option}</span>
                      <span className="text-gray-500 ml-1">({count})</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-500">No scenarios yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
