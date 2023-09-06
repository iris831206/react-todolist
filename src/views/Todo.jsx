import axios from "axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const { VITE_APP_HOST } = import.meta.env;

const Todo = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    // 取得 Cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    console.log(cookieValue);
    
    // 預設 axios 的表頭
    axios.defaults.headers.common['Authorization'] = cookieValue;


    // 驗證登入
    axios.get(`${VITE_APP_HOST}/users/checkout`).then(res => {
      console.log(res);
    }).catch(err => {
      console.log('登入失敗啦', err);
      setTimeout(() => {
        navigate('/auth/login')
      }, 3000);
    })


    // Todo... AJAX
  }, [])


  return (<>待辦事項</>)
}

export default Todo