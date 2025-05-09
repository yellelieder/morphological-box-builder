"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Save, Trash2, Share2, HelpCircle, FileUp, FileDown } from "lucide-react"

interface MoreMenuProps {
  onSave: () => void
  onClear: () => void
  onShare: () => void
  onHelp: () => void
  onImport: () => void
  onExport: () => void
}

export function MoreMenu({ onSave, onClear, onShare, onHelp, onImport, onExport }: MoreMenuProps) {
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
        <DropdownMenuItem onClick={onExport}>
          <FileDown className="h-4 w-4 mr-2" />
          Export Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share Link
        </DropdownMenuItem>
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
