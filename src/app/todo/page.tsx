"use client"
// Importações necessárias
import { useState } from "react"

// Definição do componente TodoList
const TodoList = () => {
  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState([
    { id: 1, text: "Concluir projeto", completed: false },
    { id: 2, text: "Fazer compras", completed: true },
    // Adicione mais tarefas conforme necessário
  ])

  // Função para adicionar uma nova tarefa
  const addTask = (text: string) => {
    const newTask = { id: Date.now(), text, completed: false }
    setTasks([...tasks, newTask])
  }

  const saveTasksOnLS = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
    alert("saved")
  }

  const loadTasksFromLS = () => {
    const tasks = localStorage.getItem("tasks")
    if (tasks) {
      setTasks(JSON.parse(tasks))
      alert("loaded")
    }
  }

  // Função para marcar uma tarefa como completa
  const toggleComplete = (taskId: number) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    setTasks(updatedTasks)
  }

  // Função para remover uma tarefa
  const removeTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
  }

  const [text, setText] = useState("")

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Todo List</h1>
      <div className="mb-4 flex justify-between items-center w-full p-2">
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2" onClick={saveTasksOnLS}>
          save
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2" onClick={loadTasksFromLS}>
          load
        </button>
      </div>
      <form className="mb-4">
        <label htmlFor="task" className="block mb-2">
          Nova tarefa
        </label>
        <div className="flex">
          <input
            id="task"
            type="text"
            className="flex-1 border border-gray-400 rounded-md p-2 mr-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
            onClick={(e) => {
              e.preventDefault()
              addTask(text)
              setText("")
            }}
          >
            Adicionar
          </button>
        </div>
      </form>
      <div className="space-y-2">
        {tasks
          .sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0))
          .map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-2 rounded-md ${
                task.completed ? "bg-green-200" : "bg-white"
              }`}
            >
              <div className="flex items-center cursor-pointer" onClick={() => toggleComplete(task.id)}>
                <div className="mr-2">
                  {task.completed ? (
                    <i className="text-green-600 fa fa-check-circle" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-400 rounded" />
                  )}
                </div>
                <p className={task.completed ? "line-through" : ""}>{task.text}</p>
              </div>
              <button onClick={() => removeTask(task.id)} className="text-red-600 hover:text-red-800">
                <i className="fa fa-trash" />
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default TodoList
