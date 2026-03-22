import { type TodoId, type ListOfTodos, type TodoToggle } from '../types'
import { Reorder, motion } from 'framer-motion'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, completed }: TodoToggle) => void
  setTodos: (todos: ListOfTodos) => void
}

const variants = {
  hidden: {
    opacity: 0
  },
  visible: ({ delay }) => ({
    opacity: 1,
    transition: {
      delay,
      duration: 1
    }
  })
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleted, setTodos }) => {
  return (
    <Reorder.Group className='todo-list' axis='y' values={todos} onReorder={(order: ListOfTodos) => { setTodos(order) }}>
      {todos.map((todo, index) => (
        <Reorder.Item key={todo.id} value={todo}>
          <motion.div
            custom={{ delay: (index + 1) * 0.2 }}
            key={todo.id}
            className={`${todo.completed ? 'completed' : ''}`}
            initial='hidden'
            animate='visible'
            exit={'hidden'}
            variants={variants}
            layoutId={todo.id}
            >
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              onRemoveTodo={onRemoveTodo}
              onToggleCompleted={onToggleCompleted}
            />
          </motion.div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
