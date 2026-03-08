import css from './SearchBox.module.css'

interface SearchBoxProps {
	onChange: (query: string) => void
}

export default function SearchBox({onChange}: SearchBoxProps) {

  return (
    <input
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
			className={css.input}
			type="text"
			placeholder="Search notes"
		/>
  )
}