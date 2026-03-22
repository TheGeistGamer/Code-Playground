import { type TodoToggle, type TodoId, type Todo as TodoType } from '../types'
import { motion } from 'framer-motion'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, completed }: TodoToggle) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleted }) => {
  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleted({ id, completed: event.target.checked })
  }

  return (
    <div className="view">
      <input
        type="checkbox"
        checked={completed}
        className='toggle'
        onChange={handleChangeCheckBox}
      />
      <label htmlFor="">{title}</label
      >
      <motion.button
        className='destroy'
        whileTap={{ scale: 0.9 }}
        whileHover={{cursor: 'pointer', scale: 1.5 }}
        onClick={() => {
          onRemoveTodo({ id })
        }}>

      </motion.button>
    </div>
  )
}
