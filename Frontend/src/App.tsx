import { Redirect, Route } from 'react-router-dom';
import {
  IonTitle,
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonContent,
  IonButton,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, homeOutline, carSportOutline, personOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

import { registerPlugin } from "@capacitor/core";
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
const BackgroundGeolocation:any = registerPlugin("BackgroundGeolocation")

setupIonicReact();

export default function App() {
  const [location, setLocation] = useState<any>(null);
  const [watchId, setWatchId] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (watchId) {
        BackgroundGeolocation.removeWatcher({ id: watchId });
      }
    };
  }, [watchId]);

  const startGeolocation = async () => {
    try {
      const id = await BackgroundGeolocation.addWatcher(
        {
          backgroundMessage: 'Tracking your location in the background.',
          requestPermissions: true,
          stale: true,
        },
        (position:any, error:any) => {
          if (error) {
            console.error('Geolocation error:', error);
            return;
          }
          setLocation(position);
        }
      );
      setWatchId(id);
    } catch (error) {
      console.error('Error starting geolocation:', error);
    }
  };

  const stopGeolocation = async () => {
    if (watchId) {
      await BackgroundGeolocation.removeWatcher({ id: watchId });
      setWatchId(null);
    }
  };  
  return (  
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/register">
              <Register/>
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={carSportOutline} />
              <IonLabel>History</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon aria-hidden="true" icon={personOutline} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      
    </IonApp>
  );
}