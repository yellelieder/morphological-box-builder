"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { FileUp, FileDown } from "lucide-react"
import type { TableData } from "@/types/table-data"
import type { Scenario } from "@/types/scenario"

interface ImportExportProps {
  tableData: TableData
  scenarios: Scenario[]
  onImport: (data: { tableData: TableData; scenarios: Scenario[] }) => void
}

export function ImportExport({ tableData, scenarios, onImport }: ImportExportProps) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importData, setImportData] = useState("")
  const [importError, setImportError] = useState("")

  const handleExport = () => {
    const data = {
      tableData,
      scenarios,
    }

    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "morphological-box-data.json"
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

      onImport(data)
      setIsImportModalOpen(false)
    } catch (error) {
      setImportError("Invalid JSON format. Please check your data and try again.")
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={handleExport} variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        <Button onClick={() => setIsImportModalOpen(true)} variant="outline">
          <FileUp className="mr-2 h-4 w-4" />
          Import Data
        </Button>
      </div>

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
    </>
  )
}
