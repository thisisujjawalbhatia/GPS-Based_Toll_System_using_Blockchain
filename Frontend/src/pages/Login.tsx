import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';import { arrowBack, shapesOutline } from "ionicons/icons";
import './Login.css';
import { useGeolocation } from '../GeolocationContext';
import axios from 'axios';
import { useHistory } from 'react-router';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUsername,setToken, setId } = useGeolocation();
    let history = useHistory()
    const handleLogin = () => {
      console.log('Email:', email);
      console.log('Password:', password);
      axios.post("http://localhost:1337/api/auth/local",{identifier:email,password:password})
      .then(res =>{
        console.log(res.data)
        setToken(res.data.jwt)
        setUsername(res.data.user.username)
        setId(res.data.user.id)
        history.push("/tab1")
      })
    }
  return (
    <IonPage>
    <IonContent className="ion-padding login-container">
      <IonCard className="login-box">
        <IonCardHeader className="login-header">Login</IonCardHeader>
        <IonCardContent>
            <IonInput
                type="email"
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                clearInput
                className="login-input"
            />
            <IonInput
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                clearInput
                className="login-input"
            />
            <IonButton expand="block" onClick={handleLogin} className="login-button">
                Login
            </IonButton>
            <div className="register-link">
                <span className="or">or</span> <br />
              <a href="/register">Register</a>
            </div>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
  );
};

export default Login;
