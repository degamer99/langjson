// src/components/FilterPopup.tsx
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function FilterPopup() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Filters</Button>
      </DialogTrigger>

      <DialogContent
        className={`
          fixed inset-0 flex items-end justify-center
          sm:relative sm:flex-none sm:inset-auto sm:mx-auto sm:mt-20
          bg-white sm:rounded-lg
          w-full sm:w-96 h-[60%] sm:h-auto
          p-6
        `}
      >
        {/* Close button */}
        <DialogClose asChild>
          <button className="absolute top-4 right-4">
            <X className="h-5 w-5" />
          </button>
        </DialogClose>

        {/* Header */}
        <DialogTitle className="text-lg font-semibold mb-2">Filter Items</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground mb-4">
          Refine your search by selecting any of the options below.
        </DialogDescription>

        {/* Your filter controls */}
        <div className="space-y-4 overflow-auto">
          {/* Example filter group */}
          <div>
            <h3 className="font-medium">Category</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Books", "Electronics", "Clothing", "Toys"].map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Another filter group */}
          <div>
            <h3 className="font-medium">Price Range</h3>
            <div className="mt-2 flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 border rounded px-2 py-1"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 border rounded px-2 py-1"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4 flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={() => {/* apply filters */}}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
