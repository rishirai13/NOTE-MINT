import { useState } from "react";
import { Toast } from "../Toast";
import { Button } from "@/components/ui/button";

export default function ToastExample() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <div className="p-8 space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setShowSuccess(true)}>Show Success</Button>
        <Button onClick={() => setShowInfo(true)} variant="secondary">Show Info</Button>
        <Button onClick={() => setShowError(true)} variant="destructive">Show Error</Button>
      </div>
      
      {showSuccess && (
        <Toast
          message="Note saved successfully!"
          type="success"
          onClose={() => setShowSuccess(false)}
        />
      )}
      {showInfo && (
        <Toast
          message="PDF export in progress..."
          type="info"
          onClose={() => setShowInfo(false)}
        />
      )}
      {showError && (
        <Toast
          message="Failed to delete note"
          type="error"
          onClose={() => setShowError(false)}
        />
      )}
    </div>
  );
}
