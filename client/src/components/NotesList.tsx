import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import { NoteCard, Note } from "./NoteCard";
import { SearchBar } from "./SearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NotesList({ notes, onEdit, onDelete }: NotesListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const query = searchQuery.toLowerCase();
    return notes.filter((note) =>
      note.content.toLowerCase().includes(query)
    );
  }, [notes, searchQuery]);

  return (
    <aside
      className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l bg-card flex flex-col"
      role="complementary"
      aria-label="Saved notes"
    >
      <div className="p-4 border-b bg-card sticky top-0 z-10">
        <h2 className="text-lg font-semibold mb-3">Saved Notes</h2>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search notes..."
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">
                {searchQuery ? "No notes found" : "No notes yet"}
              </p>
              {!searchQuery && (
                <p className="text-xs text-muted-foreground mt-1">
                  Start writing to save notes
                </p>
              )}
            </div>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
