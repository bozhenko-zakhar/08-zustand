import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes, fetchNotesByCategory } from '@/lib/api';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';

type Props = {
	params: Promise<{slug: string[]}>;
}

export default async function Notes({params}: Props) {
	const { slug } = await params;
	const category = slug[0] === 'all' ? undefined : slug[0] as NoteTag

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['notes', "", 1, category],
		queryFn: () => category ? fetchNotesByCategory({currentPage: 1, searchText: "", noteTag: category}) : fetchNotes({currentPage: 1, searchText: "" }),
	})

  return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NotesClient tag={category} />
		</HydrationBoundary>
  )
}