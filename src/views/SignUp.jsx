import { useState } from "react";
import axios from 'axios';
import { useNavigate, NavLink } from "react-router-dom"; // 引入NavLink hook

const { VITE_APP_HOST } = import.meta.env;

const SignUp = () => {
  console.log(VITE_APP_HOST);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: ''
  });
  const navigate = useNavigate(); // 使用useNavigate hook來執行路由導航

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const signUp = async (e) => {
    e.preventDefault(); // 阻止表單提交預設行為
    console.log(formData);
    try {
      const res = await axios.post(`${VITE_APP_HOST}/users/sign_up`, formData);
      console.log(res);
      setFormData({
        email: '',
        password: '',
        nickname: '',
      });
      alert('註冊成功！');
      navigate('/'); // 當註冊成功，轉址到登入頁
    } catch (error) {
      console.error('註冊失敗，原因：', error);
      setMessage(error.response.data.message);
      alert('註冊失敗，原因：' + error.response.data.message);
    }
  }

  return (
    <form
      className='formControls'
      onSubmit={signUp}
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
      <label className='formControls_label' htmlFor='nickname'>
        暱稱
      </label>
      <input
        className='formControls_input'
        type='text'
        name='nickname'
        id='nickname'
        value={formData.nickname}
        onChange={handleInputChange}
        placeholder='請輸入暱稱'
        autoComplete='on'
      />
      <input
        className='formControls_btnSubmit'
        type='submit'
        value='註冊'
      />
      <NavLink to='/' className='formControls_btnLink'>
        <p>已有帳號？立即登入</p>
      </NavLink>
    </form>
  );
}

export default SignUp;
