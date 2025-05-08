"use client"

import { useState, useEffect } from "react"
import { MorphologicalBox } from "@/components/morphological-box"
import { ScenarioModal } from "@/components/scenario-modal"
import { VariantModal } from "@/components/variant-modal"
import { ClearDialog } from "@/components/clear-dialog"
import { Statistics } from "@/components/statistics"
import { ExportPDF } from "@/components/export-pdf"
import { ImportExport } from "@/components/import-export"
import { HelpModal } from "@/components/help-modal"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Plus, HelpCircle, Save, RotateCcw, Trash2 } from "lucide-react"
import type { Scenario } from "@/types/scenario"
import type { TableData, TableRow } from "@/types/table-data"
import { initialTableData } from "@/data/table-data"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const { toast } = useToast()
  const [tableData, setTableData] = useState<TableData>(initialTableData)
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false)
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false)
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [currentVariant, setCurrentVariant] = useState<TableRow | null>(null)
  const [history, setHistory] = useState<{ tableData: TableData; scenarios: Scenario[] }[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Load data from localStorage on initial load
  useEffect(() => {
    try {
      const savedTableData = localStorage.getItem("morphBoxTableData")
      const savedScenarios = localStorage.getItem("morphBoxScenarios")

      if (savedTableData) {
        setTableData(JSON.parse(savedTableData))
      }

      if (savedScenarios) {
        setScenarios(JSON.parse(savedScenarios))
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error)
    }
  }, [])

  // Save to history when data changes
  useEffect(() => {
    if (tableData.length > 0 || scenarios.length > 0) {
      // Save to localStorage
      localStorage.setItem("morphBoxTableData", JSON.stringify(tableData))
      localStorage.setItem("morphBoxScenarios", JSON.stringify(scenarios))

      // Add to history if it's a new state
      if (historyIndex === history.length - 1 || historyIndex === -1) {
        setHistory([...history.slice(0, historyIndex + 1), { tableData, scenarios }])
        setHistoryIndex(historyIndex + 1)
      }
    }
  }, [tableData, scenarios])

  const handleAddScenario = () => {
    setCurrentScenario(null)
    setIsScenarioModalOpen(true)
  }

  const handleEditScenario = (scenario: Scenario) => {
    setCurrentScenario(scenario)
    setIsScenarioModalOpen(true)
  }

  const handleDuplicateScenario = (scenario: Scenario) => {
    const newScenario = {
      ...scenario,
      id: Date.now().toString(),
      name: `${scenario.name} (Copy)`,
    }
    setScenarios([...scenarios, newScenario])
    toast({
      title: "Scenario duplicated",
      description: `"${scenario.name}" has been duplicated.`,
    })
  }

  const handleSaveScenario = (scenario: Scenario) => {
    if (currentScenario) {
      // Edit existing scenario
      setScenarios(scenarios.map((s) => (s.id === scenario.id ? scenario : s)))
    } else {
      // Add new scenario
      setScenarios([...scenarios, { ...scenario, id: Date.now().toString() }])
    }
    setIsScenarioModalOpen(false)
  }

  const handleDeleteScenario = (id: string) => {
    setScenarios(scenarios.filter((s) => s.id !== id))
    setIsScenarioModalOpen(false)
  }

  const handleAddVariant = () => {
    setCurrentVariant(null)
    setIsVariantModalOpen(true)
  }

  const handleEditVariant = (variant: TableRow) => {
    setCurrentVariant(variant)
    setIsVariantModalOpen(true)
  }

  const handleSaveVariant = (variant: TableRow) => {
    if (currentVariant) {
      // Edit existing variant
      setTableData(tableData.map((v) => (v.name === currentVariant.name ? variant : v)))

      // Update scenarios that use this variant
      const updatedScenarios = scenarios.map((scenario) => {
        const updatedSelections = { ...scenario.selections }

        // If the variant name changed, update the key in selections
        if (variant.name !== currentVariant.name) {
          if (updatedSelections[currentVariant.name]) {
            updatedSelections[variant.name] = updatedSelections[currentVariant.name]
            delete updatedSelections[currentVariant.name]
          }
        }

        // If the selected option no longer exists, reset it to the first option
        if (
          updatedSelections[variant.name] &&
          !variant.options.includes(updatedSelections[variant.name]) &&
          variant.options.length > 0
        ) {
          updatedSelections[variant.name] = variant.options[0]
        }

        return {
          ...scenario,
          selections: updatedSelections,
        }
      })

      setScenarios(updatedScenarios)
    } else {
      // Add new variant
      setTableData([...tableData, variant])

      // Initialize this variant in all scenarios with the first option
      if (variant.options.length > 0) {
        const updatedScenarios = scenarios.map((scenario) => ({
          ...scenario,
          selections: {
            ...scenario.selections,
            [variant.name]: variant.options[0],
          },
        }))
        setScenarios(updatedScenarios)
      }
    }
    setIsVariantModalOpen(false)
  }

  const handleDeleteVariant = (name: string) => {
    setTableData(tableData.filter((v) => v.name !== name))

    // Remove this variant from all scenarios
    const updatedScenarios = scenarios.map((scenario) => {
      const updatedSelections = { ...scenario.selections }
      delete updatedSelections[name]
      return {
        ...scenario,
        selections: updatedSelections,
      }
    })

    setScenarios(updatedScenarios)
    setIsVariantModalOpen(false)
  }

  const handleImportData = (data: { tableData: TableData; scenarios: Scenario[] }) => {
    setTableData(data.tableData)
    setScenarios(data.scenarios)
    toast({
      title: "Data imported",
      description: `Imported ${data.tableData.length} variants and ${data.scenarios.length} scenarios.`,
    })
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      const previousState = history[newIndex]
      setTableData(previousState.tableData)
      setScenarios(previousState.scenarios)
      setHistoryIndex(newIndex)
    }
  }

  const handleSaveToLocalStorage = () => {
    localStorage.setItem("morphBoxTableData", JSON.stringify(tableData))
    localStorage.setItem("morphBoxScenarios", JSON.stringify(scenarios))
    toast({
      title: "Data saved",
      description: "Your morphological box has been saved to local storage.",
    })
  }

  const handleClearAll = () => {
    setIsClearDialogOpen(true)
  }

  const handleConfirmClear = () => {
    setTableData(initialTableData)
    setScenarios([])
    localStorage.removeItem("morphBoxTableData")
    localStorage.removeItem("morphBoxScenarios")
    toast({
      title: "All data cleared",
      description: "Your morphological box has been reset to default.",
    })
  }

  return (
    <main className="container mx-auto p-4 min-h-screen flex flex-col">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Morphological Box Builder</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setIsHelpModalOpen(true)}>
            <HelpCircle className="h-4 w-4 mr-1" />
            Help
          </Button>
        </div>
      </div>

      <Statistics tableData={tableData} scenarios={scenarios} />

      <div className="flex flex-wrap gap-2 mb-4">
        <Button onClick={handleAddScenario} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-1" />
          New Scenario
        </Button>

        <Button onClick={handleAddVariant} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-1" />
          Add Variant
        </Button>

        <ExportPDF tableData={tableData} scenarios={scenarios} />

        <ImportExport tableData={tableData} scenarios={scenarios} onImport={handleImportData} />

        <Button onClick={handleUndo} disabled={historyIndex <= 0} variant="outline">
          <RotateCcw className="h-4 w-4 mr-1" />
          Undo
        </Button>

        <Button onClick={handleSaveToLocalStorage} variant="outline">
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>

        <Button onClick={handleClearAll} variant="outline" className="text-red-600 hover:bg-red-50">
          <Trash2 className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>

      <div className="flex-grow">
        <MorphologicalBox
          tableData={tableData}
          scenarios={scenarios}
          onEditScenario={handleEditScenario}
          onEditVariant={handleEditVariant}
          onDuplicateScenario={handleDuplicateScenario}
        />
      </div>

      <Footer />

      {isScenarioModalOpen && (
        <ScenarioModal
          isOpen={isScenarioModalOpen}
          onClose={() => setIsScenarioModalOpen(false)}
          onSave={handleSaveScenario}
          tableData={tableData}
          scenario={currentScenario}
          onDelete={handleDeleteScenario}
        />
      )}

      {isVariantModalOpen && (
        <VariantModal
          isOpen={isVariantModalOpen}
          onClose={() => setIsVariantModalOpen(false)}
          onSave={handleSaveVariant}
          onDelete={handleDeleteVariant}
          variant={currentVariant}
          existingVariantNames={tableData
            .map((v) => v.name)
            .filter((name) => (currentVariant ? name !== currentVariant.name : true))}
        />
      )}

      {isClearDialogOpen && (
        <ClearDialog
          isOpen={isClearDialogOpen}
          onClose={() => setIsClearDialogOpen(false)}
          onConfirm={handleConfirmClear}
        />
      )}

      {isHelpModalOpen && <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />}
    </main>
  )
}
