"use client"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import type { TableData } from "@/types/table-data"
import type { Scenario } from "@/types/scenario"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface ExportPDFProps {
  tableData: TableData
  scenarios: Scenario[]
}

export function ExportPDF({ tableData, scenarios }: ExportPDFProps) {
  const exportToPDF = async () => {
    // Get the morphological box element
    const element = document.querySelector(".relative") as HTMLElement
    if (!element) return

    try {
      // Show loading state
      const button = document.getElementById("export-button")
      if (button) {
        button.textContent = "Exporting..."
        button.setAttribute("disabled", "true")
      }

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
      pdf.text("Morphological Box", 14, 15)

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
        "Created with Morphological Box Builder | yel.li",
        pdf.internal.pageSize.getWidth() / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: "center" },
      )

      // Save the PDF
      pdf.save("morphological-box.pdf")

      // Reset button state
      if (button) {
        button.textContent = "Export PDF"
        button.removeAttribute("disabled")
      }
    } catch (error) {
      console.error("PDF export failed:", error)
      alert("PDF export failed. Please try again.")

      // Reset button state on error
      const button = document.getElementById("export-button")
      if (button) {
        button.textContent = "Export PDF"
        button.removeAttribute("disabled")
      }
    }
  }

  return (
    <Button id="export-button" onClick={exportToPDF} className="bg-green-600 hover:bg-green-700">
      <FileDown className="mr-2 h-4 w-4" />
      Export PDF
    </Button>
  )
}
