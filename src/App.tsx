import { TaskProvider } from './contexts/taskContext'
import PageRoute from './routes/PageRoute'

function App() {
  return (
    <div>
      <TaskProvider>
        <PageRoute />
      </TaskProvider>
    </div>
  )
}

export default App
