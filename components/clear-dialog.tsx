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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ClearDialogProps {
  isOpen: boolean
  onClose: () => void
  onClearScenarios: () => void
  onClearAll: () => void
}

export function ClearDialog({ isOpen, onClose, onClearScenarios, onClearAll }: ClearDialogProps) {
  const [confirmText, setConfirmText] = useState("")
  const [step, setStep] = useState(1)
  const [clearType, setClearType] = useState<"scenarios" | "all">("scenarios")

  const handleFirstConfirm = () => {
    setStep(2)
  }

  const handleFinalConfirm = () => {
    if (clearType === "scenarios") {
      onClearScenarios()
    } else {
      onClearAll()
    }
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
            {step === 1 ? "Clear Data" : "Final Confirmation"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <>
            <Tabs defaultValue="scenarios" onValueChange={(value) => setClearType(value as "scenarios" | "all")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="scenarios">Clear Scenarios</TabsTrigger>
                <TabsTrigger value="all">Clear Everything</TabsTrigger>
              </TabsList>
              <TabsContent value="scenarios">
                <p className="text-sm text-gray-600 mt-2">
                  This will delete all scenarios but keep your variants and options intact.
                </p>
              </TabsContent>
              <TabsContent value="all">
                <p className="text-sm text-gray-600 mt-2">
                  This will delete all variants, options, and scenarios. Your box will be reset to default.
                </p>
              </TabsContent>
            </Tabs>

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
                {clearType === "scenarios" ? "Delete All Scenarios" : "Delete Everything"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
