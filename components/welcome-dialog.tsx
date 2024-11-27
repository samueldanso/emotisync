"use client"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface WelcomeDialogProps {
  companionName: string
  userName: string
  isOpen: boolean
  onClose: () => void
}

export function WelcomeDialog({
  companionName,
  userName,
  isOpen,
  onClose,
}: WelcomeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center gap-6 py-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <DialogTitle className="text-2xl">
              Welcome to EmotiSync, {userName}!
            </DialogTitle>
            <p className="text-brand-muted">
              I'm {companionName}, your personal AI companion for emotional
              well-being
            </p>
          </div>

          <div className="w-full space-y-4 rounded-lg bg-brand-background/50 p-4">
            <div className="space-y-3">
              <h3 className="font-medium">Before we begin:</h3>
              <ul className="space-y-2 text-brand-muted text-sm">
                <li>• Find a quiet space where you can speak freely</li>
                <li>• Express yourself naturally - I'm here to listen</li>
                <li>• Share your thoughts and feelings openly</li>
                <li>• I'll provide personalized insights and support</li>
              </ul>
            </div>
          </div>

          <Button onClick={onClose} className="w-full">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
