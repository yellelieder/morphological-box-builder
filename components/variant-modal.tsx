"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus } from "lucide-react"
import type { TableRow } from "@/types/table-data"

interface VariantModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (variant: TableRow) => void
  onDelete: (name: string) => void
  variant: TableRow | null
  existingVariantNames: string[]
}

export function VariantModal({ isOpen, onClose, onSave, onDelete, variant, existingVariantNames }: VariantModalProps) {
  const [name, setName] = useState("")
  const [options, setOptions] = useState<string[]>([])
  const [newOption, setNewOption] = useState("")
  const [nameError, setNameError] = useState("")

  useEffect(() => {
    if (variant) {
      setName(variant.name)
      setOptions([...variant.options])
    } else {
      setName("")
      setOptions([])
    }
    setNameError("")
  }, [variant])

  const handleSave = () => {
    // Validate name
    if (!name.trim()) {
      setNameError("Name cannot be empty.")
      return
    }

    if (existingVariantNames.includes(name)) {
      setNameError("A variant with this name already exists.")
      return
    }

    // Validate options
    if (options.length === 0) {
      setOptions(["Option 1"])
    }

    onSave({
      name,
      options,
    })
  }

  const handleDelete = () => {
    if (variant) {
      onDelete(variant.name)
    }
  }

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()])
      setNewOption("")
    } else {
      // Add a default option name if empty
      const newOptionName = `Option ${options.length + 1}`
      setOptions([...options, newOptionName])
    }
  }

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{variant ? "Edit Variant" : "Add New Variant"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setNameError("")
                }}
                className={nameError ? "border-red-500" : ""}
                placeholder="Variant name"
              />
              {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">Options</Label>
            <div className="col-span-3 space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveOption(index)}
                    disabled={options.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <div className="flex items-center gap-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="New option"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddOption()
                    }
                  }}
                />
                <Button type="button" variant="outline" size="icon" onClick={handleAddOption}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          {variant && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <div>
            <Button variant="outline" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
