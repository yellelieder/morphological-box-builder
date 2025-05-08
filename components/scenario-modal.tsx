"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { TableData } from "@/types/table-data"
import type { Scenario } from "@/types/scenario"

interface ScenarioModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (scenario: Scenario) => void
  onDelete: (id: string) => void
  tableData: TableData
  scenario: Scenario | null
}

export function ScenarioModal({ isOpen, onClose, onSave, onDelete, tableData, scenario }: ScenarioModalProps) {
  const [name, setName] = useState("")
  const [color, setColor] = useState<string>("#3b82f6") // Default blue
  const [selections, setSelections] = useState<Record<string, string>>({})

  useEffect(() => {
    if (scenario) {
      setName(scenario.name || "")
      setColor(scenario.color || "#3b82f6")
      setSelections(scenario.selections || {})
    } else {
      setName("")
      setColor("#3b82f6")

      // Initialize with first option of each row
      const initialSelections: Record<string, string> = {}
      tableData.forEach((row) => {
        if (row.options.length > 0) {
          initialSelections[row.name] = row.options[0]
        }
      })
      setSelections(initialSelections)
    }
  }, [scenario, tableData])

  const handleSave = () => {
    onSave({
      id: scenario?.id || "",
      name,
      color,
      selections,
    })
  }

  const handleDelete = () => {
    if (scenario?.id) {
      onDelete(scenario.id)
      onClose()
    }
  }

  const handleSelectionChange = (rowName: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [rowName]: value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{scenario ? "Edit Scenario" : "New Scenario"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Scenario Name"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <div className="w-10 h-10 rounded-md border border-gray-300" style={{ backgroundColor: color }}></div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Choose Color</Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker color={color} onChange={setColor} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {tableData.map((row) => (
            <div key={row.name} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={row.name} className="text-right">
                {row.name}
              </Label>
              <Select
                value={selections[row.name] || ""}
                onValueChange={(value) => handleSelectionChange(row.name, value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={`Select an option for ${row.name}`} />
                </SelectTrigger>
                <SelectContent>
                  {row.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <DialogFooter className="flex justify-between">
          {scenario && (
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
