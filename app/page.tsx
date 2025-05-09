"use client"

import { useState, useEffect } from "react"
import { MorphologicalBox } from "@/components/morphological-box"
import { ScenarioModal } from "@/components/scenario-modal"
import { VariantModal } from "@/components/variant-modal"
import { ClearDialog } from "@/components/clear-dialog"
import { ShareDialog } from "@/components/share-dialog"
import { Statistics } from "@/components/statistics"
import { MoreMenu } from "@/components/more-menu"
import { TitleInput } from "@/components/title-input"
import { HelpModal } from "@/components/help-modal"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Plus, RotateCcw, Trash2, Share2 } from "lucide-react"
import type { Scenario } from "@/types/scenario"
import type { TableData, TableRow } from "@/types/table-data"
import { defaultData } from "@/data/default-data"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// Hilfsfunktion zur Dekodierung von Base64 zu Unicode
function base64ToUtf8(str: string): string {
  try {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(str), (c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(""),
    )
  } catch (e) {
    console.error("Decoding error:", e)
    return ""
  }
}

export default function Home() {
  const { toast } = useToast()
  const [tableData, setTableData] = useState<TableData>([])
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [title, setTitle] = useState("Morphological Box")
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false)
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [currentVariant, setCurrentVariant] = useState<TableRow | null>(null)
  const [history, setHistory] = useState<{ tableData: TableData; scenarios: Scenario[]; title: string }[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importData, setImportData] = useState("")
  const [importError, setImportError] = useState("")
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  // Load data from localStorage, URL, or default data on initial load
  useEffect(() => {
    if (!isFirstLoad) return

    try {
      // Check if there's data in the URL
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search)
        const sharedData = urlParams.get("data")

        if (sharedData) {
          try {
            // Verwenden Sie die sichere Dekodierungsfunktion
            const decodedData = JSON.parse(base64ToUtf8(sharedData))
            if (decodedData.tableData && decodedData.scenarios) {
              setTableData(decodedData.tableData)
              setScenarios(decodedData.scenarios)
              if (decodedData.title) {
                setTitle(decodedData.title)
                // Update document title
                document.title = `${decodedData.title} | morphbox`
              }
              toast({
                title: "Shared data loaded",
                description: "The shared morphological box has been loaded successfully.",
              })
              setIsFirstLoad(false)
              return
            }
          } catch (error) {
            console.error("Error parsing shared data:", error)
          }
        }
      }

      // If no URL data, try localStorage
      const savedTableData = localStorage.getItem("morphBoxTableData")
      const savedScenarios = localStorage.getItem("morphBoxScenarios")
      const savedTitle = localStorage.getItem("morphBoxTitle")

      if (savedTableData && savedScenarios) {
        setTableData(JSON.parse(savedTableData))
        setScenarios(JSON.parse(savedScenarios))

        if (savedTitle) {
          setTitle(savedTitle)
          // Update document title
          document.title = `${savedTitle} | morphbox`
        }

        setIsFirstLoad(false)
        return
      }

      // If no localStorage data, use default data
      setTableData(defaultData.tableData)
      setScenarios(defaultData.scenarios)
      setTitle(defaultData.title)
      document.title = `${defaultData.title} | morphbox`

      // Save default data to localStorage
      localStorage.setItem("morphBoxTableData", JSON.stringify(defaultData.tableData))
      localStorage.setItem("morphBoxScenarios", JSON.stringify(defaultData.scenarios))
      localStorage.setItem("morphBoxTitle", defaultData.title)

      setIsFirstLoad(false)
    } catch (error) {
      console.error("Error loading data:", error)
      setIsFirstLoad(false)
    }
  }, [isFirstLoad, toast])

  // Update document title when title changes
  useEffect(() => {
    if (typeof document !== "undefined" && !isFirstLoad) {
      document.title = `${title} | morphbox`
    }
  }, [title, isFirstLoad])

  // Save to history when data changes
  useEffect(() => {
    if ((tableData.length > 0 || scenarios.length > 0) && !isFirstLoad) {
      // Save to localStorage
      localStorage.setItem("morphBoxTableData", JSON.stringify(tableData))
      localStorage.setItem("morphBoxScenarios", JSON.stringify(scenarios))
      localStorage.setItem("morphBoxTitle", title)

      // Add to history if it's a new state
      if (historyIndex === history.length - 1 || historyIndex === -1) {
        setHistory([...history.slice(0, historyIndex + 1), { tableData, scenarios, title }])
        setHistoryIndex(historyIndex + 1)
      }
    }
  }, [tableData, scenarios, title, isFirstLoad])

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

  const handleImportData = (data: { tableData: TableData; scenarios: Scenario[]; title?: string }) => {
    setTableData(data.tableData)
    setScenarios(data.scenarios)
    if (data.title) {
      setTitle(data.title)
    }
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
      setTitle(previousState.title)
      setHistoryIndex(newIndex)
    }
  }

  const handleSaveToLocalStorage = () => {
    localStorage.setItem("morphBoxTableData", JSON.stringify(tableData))
    localStorage.setItem("morphBoxScenarios", JSON.stringify(scenarios))
    localStorage.setItem("morphBoxTitle", title)
    toast({
      title: "Data saved",
      description: "Your morphological box has been saved to local storage.",
    })
  }

  const handleClearScenarios = () => {
    setScenarios([])
    localStorage.removeItem("morphBoxScenarios")
    toast({
      title: "Scenarios cleared",
      description: "All scenarios have been deleted.",
    })
  }

  const handleClearAll = () => {
    setTableData([])
    setScenarios([])
    setTitle("Empty Morphological Box") // Titel zurücksetzen
    localStorage.removeItem("morphBoxTableData")
    localStorage.removeItem("morphBoxScenarios")
    localStorage.setItem("morphBoxTitle", "Empty Morphological Box") // Auch im localStorage aktualisieren
    toast({
      title: "All data cleared",
      description: "Your morphological box has been completely cleared.",
    })
  }

  const handleExportData = () => {
    const data = {
      tableData,
      scenarios,
      title,
    }

    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    const safeTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
    a.download = `${safeTitle}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    try {
      setImportError("")
      const data = JSON.parse(importData)

      // Validate data structure
      if (!data.tableData || !Array.isArray(data.tableData) || !data.scenarios || !Array.isArray(data.scenarios)) {
        setImportError("Invalid data format. The file must contain tableData and scenarios arrays.")
        return
      }

      // Validate tableData structure
      for (const row of data.tableData) {
        if (!row.name || !row.options || !Array.isArray(row.options)) {
          setImportError("Invalid variant format. Each variant must have a name and options array.")
          return
        }
      }

      // Validate scenarios structure
      for (const scenario of data.scenarios) {
        if (!scenario.id || !scenario.name || !scenario.selections || typeof scenario.selections !== "object") {
          setImportError("Invalid scenario format. Each scenario must have an id, name, and selections object.")
          return
        }
      }

      handleImportData(data)
      setIsImportModalOpen(false)
    } catch (error) {
      setImportError("Invalid JSON format. Please check your data and try again.")
    }
  }

  if (isFirstLoad) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading morphbox...</h2>
          <p className="text-gray-600">Please wait while we prepare your morphological box.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <main className="container mx-auto p-4 min-h-screen flex flex-col">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <TitleInput title={title} onTitleChange={setTitle} />
          <div className="flex items-center space-x-2">
            <MoreMenu
              onSave={handleSaveToLocalStorage}
              onClear={() => setIsClearDialogOpen(true)}
              onShare={() => setIsShareDialogOpen(true)}
              onHelp={() => setIsHelpModalOpen(true)}
              onImport={() => setIsImportModalOpen(true)}
              onExport={handleExportData}
              tableData={tableData}
              scenarios={scenarios}
              title={title}
            />
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

          <Button onClick={handleUndo} disabled={historyIndex <= 0} variant="outline">
            <RotateCcw className="h-4 w-4 mr-1" />
            Undo
          </Button>

          <Button onClick={() => setIsShareDialogOpen(true)} variant="outline">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>

          <Button onClick={() => setIsClearDialogOpen(true)} variant="outline" className="text-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-1" />
            Clear Data
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
            onClearScenarios={handleClearScenarios}
            onClearAll={handleClearAll}
          />
        )}

        {isShareDialogOpen && (
          <ShareDialog
            isOpen={isShareDialogOpen}
            onClose={() => setIsShareDialogOpen(false)}
            tableData={tableData}
            scenarios={scenarios}
            title={title}
          />
        )}

        {isHelpModalOpen && <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />}

        {isImportModalOpen && (
          <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Import Data</DialogTitle>
              </DialogHeader>

              <div className="py-4">
                <p className="mb-2 text-sm text-gray-600">
                  Paste your JSON data below. The data should contain tableData and scenarios arrays.
                </p>
                <textarea
                  className="w-full h-64 p-2 border border-gray-300 rounded-md"
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder='{"tableData": [...], "scenarios": [...]}'
                />
                {importError && <p className="mt-2 text-sm text-red-500">{importError}</p>}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportModalOpen(false)} className="mr-2">
                  Cancel
                </Button>
                <Button onClick={handleImport} className="bg-blue-600 hover:bg-blue-700">
                  Import
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </>
  )
}
