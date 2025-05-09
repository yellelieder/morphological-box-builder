"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Edit, Check } from "lucide-react"

interface TitleInputProps {
  title: string
  onTitleChange: (title: string) => void
}

export function TitleInput({ title, onTitleChange }: TitleInputProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(title)

  useEffect(() => {
    setInputValue(title)
  }, [title])

  const handleSave = () => {
    onTitleChange(inputValue || "Morphological Box")
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setInputValue(title)
      setIsEditing(false)
    }
  }

  return (
    <div className="flex items-center">
      {isEditing ? (
        <div className="flex items-center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-2xl font-bold h-10 mr-2"
            autoFocus
          />
          <button onClick={handleSave} className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
            <Check className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center group">
          <h1 className="text-2xl font-bold mr-2">{title}</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200"
          >
            <Edit className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  )
}
