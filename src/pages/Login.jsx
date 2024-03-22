import React, { useState } from 'react';
import { notification } from 'antd';
import VitaLabBranco from "../assets/bannerbranco.png";
import "../styles/login.css";
import { getAuthToken } from "../api/api";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = (placement) => {
    api.info({
      message: `Erro de login`,
      description: 'Nome de usuário ou senha incorretos.',
      placement,
    });
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const isAuthenticated = await getAuthToken(username, password);
      if(isAuthenticated){
        navigate('/home')
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      openNotification('top');
    }
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title">
              <img src={VitaLabBranco} alt="icone_medico" />
            </span>
            <span className="login-form-title">Bem Vindo(a)</span>
            <div className="wrap-input">
              <input
                className={username !== "" ? "has-val input" : "input"}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Usuário"></span>
            </div>
            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>
            <div className="container-login-form-btn">
              <button onClick={(e) => handleLoginClick(e, username, password)} className="login-form-btn">Login</button>
            </div>
          </form>
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default Login;