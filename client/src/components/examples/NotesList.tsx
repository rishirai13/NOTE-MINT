import { NotesList } from "../NotesList";
import { Note } from "../NoteCard";

export default function NotesListExample() {
  const sampleNotes: Note[] = [
    {
      id: "1",
      content: "First note with some interesting content about productivity and time management.",
      timestamp: Date.now() - 120000,
    },
    {
      id: "2",
      content: "Meeting notes: Discuss project timeline, review budget, assign tasks to team members.",
      timestamp: Date.now() - 3600000,
    },
    {
      id: "3",
      content: "Ideas for new features: dark mode toggle, export options, keyboard shortcuts.",
      timestamp: Date.now() - 86400000,
    },
  ];

  return (
    <div className="h-screen">
      <NotesList
        notes={sampleNotes}
        onEdit={(note) => console.log("Edit:", note)}
        onDelete={(id) => console.log("Delete:", id)}
      />
    </div>
  );
}
