"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Save, Trash2, HelpCircle, FileUp, FileDown, FileImage } from "lucide-react"

// Importieren Sie die ExportMenu-Komponente
import { ExportMenu } from "./export-menu"
import type { TableData } from "@/types/table-data"
import type { Scenario } from "@/types/scenario"

// Aktualisieren Sie die Props-Schnittstelle
interface MoreMenuProps {
  onSave: () => void
  onClear: () => void
  onShare: () => void
  onHelp: () => void
  onImport: () => void
  onExport: () => void
  tableData: TableData
  scenarios: Scenario[]
  title: string
}

// Aktualisieren Sie die Komponente, um die ExportMenu-Funktionalität zu integrieren
export function MoreMenu({
  onSave,
  onClear,
  onShare,
  onHelp,
  onImport,
  onExport,
  tableData,
  scenarios,
  title,
}: MoreMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Save to Local Storage
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onImport}>
          <FileUp className="h-4 w-4 mr-2" />
          Import Data
        </DropdownMenuItem>

        {/* Entfernen Sie den Export-Menüpunkt und ersetzen Sie ihn durch ein Untermenü */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full px-2 py-1.5 text-sm flex items-center">
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onExport}>
              <FileDown className="h-4 w-4 mr-2" />
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const exportMenu = document.getElementById("export-pdf-button")
                if (exportMenu) exportMenu.click()
              }}
            >
              <FileDown className="h-4 w-4 mr-2" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const exportMenu = document.getElementById("export-png-button")
                if (exportMenu) exportMenu.click()
              }}
            >
              <FileImage className="h-4 w-4 mr-2" />
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const exportMenu = document.getElementById("export-jpeg-button")
                if (exportMenu) exportMenu.click()
              }}
            >
              <FileImage className="h-4 w-4 mr-2" />
              Export as JPEG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenuItem onClick={onHelp}>
          <HelpCircle className="h-4 w-4 mr-2" />
          Help
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onClear} className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Data
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* Versteckte Buttons für die Export-Funktionen */}
      <div className="hidden">
        <ExportMenu tableData={tableData} scenarios={scenarios} title={title} />
      </div>
    </DropdownMenu>
  )
}
