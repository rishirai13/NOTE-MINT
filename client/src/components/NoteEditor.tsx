import { useState, useRef, useEffect } from "react";
import { Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import jsPDF from "jspdf";

interface NoteEditorProps {
  initialContent?: string;
  onSave: (content: string) => void;
  onClear?: () => void;
  showToast: (message: string, type: "success" | "info" | "error") => void;
}

export function NoteEditor({ initialContent = "", onSave, onClear, showToast }: NoteEditorProps) {
  const [content, setContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSave = () => {
    if (!content.trim()) {
      showToast("Please write something before saving", "error");
      return;
    }

    onSave(content);
    setContent("");
    showToast("Note saved successfully!", "success");
    
    if (onClear) {
      onClear();
    }
  };

  const handleExportPDF = async () => {
    if (!content.trim()) {
      showToast("Please write something before exporting", "error");
      return;
    }

    try {
      showToast("Generating PDF...", "info");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      const lineHeight = 7;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);

      const lines = pdf.splitTextToSize(content, maxWidth);
      let yPosition = margin;

      for (let i = 0; i < lines.length; i++) {
        if (yPosition + lineHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(lines[i], margin, yPosition);
        yPosition += lineHeight;
      }

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
      const filename = `note-mint-${timestamp}.pdf`;
      
      pdf.save(filename);
      showToast("PDF exported successfully!", "success");
    } catch (error) {
      console.error("PDF export error:", error);
      showToast("Failed to export PDF", "error");
    }
  };

  const sanitizeInput = (input: string): string => {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    setContent(sanitized);
  };

  return (
    <main className="flex-1 flex flex-col p-4 lg:p-8" role="main">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 flex-1">
        <div className="flex-1 flex flex-col">
          <label htmlFor="note-textarea" className="sr-only">
            Write your note here
          </label>
          <Textarea
            ref={textareaRef}
            id="note-textarea"
            value={content}
            onChange={handleContentChange}
            placeholder="Write your note here…"
            className="flex-1 min-h-[300px] lg:min-h-[400px] text-base resize-none focus-visible:ring-2 shadow-sm"
            aria-label="Note editor"
            data-testid="textarea-note"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleSave}
            size="lg"
            className="flex-1 sm:flex-none gap-2"
            disabled={!content.trim()}
            data-testid="button-save-note"
          >
            <Save className="h-5 w-5" />
            Save Note
          </Button>
          <Button
            onClick={handleExportPDF}
            variant="default"
            size="lg"
            className="flex-1 sm:flex-none gap-2"
            disabled={!content.trim()}
            data-testid="button-export-pdf"
          >
            <Download className="h-5 w-5" />
            Save as PDF
          </Button>
        </div>
      </div>
    </main>
  );
}
