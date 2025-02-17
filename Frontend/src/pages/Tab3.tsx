import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import background from "../eh2.png";

const Tab3: React.FC = () => {
  return (
    <IonPage className='okay'>
      <IonContent className='container' fullscreen>
        <div className="main" style={{ backgroundImage: `url(${background})` }}>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
