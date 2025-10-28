import { NoteCard, Note } from "../NoteCard";

export default function NoteCardExample() {
  const sampleNote: Note = {
    id: "1",
    content: "This is a sample note with some content. It demonstrates how notes will appear in the list with preview text and timestamp.",
    timestamp: Date.now() - 120000,
  };

  return (
    <div className="p-8 max-w-md">
      <NoteCard
        note={sampleNote}
        onEdit={(note) => console.log("Edit note:", note)}
        onDelete={(id) => console.log("Delete note:", id)}
      />
    </div>
  );
}
