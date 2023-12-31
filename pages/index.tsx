"use client"

import todo from '../store/todo';
import { observer } from 'mobx-react-lite';
import Head from 'next/head'


const statusData = [
  { order: 1, title: "backlog" },
  { order: 2, title: "todo" },
  { order: 3, title: "in progress" },
  { order: 4, title: "test" },
  { order: 5, title: "done" }
]

const Todo = observer(() => {

  const styleColor = (status: string) => {
    switch (status) {
      case "backlog":
        return { backgroundColor: '#f3464b', color: 'white' }
      case "todo":
        return { backgroundColor: '#dff9fb', color: 'black' }
      case "in progress":
        return { backgroundColor: '#7ed6df', color: 'black' }
      case "test":
        return { backgroundColor: '#f6e58d', color: 'black' }
      case "done":
        return { backgroundColor: '#8cfab4', color: 'black' }
      default:
        return { backgroundColor: '#dff9fb', color: 'black' }
    }
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center p-24 justify-between">


        <div>
          <div>
            <input
              className='outline-blue-500 px-4 py-2 rounded-md w-full'
              placeholder="task"
              type='text'
              value={todo.taskInput}
              onChange={(e) => todo.handleChange(e.target.value)}
            />
            <button
              data-test="add-btn"
              className='w-full my-2 py-1 text-lg uppercase font-bold bg-gray-800 rounded-md text-white'
              onClick={() => todo.addTask()}
            >Add</button>
          </div>
          <div>
            <div className='bg-white'>
              {
                statusData.map((item) => (
                  <div
                    data-test={item.title}
                    onPointerEnter={() => todo.handlePointerEnter(item.title)}
                    onPointerOver={(e) => todo.handlePointerOver(e)}
                    key={item.order}
                    className={`flex gap-4 px-4 my-2 items-center min-h-[100px] min-w-[616px] shadow-xl`}
                  >
                    <h2 className='my-4 text-lg w-28 capitalize border-r-2'>{item.title}</h2>
                    <ul>
                      {
                        todo.tasks.slice().sort((a, b) => a.order - b.order).map((task) => task.status === item.title ?
                          <li
                            data-test={`card-${task.order}`}
                            draggable
                            onPointerDown={() => todo.handlePointerDown(task.id, task.order)}
                            onPointerEnter={() => todo.handlePointerEnterGroup(task.order, task.id)}
                            onPointerMove={(e) => todo.handlePointerMove(e)}
                            key={task.id}
                            className={`flex justify-between w-[600px] my-2 py-2 px-4 border-2 cursor-grab rounded-md `}
                            style={styleColor(task.status)}
                          >
                            <div>
                              <h3 data-test={`title-${task.order}`} >{task.title}</h3>
                              <p className={`text-xs mt-2 text-${task.status === 'backlog' ? 'gray-50' : 'gray-500'}`} >{task.createdAt}</p>
                            </div>
                            <button data-test={`delete-${task.order}`} className='shadow-md px-4 py-2 rounded-md border border-[#ED4C67]' onClick={() => todo.deleteTask(task.id)} >Delete</button>
                          </li> : '')
                      }
                    </ul>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

      </main>
    </div>
  )
})

export default Todo;