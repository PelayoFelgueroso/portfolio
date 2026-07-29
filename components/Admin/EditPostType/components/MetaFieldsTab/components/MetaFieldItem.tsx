"use client"

import React, { useRef, useEffect, useCallback } from "react"
import { X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { type MetaField, metaFieldTypes } from "@/schemas/meta-field.schema"

interface MetaFieldItemProps {
  field: MetaField
  index: number
  onChange: <K extends keyof MetaField>(index: number, field: K, value: MetaField[K]) => void
  onRemove: (index: number) => void
  onEnterPress: () => void
  shouldFocus?: boolean
  onFocused?: () => void
}

// Mover formatFieldType fuera del componente
function formatFieldType(type: string): string {
  switch (type) {
    case "string":
      return "Text"
    case "long-string":
      return "Long Text"
    case "number":
      return "Number"
    case "boolean":
      return "Boolean"
    case "date":
      return "Date"
    case "file":
      return "File"
    case "string[]":
      return "String Array"
    case "file[]":
      return "File Array"
    case "url":
      return "URL"
    default:
      return type
  }
}

export const MetaFieldItem = React.memo<MetaFieldItemProps>(({
  field,
  index,
  onChange,
  onRemove,
  onEnterPress,
  shouldFocus = false,
  onFocused,
}: MetaFieldItemProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Efecto para enfocar el input cuando shouldFocus es true
  useEffect(() => {
    if (shouldFocus && nameInputRef.current) {
      nameInputRef.current.focus()
      if (onFocused) {
        onFocused()
      }
    }
  }, [shouldFocus, onFocused])

  // Manejador para la tecla Enter
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onEnterPress()
    }
  }, [onEnterPress])

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index, "name", e.target.value)
  }, [index, onChange])

  const handleLabelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index, "label", e.target.value)
  }, [index, onChange])

  const handleTypeChange = useCallback((value: string) => {
    onChange(index, "type", value as MetaField["type"])
  }, [index, onChange])

  const handleRemove = useCallback(() => {
    onRemove(index)
  }, [index, onRemove])

  return (
    <div className="flex flex-col gap-4 p-4 border border-[#e1e1e1] rounded-md bg-[#f4f4f4] sm:flex-row sm:items-end">
      <div className="flex-1">
        <Label htmlFor={`name-${index}`} className="text100 mb-2 block">
          Field Name
        </Label>
        <Input
          id={`name-${index}`}
          ref={nameInputRef}
          value={field.name}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          placeholder="e.g. featured_image"
          className="border-[#e1e1e1] bg-white"
        />
      </div>

      <div className="flex-1">
        <Label htmlFor={`label-${index}`} className="text100 mb-2 block">
          Display Label
        </Label>
        <Input
          id={`label-${index}`}
          value={field.label}
          onChange={handleLabelChange}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Featured Image"
          className="border-[#e1e1e1] bg-white"
        />
      </div>

      <div className="flex-1">
        <Label htmlFor={`type-${index}`} className="text100 mb-2 block">
          Field Type
        </Label>
        <Select value={field.type} onValueChange={handleTypeChange}>
          <SelectTrigger id={`type-${index}`} className="border-[#e1e1e1] bg-white">
            <SelectValue placeholder="Select field type" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#e1e1e1]">
            {metaFieldTypes.map((type) => (
              <SelectItem
                key={type}
                value={type}
                className="cursor-pointer hover:bg-[#f4f4f5] transition-all duration-100"
              >
                {formatFieldType(type)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="text-red-500 hover:bg-red-50 hover:text-red-600 self-end"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Remove field</span>
      </Button>
    </div>
  )
})

MetaFieldItem.displayName = "MetaFieldItem"
