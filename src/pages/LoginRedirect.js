import { CircularProgress, Alert, Typography, Box } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useQuery } from 'react-query';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const LoginRedirect = (props) => {
  const [text, setText] = useState('Loading...');
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const { data: profiles, isLoading, error } = useQuery("profiles", async () => {
    const data = await fetch(`${backendUrl}/api/profiles`).then(r => r.json());
    return data;
  });

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(`${backendUrl}/api/auth/${params.providerName}/callback${location.search}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('id', res.user.id);

        if (profiles) {
          const allProfiles = profiles.data.map(profile => profile.attributes.userId);

          if (allProfiles.find(e => e === res.user.id)) {
            const profileId = profiles.data.find(profile => profile.attributes.userId === res.user.id).id
            localStorage.setItem('profileId', profileId);
            setText('Welcome back!');
            setTimeout(() => navigate('/home'), 1200);
          }

          else {
            fetch(`${backendUrl}/api/profiles`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: { userName: res.user.username, userId: res.user.id } }),
            })
              .then(response => response.json())
              .then(data => {
                console.log('Success:', data);
                localStorage.setItem('profileId', data.data.id);
                setText('Welcome to Basic Fit!');
                setTimeout(() => navigate('/home'), 1200);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }
      })
      .catch(err => {
        console.log(err);
        setText('An error occurred, please see the developer console.')
      });
  }, [navigate, location.search, params.providerName, profiles]);

  if (isLoading) {
    return <CircularProgress />
  }

  return <div>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      {error && <Alert severity="error">Something went wrong</Alert>}
      <Typography variant="h2" component="h2">{text}
      </Typography>
    </Box></div>
};

export default LoginRedirect;
