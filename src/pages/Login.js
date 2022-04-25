import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const providersNames = [
  'google',
];

const LoginButton = (props) => <a style={{ textDecoration: 'none' }} href={`${backendUrl}/api/connect/${props.providerName}`}>
  <Button variant="outlined">Connect to {props.providerName}</Button>
</a>;

const LogoutButton = (props) => <Button variant="outlined" onClick={props.onClick}>Logout</Button>;

const Login = () => {
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
    buttons = providersNames.map((providerName, i) => <LoginButton key={providerName} providerName={providerName} />)
      ;
  }

  let text;

  if (isLogged) {
    text = <Typography variant="h2">Welcome {localStorage.getItem('username')}, you are connected!</Typography>;
  } else {
    text = <Typography variant="h2">Please log in to continue</Typography>;
  }

  return <>
    <Box display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      {text}
      {buttons}
    </Box>
  </>
    ;
}

export default Login;
