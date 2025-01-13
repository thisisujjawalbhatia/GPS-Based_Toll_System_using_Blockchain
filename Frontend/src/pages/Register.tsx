import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';import { arrowBack, shapesOutline } from "ionicons/icons";
import './Login.css';
import { useGeolocation } from '../GeolocationContext';
import axios from 'axios';
import { useHistory } from 'react-router';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username,setUser] = useState('');
    const { setUsername,setToken, setId } = useGeolocation();
    let history = useHistory()
    
    const handleRegister = () => {
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Username:', username);
      axios.post("http://localhost:1337/api/auth/local/register",{username:username,email:email,password:password})
      .then(res =>{
        console.log(res.data)
        setToken(res.data.jwt)
        setUsername(res.data.user.username)
        setId(res.data.user.id)
        registerUser(res.data.user.id)
        history.push("/tab1")
      })
    }
    const registerUser = async (id:number) => {
      axios.post("http://localhost:3000/assignUserAccount",{userId:id?.toString()},{headers:{"Access-Control-Allow-Origin": "*"}})
      .then(res =>{
        console.log(res.data);
      })
    }
  return (
    <IonPage>
    <IonContent className="ion-padding login-container">
      <IonCard className="login-box">
        <IonCardHeader className="login-header">Register</IonCardHeader>
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
                type="text"
                placeholder="Username"
                value={username}
                onIonChange={(e) => setUser(e.detail.value!)}
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
            <IonButton expand="block" onClick={handleRegister} className="login-button">
                Register
            </IonButton>
            <div className="register-link">
                <span className="or">or</span> <br />
              <a href="/login">Login</a>
            </div>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
  );
};

export default Register;
