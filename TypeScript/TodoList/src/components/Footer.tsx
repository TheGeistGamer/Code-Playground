import { type FilterValue } from '../consts'
import { Filters } from './Filters'

interface Props {
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
  filterSelected: FilterValue
  handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
  onClearCompleted,
  completedCount = 0,
  filterSelected,
  handleFilterChange,
  activeCount = 0
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> Tareas Pendientes
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChage={handleFilterChange}
      />

      {/* --- Borrar las tareas completadas si existen -- */}
      {
        completedCount > 0 && (
          <button
            className='clear-completed'
            onClick={onClearCompleted}
          >
            Borrar Completadas
          </button>
        )
      }
    </footer>
  )
}
