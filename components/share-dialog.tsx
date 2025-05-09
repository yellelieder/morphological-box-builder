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

export function ShareDialog({ isOpen, onClose, tableData, scenarios, title }: ShareDialogProps) {
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Create data to share
      const shareData = {
        title,
        tableData,
        scenarios,
      }

      // Encode the data
      const encodedData = encodeURIComponent(btoa(JSON.stringify(shareData)))

      // Create the URL with the data as a query parameter
      const url = `${window.location.origin}${window.location.pathname}?data=${encodedData}`

      setShareUrl(url)
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
