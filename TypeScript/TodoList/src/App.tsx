import { type TodoToggle, type TodoId, type TodoTitle, type Todo } from './types'
import { Todos } from './components/Todos'
import { type FilterValue, TODO_FILTERS } from './consts'
import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const mockTodos = [
  {
    id: '1',
    title: 'Ver el Twitch de midu',
    completed: true
  },
  {
    id: '2',
    title: 'Aprender React con TypeScript',
    completed: false
  },
  {
    id: '3',
    title: 'Sacar ticket de la miduFest',
    completed: false
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleComplete = ({ id, completed }: TodoToggle): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed }
      }

      return todo
    })

    setTodos(newTodos)
  }

  // - Cambia el estado del filtro -
  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  // -- Limpia todas las tareas completadas --
  const handleRemoveAllComplete = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    const newTodos = [newTodo, ...todos]
    setTodos(newTodos)
  }

  // - Cuantas tareas pendientes faltan -
  const activeCount = todos.filter(todo => !todo.completed).length

  const completedCount = todos.length - activeCount

  // - Filtrar los valores -
  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <main className='todoapp'>
      <Header onAddTodo={handleAddTodo}/>

      <Todos
        todos={filteredTodos}
        setTodos={setTodos}
        onRemoveTodo={handleRemove}
        onToggleCompleted={handleComplete}
      />

      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllComplete}
        handleFilterChange={handleFilterChange}
      />

    </main>
  )
}

export default App
