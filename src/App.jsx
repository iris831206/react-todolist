import { Route, Routes, NavLink } from 'react-router-dom'
import Auth from './views/Auth'
import SignUp from './views/SignUp'
import Login from './views/Login'
import Todo from './views/Todo'
import NotFound from './views/NotFound'
import './index.css'


function App() {

  return (
    <>

      <Routes>
        {/* 路由表 */}     
        {/* /auth 共用版型 */}
        <Route path="/" element={ <Auth/> }>
          <Route path="sign_up" element={<SignUp />} />
          <Route path="" element={<Login />} />
        </Route>
        <Route path="todo" element={ <Todo />  }/>
        <Route path="*" element={ <NotFound/>} />
      </Routes>
    </>
  )
}

export default App
