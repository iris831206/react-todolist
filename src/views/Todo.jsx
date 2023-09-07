import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
const { VITE_APP_HOST } = import.meta.env;


function Todo() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [nickname, setNickname] = useState('');
  const [filterTodos, setFilterTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [tabStatus, setTabStatus] = useState('all');
  const [notFinish, setNotFinish] = useState(0)

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

  useEffect(() => {
    checkout()
  }, []);

  useEffect(() => {
    if (tabStatus === 'all') {
      setFilterTodos(todos);
    }
    else if (tabStatus === 'notFinish') {
      const notFinish = todos.filter((i) => i.status === false)
      setFilterTodos(notFinish)
    }
    else if (tabStatus === 'finish') {
      const finish = todos.filter((i) => i.status === true)
      setFilterTodos(finish)
    }
  }, [tabStatus, todos])

  useEffect(() => {
    const notFinsiItem = todos.filter((i) => i.status === false);
    setNotFinish(notFinsiItem.length)
  }, [todos])


  const checkout = async () => {
    try {
      const res = await axios.get(`${VITE_APP_HOST}/users/checkout`, {
        headers: {
          Authorization: token
        }
      });
      setNickname(res.data.nickname);
      getTodos()
    } catch (error) {
      console.log(error);
      navigate('/')
    }
  }

  const getTodos = async () => {
    try {
      const res = await axios.get(`${VITE_APP_HOST}/todos`, {
        headers: {
          Authorization: token
        }
      });
      setTodos(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  }

  const addTodo = async () => {
    try {
      const res = await axios.post(`${VITE_APP_HOST}/todos`, {
        content: newTodo,
      }, {
        headers: {
          Authorization: token
        }
      });
      setNewTodo('');
      getTodos()
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const finishTodo = async (id) => {
    try {
      const res = await axios.patch(`${VITE_APP_HOST}/todos/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: token
          }
        });
      getTodos();
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${VITE_APP_HOST}/todos/${id}`, {
        headers: {
          Authorization: token
        }
      });
      getTodos()
    } catch (error) {
      console.log(error)
    }

  }


  const clearFinishItem = () => {
    todos.filter((i) => {
      if (i.status) {
        deleteTodo(i.id)
      }
    })
  }

  const handleLogout = () => {
    
    navigate('/')
  }


  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1>ONLINE TODO LIST</h1>
          <ul>
            <li className="todo_sm"><span>{nickname}的代辦</span></li>
            <li><a href="#" onClick={(e) => {
              e.preventDefault();
              handleLogout()
            }}>登出</a></li>
          </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input type="text" placeholder="請輸入待辦事項" value={newTodo} onChange={((e) => setNewTodo(e.target.value.trim()))}
                onKeyDown={handleKeyDown}
              />
              <a href="#" onClick={(e) => {
                e.preventDefault();
                addTodo();
              }}>
                <i className="fa fa-plus">+</i>
              </a>
            </div>
            <div className="todoList_list">
              <ul className="todoList_tab">
                <li><a href="#" className={tabStatus === 'all' ? 'active' : ''} onClick={(e) => {
                  e.preventDefault();
                  setTabStatus('all')
                }}>全部</a></li>
                <li><a href="#" className={tabStatus === 'notFinish' ? 'active' : ''} onClick={(e) => {
                  e.preventDefault();
                  setTabStatus('notFinish')
                }}>待完成</a></li>
                <li><a href="#" className={tabStatus === 'finish' ? 'active' : ''} onClick={(e) => {
                  e.preventDefault();
                  setTabStatus('finish')
                }}>已完成</a></li>
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  {filterTodos.length === 0 ? (
                    <li className="todoList_label" style={{ justifyContent: 'space-around', cursor: 'auto' }}>
                      目前尚無項目
                    </li>
                  ) : ('')}
                  {filterTodos.map((todo) => {
                    return (
                      <li key={todo.id}>
                        <label class="todoList_label">
                          <input class="todoList_input" type="checkbox" checked={todo.status} onChange={() => finishTodo(todo.id)} />
                          <span>{todo.content}</span>
                        </label>
                        <a href='#' onClick={(e) => {
                          e.preventDefault();
                          deleteTodo(todo.id)
                        }}>
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </a>

                      </li>
                    )
                  })}
                </ul>
                <div className="todoList_statistics">
                  <p> {notFinish} 個未完成項目</p>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    clearFinishItem();
                  }}>清除已完成項目</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo