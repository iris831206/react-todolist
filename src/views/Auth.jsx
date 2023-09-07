import { Outlet } from "react-router-dom";

const Auth = () => {
  return (<>
    <div id='loginPage' className='bg-yellow'>
      <div className='container loginPage vhContainer'>
        <div className='side'>
          <img src="https://iamamberhh.github.io/react_todolist/logo_lg.png" alt="Logo" />
          <img src="https://smalljie373.github.io/2023react-todolist/assets/img-e680fa3a.png" alt="Logo" />
        </div>
        <div>
          {/* 指定渲染位置 */}
          <Outlet />
        </div>
      </div>
    </div>



  </>)
}

export default Auth;