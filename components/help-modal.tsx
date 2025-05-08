"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Morphological Box Builder - Help</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">What is a Morphological Box?</h3>
            <p className="text-gray-700">
              A morphological box is a creative problem-solving technique that breaks down a complex problem into its
              components (variants) and possible states (options). It helps visualize different combinations and
              scenarios.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Getting Started</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>
                <strong>Variants and Options:</strong> The table shows different variants (rows) and their possible
                options (columns).
              </li>
              <li>
                <strong>Create Scenarios:</strong> Click "New Scenario" to create a scenario by selecting one option for
                each variant.
              </li>
              <li>
                <strong>Visualize:</strong> Each scenario is represented by a colored line connecting the selected
                options.
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <strong>Add/Edit Variants:</strong> Click "Add Variant" to create new variants or click the edit icon
                next to existing variants.
              </li>
              <li>
                <strong>Manage Scenarios:</strong> Create, edit, duplicate, or delete scenarios to explore different
                combinations.
              </li>
              <li>
                <strong>Export to PDF:</strong> Save your morphological box as a PDF document.
              </li>
              <li>
                <strong>Import/Export Data:</strong> Save your work as JSON and import it later to continue.
              </li>
              <li>
                <strong>Auto-Save:</strong> Your work is automatically saved in your browser's local storage.
              </li>
              <li>
                <strong>Undo:</strong> Made a mistake? Use the Undo button to revert to a previous state.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Tips</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Hover over scenario labels to see their full names if they're truncated.</li>
              <li>Click on a scenario line to quickly edit that scenario.</li>
              <li>Use different colors for scenarios to make them easier to distinguish.</li>
              <li>Export your data regularly as a backup.</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
