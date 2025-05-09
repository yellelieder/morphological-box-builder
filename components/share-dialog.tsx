"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Copy, Share2 } from "lucide-react"
import type { TableData } from "@/types/table-data"
import type { Scenario } from "@/types/scenario"

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  tableData: TableData
  scenarios: Scenario[]
  title: string
}

// Hilfsfunktion zur korrekten Kodierung von Unicode-Zeichen in Base64
function utf8ToBase64(str: string): string {
  try {
    // Für moderne Browser
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(Number.parseInt(p1, 16))
      }),
    )
  } catch (e) {
    console.error("Encoding error:", e)
    return ""
  }
}

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

export function ShareDialog({ isOpen, onClose, tableData, scenarios, title }: ShareDialogProps) {
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      try {
        // Create data to share
        const shareData = {
          title,
          tableData,
          scenarios,
        }

        // Encode the data using our safe UTF-8 to Base64 conversion
        const encodedData = utf8ToBase64(JSON.stringify(shareData))

        // Create the URL with the data as a query parameter
        const url = `${window.location.origin}${window.location.pathname}?data=${encodedData}`

        setShareUrl(url)
      } catch (error) {
        console.error("Error creating share URL:", error)
        setShareUrl("Error creating share URL. Please try again.")
      }
    }
  }, [isOpen, tableData, scenarios, title])

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Share2 className="h-5 w-5 mr-2" />
            Share Your Morphological Box
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <p className="text-sm text-gray-600">
            Share this link with others to show them your morphological box. The link contains all your variants,
            options, and scenarios.
          </p>

          <div className="flex items-center space-x-2">
            <Input
              value={shareUrl}
              readOnly
              className="font-mono text-xs"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <Button onClick={handleCopy} variant="outline" size="icon">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <p className="text-xs text-gray-500">
            Note: This link contains all your data. Anyone with this link can view and edit your morphological box.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
