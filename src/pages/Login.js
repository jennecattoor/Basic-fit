import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const providersNames = [
  'google',
];

const LoginButton = (props) => <a href={`${backendUrl}/api/connect/${props.providerName}`}>
  <Button variant="outlined">Connect to {props.providerName}</Button>
</a>;

const LogoutButton = (props) => <Button variant="outlined" onClick={props.onClick}>Logout</Button>;

const Login = (props) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsLogged(false);
  };

  let buttons;

  if (isLogged) {
    buttons = <LogoutButton onClick={logout} />;
  } else {
    buttons = <ul style={{ listStyleType: 'none' }}>
      {providersNames.map((providerName, i) => <li key={providerName}>
        <LoginButton providerName={providerName} />
      </li>)}
    </ul>;
  }

  let text;

  if (isLogged) {
    text = <Typography variant="h2">Welcome {localStorage.getItem('username')}, you are connected!</Typography>;
  } else {
    text = <Typography variant="h2">You are not connected, please log in</Typography>;
  }

  return <div>
    {text}
    {buttons}
  </div>;
}

export default Login;
