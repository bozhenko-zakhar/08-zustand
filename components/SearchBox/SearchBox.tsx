import css from './SearchBox.module.css'

interface SearchBoxProps {
	onChange: (query: string) => void
}

export default function SearchBox({onChange}: SearchBoxProps) {

	function queryHandler(event: React.ChangeEvent<HTMLInputElement>) {
		onChange(event.target.value)
	}

  return (
    <input
			onChange={queryHandler}
			className={css.input}
			type="text"
			placeholder="Search notes"
		/>
  )
}