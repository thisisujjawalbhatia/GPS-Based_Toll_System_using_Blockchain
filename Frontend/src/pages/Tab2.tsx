import { IonContent,IonModal, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon,IonButtons,IonItem,IonInput} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useGeolocation } from '../GeolocationContext';
import './Tab1.css';
import { useEffect, useRef, useState } from 'react';
import { locationOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import axios from 'axios';
import { OverlayEventDetail } from '@ionic/core/components';
import Toll from '../components/Toll';

const Tab1: React.FC = () => {
  const { username,id,token,location, startTracking, stopTracking } = useGeolocation();
  const [tracking,setTracking] = useState<boolean>(false);
  const [balance,setBalance] = useState<number>(0);
  const [transactions,setTransactions] = useState<any[]>([]);
  const handleClick = () =>{
    setTracking(!tracking);
  }
  const paymentStuff = () =>{
    document.getElementById('open-modal')?.click();
  }
  let history = useHistory()
  useEffect(() => {
    if(token === null){
      history.push('/login')
    }
    

  },)
  useEffect(()=>{
    if(token){
      axios.get("http://localhost:1337/api/transactions?populate=*",{headers:{'Authorization':`Bearer ${token}`}})
    .then(res =>{
      setTransactions(res.data.data)
      console.log(transactions)
    })

    }
  },[balance]);
  useEffect(() => {getBalance()},[username]);
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    console.log(input.current?.value)
    addBalance(parseInt(input.current?.value as string))
    setTimeout(function() { getBalance(); }, 500);

    modal.current?.dismiss(input.current?.value, 'confirm');

  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }
  const addBalance = async (amount:number) =>{
    axios.post("http://localhost:3000/addFunds",{userId:id?.toString(),amount:amount},{headers:{"Access-Control-Allow-Origin": "*"}})
    .then(res =>{
      setBalance(res.data.amount)
    })
  }
  const getBalance = async ()=>{
    axios.post("http://localhost:3000/getBalance",{userId:id?.toString()},{headers:{"Access-Control-Allow-Origin": "*"}})
    .then(res =>{
      setBalance(res.data.amount)
    })
  }
  // useEffect(() => {
  //   getBalance()
  //   console.log("GET BALANCE RUN")
  //   console.log(id?.toString())
  // },[])
  return (
    <IonPage className='okay'>
      <IonContent className='container' fullscreen>
        <div className="top">
          <div className="t1">History</div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        
        
        <div className="tolls">
          {/* <div className="th">Recent Tolls</div> */}
          <div className="hist">
            {transactions.map(function(data){
              let tPrice = data.attributes.amount;
              let tName = data.attributes.toll_booth.data.attributes.name;
              let datestr = data.attributes.createdAt;
              const date = new Date(datestr);

              // Extract day, month, and year
              let day:any = date.getDate();
              let month:any = date.getMonth() + 1; // Months are zero-based in JavaScript
              let year:any = date.getFullYear() % 100; // Get last two digits of the year

              // Add leading zeros if necessary
              day = day < 10 ? '0' + day : day;
              month = month < 10 ? '0' + month : month;
              year = year < 10 ? '0' + year : year;

              // Extract hours and minutes
              let hours = date.getHours();
              let minutes:any = date.getMinutes();

              // Determine AM or PM
              const ampm = hours >= 12 ? 'PM' : 'AM';

              // Convert to 12-hour format
              hours = hours % 12;
              hours = hours ? hours : 12; // Convert '0' to '12'

              // Add leading zero to minutes if necessary
              minutes = minutes < 10 ? '0' + minutes : minutes;

              // Combine into the desired format
              let tDate =  `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
              return (
                <Toll tDate={tDate} tName={tName} tPrice={tPrice}/>
              )
            })}
            
            {/* <Toll tDate='16/10/24 2:43 PM' tName='Toll Booth Name' tPrice='₹120'/>
            <Toll tDate='16/10/24 2:43 PM' tName='Toll Booth Name' tPrice='₹120'/> */}

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
      {/* <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>Current Location:</h2>
          {location ? (
            <p>
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </p>
          ) : (
            <p>No location data available.</p>
          )}
          <IonButton onClick={startTracking}>Start Tracking</IonButton>
          <IonButton onClick={stopTracking} color="danger">
            Stop Tracking
          </IonButton>
        </IonContent>
      </IonContent> */}