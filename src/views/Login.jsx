import { useState } from "react";
import axios from 'axios';
import { useNavigate, NavLink } from "react-router-dom";

const { VITE_APP_HOST } = import.meta.env;

const Login = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // 使用useNavigate hook來執行路由導航
  const [isLoading, setIsLoading] = useState(false); // 狀態

  const logIn = async (e) => {
    e.preventDefault(); // 阻止表單的默認提交行為

    try {
      setIsLoading(true);
      const res = await axios.post(`${VITE_APP_HOST}/users/sign_in`, formData);
      const { token } = res.data;
      console.log(token);
      document.cookie = `token=${token};`;
      setIsLoading(false);

      navigate('todo'); // 當登入成功，轉址到 todo 頁
    } catch (error) {
      setIsLoading(false);
      console.error('登入失敗，原因：', error);
      setMessage(error.response.data.message);
      alert('登入失敗，原因：' + error.response.data.message);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <>
      {/* 登入頁面 */}
      <form
        className='formControls'
        onSubmit={logIn}
      >
        <h2 className='formControls_txt'>最實用的線上代辦事項服務</h2>
        <label className='formControls_label' htmlFor='email'>
          Email
        </label>
        <input
          className='formControls_input'
          type='text'
          name='email'
          id='email'
          value={formData.email}
          onChange={handleInputChange}
          placeholder='請輸入Email'
        />
        <label className='formControls_label' htmlFor='pwd'>
          密碼
        </label>
        <input
          className='formControls_input'
          type='password'
          name='password'
          id='pwd'
          value={formData.password}
          onChange={handleInputChange}
          placeholder='請輸入密碼'
          autoComplete='on'
        />
        <input
          className='formControls_btnSubmit'
          type='submit'
          value='登入'
        />
        {/* {message && <span>登入失敗，原因：{message.toString()}</span>} */}
        <NavLink to='/sign_up' className='formControls_btnLink'>
          <p>註冊帳號</p>
        </NavLink>
      </form>
    </>
  );
}

export default Login;
