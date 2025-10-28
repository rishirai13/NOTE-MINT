import { NoteEditor } from "../NoteEditor";

export default function NoteEditorExample() {
  return (
    <div className="h-screen flex flex-col">
      <NoteEditor
        onSave={(content) => console.log("Saved:", content)}
        showToast={(message, type) => console.log(`Toast [${type}]:`, message)}
      />
    </div>
  );
}
