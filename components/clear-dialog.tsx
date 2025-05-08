"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle } from "lucide-react"

interface ClearDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ClearDialog({ isOpen, onClose, onConfirm }: ClearDialogProps) {
  const [confirmText, setConfirmText] = useState("")
  const [step, setStep] = useState(1)

  const handleFirstConfirm = () => {
    setStep(2)
  }

  const handleFinalConfirm = () => {
    onConfirm()
    setStep(1)
    setConfirmText("")
    onClose()
  }

  const handleClose = () => {
    setStep(1)
    setConfirmText("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            {step === 1 ? "Clear All Data?" : "Final Confirmation"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <>
            <DialogDescription>
              This will delete all variants, options, and scenarios. This action cannot be undone.
            </DialogDescription>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={handleClose} className="mr-2">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleFirstConfirm}>
                Continue
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogDescription className="mb-4">
              To confirm deletion, please type <strong>DELETE</strong> below:
            </DialogDescription>

            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="mb-4"
            />

            <DialogFooter>
              <Button variant="outline" onClick={handleClose} className="mr-2">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleFinalConfirm} disabled={confirmText !== "DELETE"}>
                Delete Everything
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
