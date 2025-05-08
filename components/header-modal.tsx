"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface HeaderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (header: string) => void
  currentHeader: string
}

export function HeaderModal({ isOpen, onClose, onSave, currentHeader }: HeaderModalProps) {
  const [header, setHeader] = useState(currentHeader)

  const handleSave = () => {
    onSave(header || "Options")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Table Header</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="header" className="text-right">
              Header
            </Label>
            <Input
              id="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="col-span-3"
              placeholder="Options"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
