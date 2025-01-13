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
          <div className="t1">Hello</div>
          <div className="t2">{username}</div>
          <div className="t3">Have a safe drive</div>
        </div>
        <div className="tracking" style={{backgroundColor:tracking?'#3EC070':'#C34444'}} onClick={handleClick}>
          <div className="tt">Tracking {tracking?"Active":"Inactive"}</div>
          <IonIcon aria-hidden="true" style={{marginTop:'2px'}} icon={locationOutline} />
        </div>
        <IonButton id="open-modal" expand="block">
              Open
        </IonButton>
        <div className="acc">
          <div className="b1">
            <div className="b1t">Account Balance</div>
            <div className="bal">₹{balance}</div>
          </div>
          <div className="b2">
            <div className="b2t">Add Funds</div>
            <div className="gateways" onClick={paymentStuff}>
            
              <svg className='eh' width="65" height="35" viewBox="0 0 65 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_6_44" maskUnits="userSpaceOnUse" x="0" y="0" width="65" height="35">
                <path d="M0.167603 0.492096H64.0876V34.4921H0.167603V0.492096Z" fill="white"/>
                <path d="M6.1676 23H18.1676M12.1676 29V17" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </mask>
                <g mask="url(#mask0_6_44)">
                <path d="M47.0876 0.492096H17.1676C7.81761 0.492096 0.167603 8.1421 0.167603 17.4921C0.167603 26.8421 7.81761 34.4921 17.1676 34.4921H47.0876C56.4376 34.4921 64.0876 26.8421 64.0876 17.4921C64.0876 8.1421 56.4376 0.492096 47.0876 0.492096Z" fill="white"/>
                <path d="M47.0876 1.8691C49.1871 1.8691 51.2271 2.2856 53.1481 3.1016C55.0096 3.8921 56.6756 5.0226 58.1206 6.4591C59.5571 7.8956 60.6876 9.5701 61.4781 11.4316C62.2941 13.3526 62.7106 15.3926 62.7106 17.4921C62.7106 19.5916 62.2941 21.6316 61.4781 23.5526C60.6876 25.4141 59.5571 27.0801 58.1206 28.5251C56.6841 29.9616 55.0096 31.0921 53.1481 31.8826C51.2271 32.6986 49.1871 33.1151 47.0876 33.1151H17.1676C15.0681 33.1151 13.0281 32.6986 11.1071 31.8826C9.24561 31.0921 7.57961 29.9616 6.1346 28.5251C4.6981 27.0886 3.5676 25.4141 2.7771 23.5526C1.9611 21.6316 1.5446 19.5916 1.5446 17.4921C1.5446 15.3926 1.9611 13.3526 2.7771 11.4316C3.5676 9.5701 4.6981 7.9041 6.1346 6.4591C7.57111 5.0226 9.24561 3.8921 11.1071 3.1016C13.0281 2.2856 15.0681 1.8691 17.1676 1.8691H47.0876ZM47.0876 0.492096H17.1676C7.81761 0.492096 0.167603 8.1421 0.167603 17.4921C0.167603 26.8421 7.81761 34.4921 17.1676 34.4921H47.0876C56.4376 34.4921 64.0876 26.8421 64.0876 17.4921C64.0876 8.1421 56.4376 0.492096 47.0876 0.492096Z" fill="#3C4043"/>
                <path d="M30.6486 18.6906V23.8416H29.0166V11.1426H33.3431C34.4396 11.1426 35.3746 11.5081 36.1396 12.2391C36.9216 12.9701 37.3126 13.8626 37.3126 14.9166C37.3126 15.9961 36.9216 16.8886 36.1396 17.6111C35.3831 18.3336 34.4481 18.6906 33.3431 18.6906H30.6486ZM30.6486 12.7066V17.1351H33.3771C34.0231 17.1351 34.5671 16.9141 34.9921 16.4806C35.4256 16.0471 35.6466 15.5201 35.6466 14.9251C35.6466 14.3386 35.4256 13.8201 34.9921 13.3866C34.5671 12.9361 34.0316 12.7151 33.3771 12.7151H30.6486V12.7066ZM41.5796 14.8656C42.7866 14.8656 43.7386 15.1886 44.4356 15.8346C45.1326 16.4806 45.4811 17.3646 45.4811 18.4866V23.8416H43.9256V22.6346H43.8576C43.1861 23.6291 42.2851 24.1221 41.1631 24.1221C40.2026 24.1221 39.4036 23.8416 38.7576 23.2721C38.1116 22.7026 37.7886 21.9971 37.7886 21.1471C37.7886 20.2461 38.1286 19.5321 38.8086 19.0051C39.4886 18.4696 40.3981 18.2061 41.5286 18.2061C42.4976 18.2061 43.2966 18.3846 43.9171 18.7416V18.3676C43.9171 17.7981 43.6961 17.3221 43.2456 16.9226C42.7951 16.5231 42.2681 16.3276 41.6646 16.3276C40.7551 16.3276 40.0326 16.7101 39.5056 17.4836L38.0691 16.5826C38.8596 15.4351 40.0326 14.8656 41.5796 14.8656ZM39.4716 21.1726C39.4716 21.5976 39.6501 21.9546 40.0156 22.2351C40.3726 22.5156 40.7976 22.6601 41.2821 22.6601C41.9706 22.6601 42.5826 22.4051 43.1181 21.8951C43.6536 21.3851 43.9256 20.7901 43.9256 20.1016C43.4156 19.7021 42.7101 19.4981 41.8006 19.4981C41.1376 19.4981 40.5851 19.6596 40.1431 19.9741C39.6926 20.3056 39.4716 20.7051 39.4716 21.1726ZM54.3551 15.1461L48.9151 27.6581H47.2321L49.2551 23.2806L45.6681 15.1461H47.4446L50.0286 21.3851H50.0626L52.5786 15.1461H54.3551Z" fill="#3C4043"/>
                <path d="M24.1572 17.6621C24.1572 17.13 24.1096 16.6209 24.0212 16.1313H17.1804V18.9363L21.1201 18.9371C20.9603 19.8704 20.4461 20.666 19.6581 21.1964V23.0163H22.0033C23.3726 21.7489 24.1572 19.8755 24.1572 17.6621Z" fill="#4285F4"/>
                <path d="M19.659 21.1964C19.0062 21.6367 18.1655 21.8942 17.1821 21.8942C15.2823 21.8942 13.6707 20.6141 13.0936 18.8886H10.6745V20.7654C11.873 23.1437 14.3363 24.7757 17.1821 24.7757C19.149 24.7757 20.8014 24.1289 22.0041 23.0154L19.659 21.1964Z" fill="#34A853"/>
                <path d="M12.8658 17.4963C12.8658 17.0118 12.9465 16.5435 13.0936 16.1032V14.2264H10.6745C10.1789 15.2098 9.90011 16.3199 9.90011 17.4963C9.90011 18.6727 10.1798 19.7828 10.6745 20.7663L13.0936 18.8895C12.943 18.4404 12.8661 17.97 12.8658 17.4963Z" fill="#FABB05"/>
                <path d="M17.1821 13.0976C18.2556 13.0976 19.217 13.4673 19.976 14.1898L22.0543 12.1133C20.792 10.9377 19.1464 10.2161 17.1821 10.2161C14.3371 10.2161 11.873 11.8481 10.6745 14.2264L13.0936 16.1032C13.6707 14.3777 15.2823 13.0976 17.1821 13.0976Z" fill="#E94235"/>
                </g>
              </svg>
              <svg width="64" height="34" viewBox="0 0 64 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M46.92 0H17C7.65 0 0 7.65 0 17C0 26.35 7.65 34 17 34H46.92C56.27 34 63.92 26.35 63.92 17C63.92 7.65 56.27 0 46.92 0Z" fill="#5F259F"/>
                <path d="M46.92 1.377C49.0195 1.377 51.0595 1.7935 52.9805 2.6095C54.842 3.4 56.508 4.5305 57.953 5.967C59.3895 7.4035 60.52 9.078 61.3105 10.9395C62.1265 12.8605 62.543 14.9005 62.543 17C62.543 19.0995 62.1265 21.1395 61.3105 23.0605C60.52 24.922 59.3895 26.588 57.953 28.033C56.5165 29.4695 54.842 30.6 52.9805 31.3905C51.0595 32.2065 49.0195 32.623 46.92 32.623H17C14.9005 32.623 12.8605 32.2065 10.9395 31.3905C9.078 30.6 7.412 29.4695 5.967 28.033C4.5305 26.5965 3.4 24.922 2.6095 23.0605C1.7935 21.1395 1.377 19.0995 1.377 17C1.377 14.9005 1.7935 12.8605 2.6095 10.9395C3.4 9.078 4.5305 7.412 5.967 5.967C7.4035 4.5305 9.078 3.4 10.9395 2.6095C12.8605 1.7935 14.9005 1.377 17 1.377H46.92ZM46.92 0H17C7.65 0 0 7.65 0 17C0 26.35 7.65 34 17 34H46.92C56.27 34 63.92 26.35 63.92 17C63.92 7.65 56.27 0 46.92 0Z" fill="#3C4043"/>
                <g clip-path="url(#clip0_6_43)">
                <path d="M47.5688 20.6765C49.5991 12.0781 44.2747 3.46173 35.6762 1.43136C27.0778 -0.599007 18.4614 4.72547 16.431 13.3239C14.4007 21.9224 19.7251 30.5387 28.3236 32.5691C36.922 34.5995 45.5384 29.275 47.5688 20.6765Z" fill="#5F259F"/>
                <path d="M39.2603 12.8252C39.2603 12.1997 38.7243 11.6631 38.0988 11.6631H35.9536L31.0387 6.03287C30.5916 5.49681 29.8767 5.31793 29.1618 5.4968L27.4637 6.03287C27.1954 6.12224 27.106 6.47999 27.2848 6.6583L32.6473 11.7526H24.5148C24.2464 11.7526 24.0676 11.9314 24.0676 12.1997V13.0929C24.0676 13.7189 24.6042 14.2549 25.2296 14.2549H26.4806V18.5449C26.4806 21.7621 28.1787 23.6386 31.0388 23.6386C31.932 23.6386 32.6474 23.5491 33.5406 23.1919V26.0515C33.5406 26.8559 34.1666 27.4819 34.9709 27.4819H36.2219C36.4902 27.4819 36.7579 27.2136 36.7579 26.9452V14.1655H38.8138C39.082 14.1655 39.2603 13.9867 39.2603 13.7189V12.8252H39.2603ZM33.5406 20.5106C33.0046 20.7789 32.2897 20.8683 31.7537 20.8683C30.3233 20.8683 29.6084 20.1534 29.6084 18.5448V14.2549H33.5406V20.5106Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_6_43">
                <rect width="32" height="32" fill="white" transform="translate(16 1)"/>
                </clipPath>
                </defs>
              </svg>
              <svg className='eh' width="64" height="34" viewBox="0 0 64 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M46.92 0H17C7.65 0 0 7.65 0 17C0 26.35 7.65 34 17 34H46.92C56.27 34 63.92 26.35 63.92 17C63.92 7.65 56.27 0 46.92 0Z" fill="white"/>
                <path d="M46.92 1.377C49.0195 1.377 51.0595 1.7935 52.9805 2.6095C54.842 3.4 56.508 4.5305 57.953 5.967C59.3895 7.4035 60.52 9.078 61.3105 10.9395C62.1265 12.8605 62.543 14.9005 62.543 17C62.543 19.0995 62.1265 21.1395 61.3105 23.0605C60.52 24.922 59.3895 26.588 57.953 28.033C56.5165 29.4695 54.842 30.6 52.9805 31.3905C51.0595 32.2065 49.0195 32.623 46.92 32.623H17C14.9005 32.623 12.8605 32.2065 10.9395 31.3905C9.078 30.6 7.412 29.4695 5.967 28.033C4.5305 26.5965 3.4 24.922 2.6095 23.0605C1.7935 21.1395 1.377 19.0995 1.377 17C1.377 14.9005 1.7935 12.8605 2.6095 10.9395C3.4 9.078 4.5305 7.412 5.967 5.967C7.4035 4.5305 9.078 3.4 10.9395 2.6095C12.8605 1.7935 14.9005 1.377 17 1.377H46.92ZM46.92 0H17C7.65 0 0 7.65 0 17C0 26.35 7.65 34 17 34H46.92C56.27 34 63.92 26.35 63.92 17C63.92 7.65 56.27 0 46.92 0Z" fill="#3C4043"/>
                <path d="M57.1647 14.2821C56.7425 13.0797 55.5966 12.2164 54.2547 12.2164H54.2245C53.35 12.2164 52.5622 12.5821 52.0005 13.1664C51.4389 12.5821 50.651 12.2164 49.7765 12.2164H49.7501C48.9812 12.2164 48.2763 12.4992 47.7372 12.9628V12.7291C47.7184 12.4916 47.5262 12.3069 47.2849 12.3069H45.2192C44.9667 12.3069 44.7631 12.5105 44.7631 12.763V23.9734C44.7631 24.226 44.9667 24.4295 45.2192 24.4295H47.2849C47.5149 24.4295 47.7071 24.2561 47.7335 24.0375V15.9897C47.7335 15.9595 47.7335 15.9369 47.7372 15.9105C47.7712 15.5524 48.035 15.2546 48.4497 15.2207H48.8304C49.0038 15.2358 49.1508 15.2961 49.2639 15.3903C49.4448 15.5336 49.5428 15.7522 49.5428 15.9935L49.5504 23.9998C49.5504 24.2524 49.7539 24.4597 50.0065 24.4597H52.0721C52.3172 24.4597 52.5132 24.2674 52.5245 24.0262V15.9859C52.5245 15.7221 52.6451 15.4808 52.86 15.3413C52.9655 15.2735 53.0937 15.2283 53.2407 15.2132H53.6214C54.07 15.2509 54.3376 15.5901 54.3376 15.9859L54.3451 23.9847C54.3451 24.2373 54.5487 24.4408 54.8012 24.4408H56.8669C57.1081 24.4408 57.3079 24.2524 57.323 24.0149V15.2433C57.3117 14.7495 57.2476 14.5196 57.1647 14.2821ZM43.1875 12.3371H42.0077V10.4222C42.0077 10.4184 42.0077 10.4184 42.0077 10.4146C42.0077 10.1885 41.823 10 41.5892 10C41.5629 10 41.5365 10.0038 41.5101 10.0075C40.2021 10.3656 40.4622 12.1788 38.0723 12.3333H37.8424C37.8085 12.3333 37.7745 12.3371 37.7406 12.3446C37.5408 12.3936 37.3863 12.5745 37.3863 12.7932V14.8588C37.3863 15.1114 37.5898 15.315 37.8424 15.315H39.0863L39.0826 24.0677C39.0826 24.3164 39.2861 24.52 39.5349 24.52H41.5779C41.8267 24.52 42.0303 24.3164 42.0303 24.0677V15.315H43.1875C43.4363 15.315 43.6436 15.1076 43.6436 14.8588V12.7932C43.6436 12.5406 43.4401 12.3371 43.1875 12.3371Z" fill="#00BAF2"/>
                <path d="M35.7616 12.3371H33.696C33.4472 12.3371 33.2399 12.5406 33.2399 12.7932V17.064C33.2361 17.3278 33.0212 17.5389 32.7574 17.5389H31.8942C31.6265 17.5389 31.4079 17.3241 31.4079 17.0564L31.4004 12.7932C31.4004 12.5406 31.1968 12.3371 30.9443 12.3371H28.8786C28.626 12.3371 28.4225 12.5406 28.4225 12.7932V17.4711C28.4225 19.2465 29.689 20.5168 31.4682 20.5168C31.4682 20.5168 32.8026 20.5168 32.8441 20.5243C33.0853 20.5507 33.27 20.7543 33.27 21.0031C33.27 21.2481 33.0891 21.4516 32.8478 21.4818C32.8365 21.4818 32.8252 21.4856 32.8139 21.4893L29.7946 21.5006C29.542 21.5006 29.3385 21.7042 29.3385 21.9567V24.0186C29.3385 24.2712 29.542 24.4747 29.7946 24.4747H33.1683C34.9474 24.4747 36.214 23.2082 36.214 21.4328V12.7932C36.2178 12.5406 36.0142 12.3371 35.7616 12.3371ZM24.016 12.3484H21.1512C20.8986 12.3484 20.6913 12.5406 20.6913 12.7743V13.5772C20.6913 13.581 20.6913 13.5885 20.6913 13.5923C20.6913 13.5998 20.6913 13.6036 20.6913 13.6111V14.7118C20.6913 14.9606 20.9099 15.1679 21.1776 15.1679H23.9067C24.1215 15.2018 24.2912 15.3602 24.3175 15.6052V15.8728C24.2949 16.1065 24.1253 16.2761 23.918 16.295H22.5685C20.7705 16.295 19.4926 17.4899 19.4926 19.1636V21.5647C19.4926 23.2308 20.5933 24.4144 22.3763 24.4144H26.1193C26.7903 24.4144 27.3369 23.9056 27.3369 23.2798V15.4469C27.3369 13.5471 26.3568 12.3484 24.016 12.3484ZM24.3439 20.9654V21.2895C24.3439 21.3159 24.3402 21.3423 24.3364 21.3649C24.3326 21.3875 24.3251 21.4102 24.3175 21.4328C24.2535 21.6137 24.0725 21.7456 23.8577 21.7456H22.9982C22.7306 21.7456 22.512 21.5421 22.512 21.2895V20.9013C22.512 20.8975 22.512 20.89 22.512 20.8862V19.8496V19.5254V19.5217C22.512 19.2729 22.7306 19.0693 22.9982 19.0693H23.8577C24.1253 19.0693 24.3439 19.2729 24.3439 19.5254V20.9654ZM15.9606 12.3333H11.4486C11.1998 12.3333 11 12.5368 11 12.7818V14.8061C11 14.8098 11 14.8136 11 14.8174C11 14.8287 11 14.8362 11 14.8437V23.9998C11 24.2486 11.1847 24.4521 11.4184 24.4559H13.5218C13.7743 24.4559 13.9779 24.2523 13.9779 23.9998L13.9854 20.8636H15.9606C17.6116 20.8636 18.7651 19.7177 18.7651 18.0553V15.1453C18.7651 13.4867 17.6116 12.3333 15.9606 12.3333ZM15.7797 16.1178V17.3919C15.7797 17.6595 15.5648 17.8782 15.2972 17.8782H13.9892V15.3262H15.2972C15.5648 15.3262 15.7797 15.5411 15.7797 15.8087V16.1178Z" fill="#20336B"/>
              </svg>
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 27C6.05571 27 0 20.9443 0 13.5C0 6.05571 6.05571 0 13.5 0C20.9443 0 27 6.05571 27 13.5C27 20.9443 20.9443 27 13.5 27ZM13.5 1.92857C7.11643 1.92857 1.92857 7.11643 1.92857 13.5C1.92857 19.8836 7.11643 25.0714 13.5 25.0714C19.8836 25.0714 25.0714 19.8836 25.0714 13.5C25.0714 7.11643 19.8836 1.92857 13.5 1.92857Z" fill="#A9A9A9"/>
                <path d="M13.5 20.25C12.96 20.25 12.5357 19.8257 12.5357 19.2857V7.71429C12.5357 7.17429 12.96 6.75 13.5 6.75C14.04 6.75 14.4643 7.17429 14.4643 7.71429V19.2857C14.4643 19.8257 14.04 20.25 13.5 20.25Z" fill="#A9A9A9"/>
                <path d="M19.2857 14.4642H7.71429C7.17429 14.4642 6.75 14.0399 6.75 13.4999C6.75 12.9599 7.17429 12.5356 7.71429 12.5356H19.2857C19.8257 12.5356 20.25 12.9599 20.25 13.4999C20.25 14.0399 19.8257 14.4642 19.2857 14.4642Z" fill="#A9A9A9"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="tolls">
          <div className="th">Recent Tolls</div>
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
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => {modal.current?.dismiss();getBalance()}}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Add Funds</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonInput
                label="Enter your Amount"
                labelPlacement="stacked"
                ref={input}
                type="number"
                placeholder="Your amount"
              />
            </IonItem>
          </IonContent>
        </IonModal>
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