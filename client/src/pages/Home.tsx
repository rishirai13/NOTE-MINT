import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { LandingPage } from "@/components/LandingPage";
import { NoteEditor } from "@/components/NoteEditor";
import { NotesList } from "@/components/NotesList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toast, ToastType } from "@/components/Toast";
import { Note } from "@/components/NoteCard";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "note-mint-notes";

function loadNotes(): Note[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Failed to save notes:", error);
  }
}

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  useEffect(() => {
    if (showApp) {
      setNotes(loadNotes());
    }
  }, [showApp]);

  useEffect(() => {
    if (showApp && notes.length > 0) {
      saveNotes(notes);
    }
  }, [notes, showApp]);

  const showToast = (message: string, type: ToastType = "info") => {
    setToast({ message, type });
  };

  const handleSaveNote = (content: string) => {
    if (!content.trim()) return;

    if (editingId) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId
            ? { ...note, content, timestamp: Date.now() }
            : note
        )
      );
      setEditingId(null);
    } else {
      const newNote: Note = {
        id: `${Date.now()}-${Math.random()}`,
        content,
        timestamp: Date.now(),
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    setCurrentNote("");
  };

  const handleEditNote = (note: Note) => {
    setCurrentNote(note.content);
    setEditingId(note.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    showToast("Note deleted", "success");
    
    if (editingId === id) {
      setCurrentNote("");
      setEditingId(null);
    }
  };

  const handleClearEditor = () => {
    setCurrentNote("");
    setEditingId(null);
  };

  if (!showApp) {
    return <LandingPage onEnterApp={() => setShowApp(true)} />;
  }

  return (
    <div className="h-screen flex flex-col">
      <header
        className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 flex items-center justify-between px-4 lg:px-8"
        role="banner"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowApp(false)}
            aria-label="Go to home"
            data-testid="button-go-home"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl lg:text-2xl font-heading font-bold text-foreground">
            NOTE-MINT
          </h1>
        </div>
        <ThemeToggle />
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <NoteEditor
          initialContent={currentNote}
          onSave={handleSaveNote}
          onClear={handleClearEditor}
          showToast={showToast}
        />
        <NotesList
          notes={notes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
