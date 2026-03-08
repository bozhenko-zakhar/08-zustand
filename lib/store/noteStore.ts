import { NewNote } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type DraftSore = {
	draft: NewNote;
	setDraft: (note: NewNote) => void;
	clearDraft: () => void
}

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useDraftStore = create<DraftSore>()(persist( (set) => ({
		draft: initialDraft,
		setDraft: (note: NewNote) => set(() => ({draft: note})),
		clearDraft: () => set(() => ({draft: initialDraft}))
	}), {
		name: "draft-note",
		partialize: (state) => ({ draft: state.draft})
	}
))