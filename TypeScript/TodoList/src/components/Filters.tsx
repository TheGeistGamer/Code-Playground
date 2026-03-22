import { FILTERS_BUTTONS, type FilterValue } from '../consts'

interface Props {
  onFilterChage: (filter: FilterValue) => void
  filterSelected: FilterValue
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChage }) => {
  return (
    <ul className='filters'>
      {
        Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
          const isSelected = (key === filterSelected)
          const className = isSelected ? 'selected' : ''

          return (
            <li key={key}>
              <a
                className={className}
                href={href}
                onClick={(event) => {
                  event.preventDefault()
                  onFilterChage(key as FilterValue)
                }}
              >
                {literal}
                </a>
            </li>
          )
        })
      }
    </ul>
  )
}
