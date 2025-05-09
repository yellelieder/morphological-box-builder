"use client"

import { useRef, useEffect, useState } from "react"
import { Edit, Copy, MoreHorizontal } from "lucide-react"
import type { TableData } from "@/types/table-data"
import type { Scenario } from "@/types/scenario"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MorphologicalBoxProps {
  tableData: TableData
  scenarios: Scenario[]
  onEditScenario: (scenario: Scenario) => void
  onEditVariant: (variant: { name: string; options: string[] }) => void
  onDuplicateScenario: (scenario: Scenario) => void
}

interface CellPosition {
  x: number
  y: number
  rowName: string
  option: string
}

export function MorphologicalBox({
  tableData,
  scenarios,
  onEditScenario,
  onEditVariant,
  onDuplicateScenario,
}: MorphologicalBoxProps) {
  const tableRef = useRef<HTMLTableElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cellPositions, setCellPositions] = useState<Record<string, CellPosition>>({})
  const [containerHeight, setContainerHeight] = useState(0)
  const [labelWidth, setLabelWidth] = useState(120)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredScenario, setHoveredScenario] = useState<string | null>(null)

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Generate a color for a scenario based on its index
  const getScenarioColor = (index: number) => {
    const colors = [
      "#3b82f6", // blue
      "#22c55e", // green
      "#a855f7", // purple
      "#f97316", // orange
      "#ec4899", // pink
      "#6366f1", // indigo
      "#14b8a6", // teal
      "#eab308", // yellow
      "#ef4444", // red
      "#8b5cf6", // violet
      "#06b6d4", // cyan
      "#84cc16", // lime
    ]
    return colors[index % colors.length]
  }

  // Calculate cell positions after render
  useEffect(() => {
    if (tableRef.current && containerRef.current) {
      const positions: Record<string, CellPosition> = {}

      tableData.forEach((row, rowIndex) => {
        row.options.forEach((option, optionIndex) => {
          const cellId = `${row.name}-${option}`
          const cell = document.getElementById(cellId)

          if (cell) {
            const rect = cell.getBoundingClientRect()
            const tableRect = tableRef.current!.getBoundingClientRect()

            // Calculate center position relative to the table
            positions[cellId] = {
              x: rect.left + rect.width / 2 - tableRect.left,
              y: rect.top + rect.height / 2 - tableRect.top,
              rowName: row.name,
              option: option,
            }
          }
        })
      })

      setCellPositions(positions)

      // Set container height to include space for labels
      setContainerHeight(tableRef.current.offsetHeight + 50)

      // Calculate label width based on container width and number of scenarios
      if (scenarios.length > 0) {
        const availableWidth = containerRef.current.offsetWidth
        setLabelWidth(Math.min(120, availableWidth / scenarios.length - 10))
      }
    }
  }, [tableData, scenarios])

  // Adjust point positions when multiple scenarios select the same cell
  const getAdjustedPoints = () => {
    // Track which cells have multiple points
    const cellCounts: Record<string, number> = {}
    const cellScenarioIndices: Record<string, number[]> = {}

    // Count occurrences of each cell in all scenarios
    scenarios.forEach((scenario, scenarioIndex) => {
      tableData.forEach((row) => {
        const selectedOption = scenario.selections[row.name]
        if (selectedOption) {
          const cellId = `${row.name}-${selectedOption}`
          cellCounts[cellId] = (cellCounts[cellId] || 0) + 1

          if (!cellScenarioIndices[cellId]) {
            cellScenarioIndices[cellId] = []
          }
          cellScenarioIndices[cellId].push(scenarioIndex)
        }
      })
    })

    // Calculate adjusted points for each scenario
    return scenarios.map((scenario, scenarioIndex) => {
      const points: CellPosition[] = []

      tableData.forEach((row) => {
        const selectedOption = scenario.selections[row.name]
        if (selectedOption) {
          const cellId = `${row.name}-${selectedOption}`
          const position = cellPositions[cellId]

          if (position) {
            // If multiple scenarios use this cell, adjust x position
            if (cellCounts[cellId] > 1) {
              const scenarioOrder = cellScenarioIndices[cellId].indexOf(scenarioIndex)
              const offset = (scenarioOrder - (cellCounts[cellId] - 1) / 2) * 15

              points.push({
                ...position,
                x: position.x + offset,
              })
            } else {
              points.push(position)
            }
          }
        }
      })

      // Sort points by their y-coordinate (top to bottom)
      return points.sort((a, b) => a.y - b.y)
    })
  }

  const scenarioPoints = getAdjustedPoints()

  return (
    <div className="relative">
      {/* Labels above the table */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {scenarios.map((scenario, index) => (
          <div
            key={scenario.id}
            className="flex items-center"
            onMouseEnter={() => setHoveredScenario(scenario.id)}
            onMouseLeave={() => setHoveredScenario(null)}
          >
            <div
              className="px-3 py-1 rounded text-white text-center text-sm cursor-pointer truncate"
              style={{
                backgroundColor: scenario.color || getScenarioColor(index),
                width: isMobile ? "auto" : `${labelWidth}px`,
                maxWidth: "150px",
              }}
              onClick={() => onEditScenario(scenario)}
              title={scenario.name}
            >
              {scenario.name}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-1 p-1 rounded-md hover:bg-gray-200">
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onEditScenario(scenario)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDuplicateScenario(scenario)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>

      <div ref={containerRef} className="relative overflow-x-auto border border-gray-200 rounded-lg">
        <table ref={tableRef} className="w-full text-sm text-left">
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white border-b">
                <td className="px-4 py-3 font-medium border-r border-gray-200 relative group bg-gray-50">
                  {row.name}
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onEditVariant(row)}
                  >
                    <Edit className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                  </button>
                </td>
                {row.options.map((option, optionIndex) => (
                  <td
                    key={optionIndex}
                    id={`${row.name}-${option}`}
                    className="px-4 py-3 border-r border-gray-200 text-center relative"
                  >
                    {option}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* SVG overlay for scenario lines and points */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {scenarioPoints.map((points, scenarioIndex) => {
            const scenario = scenarios[scenarioIndex]
            const strokeColor = scenario.color || getScenarioColor(scenarioIndex)
            const fillColor = strokeColor
            const opacity = hoveredScenario === null || hoveredScenario === scenario.id ? 1 : 0.3

            return (
              <g
                key={scenario.id}
                onClick={() => onEditScenario(scenario)}
                style={{ cursor: "pointer", pointerEvents: "auto", opacity, transition: "opacity 0.3s ease" }}
              >
                {/* Draw lines connecting all points */}
                {points.length > 1 && (
                  <polyline
                    points={points.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                )}

                {/* Draw points */}
                {points.map((point, pointIndex) => (
                  <circle
                    key={pointIndex}
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill={fillColor}
                    stroke="white"
                    strokeWidth="1"
                  />
                ))}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
