"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Save, Trash2, HelpCircle, FileUp, FileDown, FileImage } from "lucide-react"
import type { TableData } from "@/types/table-data"
import type { Scenario } from "@/types/scenario"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

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
  const [isExporting, setIsExporting] = useState(false)

  const exportToPDF = async () => {
    // Get the morphological box element
    const element = document.querySelector(".relative") as HTMLElement
    if (!element) return

    try {
      setIsExporting(true)

      // Create a canvas from the element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })

      // Calculate dimensions
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Create PDF
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? "portrait" : "landscape",
        unit: "mm",
        format: "a4",
      })

      // Add title
      pdf.setFontSize(16)
      pdf.text(title, 14, 15)

      // Add date
      pdf.setFontSize(10)
      const date = new Date().toLocaleDateString()
      pdf.text(`Exported on: ${date}`, 14, 22)

      // Add scenarios list
      if (scenarios.length > 0) {
        pdf.setFontSize(12)
        pdf.text("Scenarios:", 14, 30)

        pdf.setFontSize(10)
        scenarios.forEach((scenario, index) => {
          pdf.text(`${index + 1}. ${scenario.name}`, 20, 35 + index * 5)
        })
      }

      // Add image of the morphological box
      const imgData = canvas.toDataURL("image/png")
      const yPosition = scenarios.length > 0 ? 40 + scenarios.length * 5 : 30
      pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth - 20, imgHeight)

      // Add footer with credit
      pdf.setFontSize(8)
      pdf.text(
        "Created with morphbox | morphbox.yel.li",
        pdf.internal.pageSize.getWidth() / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: "center" },
      )

      // Save the PDF
      const safeTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      pdf.save(`${safeTitle}.pdf`)
    } catch (error) {
      console.error("PDF export failed:", error)
      alert("PDF export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const exportToImage = async (format: "png" | "jpeg") => {
    // Get the morphological box element
    const element = document.querySelector(".relative") as HTMLElement
    if (!element) return

    try {
      setIsExporting(true)

      // Create a canvas from the element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })

      // Convert to image and download
      const imgData = canvas.toDataURL(`image/${format}`)
      const link = document.createElement("a")
      const safeTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      link.download = `${safeTitle}.${format}`
      link.href = imgData
      link.click()
    } catch (error) {
      console.error(`${format.toUpperCase()} export failed:`, error)
      alert(`${format.toUpperCase()} export failed. Please try again.`)
    } finally {
      setIsExporting(false)
    }
  }

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

        {/* Export Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={onExport}>
              <FileDown className="h-4 w-4 mr-2" />
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportToPDF} disabled={isExporting}>
              <FileDown className="h-4 w-4 mr-2" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportToImage("png")} disabled={isExporting}>
              <FileImage className="h-4 w-4 mr-2" />
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportToImage("jpeg")} disabled={isExporting}>
              <FileImage className="h-4 w-4 mr-2" />
              Export as JPEG
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

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
    </DropdownMenu>
  )
}
