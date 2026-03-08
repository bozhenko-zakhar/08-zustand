"use client"

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader';

import css from "./Notes.client.module.css"

import { Toaster } from 'react-hot-toast';
import { fetchNotes, fetchNotesByCategory } from '@/lib/api';
import { NoteTag } from '@/types/note';
import Link from 'next/link';

interface NotesClientProps {
	tag: NoteTag | undefined
}

const NotesClient = ({tag}: NotesClientProps) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const fetchNotesParams = {currentPage: currentPage, searchText: searchQuery}

	const { data, isLoading, isSuccess, isFetched } = useQuery({
		queryKey: ['notes', searchQuery, currentPage, tag],
		queryFn: () => tag === undefined ? fetchNotes(fetchNotesParams) : fetchNotesByCategory({...fetchNotesParams, noteTag: tag}),
		placeholderData: keepPreviousData,
		refetchOnMount: false,
	});

	const updateSearchQuery = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		setCurrentPage(1);
	}, 300)	
	
	const total_pages = data?.totalPages ?? 0;
	return (
    <div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox onChange={updateSearchQuery} />
				{ isSuccess && total_pages > 1 && (
					<Pagination totalPages={total_pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
				) }

				<Link className={css.button} href="/notes/action/create">Create note +</Link> 
			</header>

			{ data?.notes &&
				<NoteList notes={data.notes}/>
			}

			{
				isLoading && (
					<Loader />
				)
			}

			{
				isFetched && data?.notes.length == 0 &&
				<p className={css.not_found}>No documents were found for the query «{searchQuery}»</p>
			}

			<Toaster />
		</div>
	)
};

export default NotesClient;