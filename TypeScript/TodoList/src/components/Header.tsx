import { type TodoTitle } from '../types'
import { CreateTodo } from './CreateTodo'
import { motion } from 'framer-motion'

interface Props {
  onAddTodo: ({ title }: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  return (
    <header className="header">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 0.2,
          type: 'spring'
        }}
      >
        Todo
        <img
          style={{ width: '60px', height: 'auto' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" alt="typescript" />

      </motion.h1>

      <CreateTodo saveTodo={onAddTodo} />

    </header>
  )
}
