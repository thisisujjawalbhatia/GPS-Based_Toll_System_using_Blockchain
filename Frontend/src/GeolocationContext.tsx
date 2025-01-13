import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { registerPlugin } from "@capacitor/core";

const BackgroundGeolocation:any = registerPlugin("BackgroundGeolocation")


// Define the context interface
interface GeolocationContextProps {
    location: { latitude: number; longitude: number } | null;
    startTracking: () => void;
    stopTracking: () => void;
    token: string | null;
    username: string | null;
    id: number | null;
    setId: React.Dispatch<React.SetStateAction<number | null>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  }
  
  // Define the provider props, including children
  interface GeolocationProviderProps {
    children: ReactNode;
  }
  
  // Create the context
  const GeolocationContext = createContext<GeolocationContextProps | undefined>(undefined);
  
  // Create a provider component
  export const GeolocationProvider: React.FC<GeolocationProviderProps> = ({ children }) => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [watchId, setWatchId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [username,setUsername] = useState<string | null>(null);
    const [id,setId] = useState<number | null>(null);
    useEffect(() => {
      // Cleanup when the component is unmounted
      return () => {
        if (watchId) {
          BackgroundGeolocation.removeWatcher({ id: watchId });
        }
      };
    }, [watchId]);
  
    // Start tracking the user's location
    const startTracking = async () => {
      try {
        const id = await BackgroundGeolocation.addWatcher(
          {
            backgroundMessage: 'Tracking your location in the background.',
            requestPermissions: true,
            stale: true,
            distanceFilter: 10,
            notificationTitle: 'Location Monitoring Active',
            notificationText: 'Your location is being monitored.',
            notificationIconColor: '#FF0000',
            notificationSmallIcon: 'ic_launcher', 
            notificationLargeIcon: 'ic_launcher',
          },
          (position:any, error:any) => {
            if (error) {
              console.error('Geolocation error:', error);
              return;
            }
            if (position) {
              setLocation({ latitude: position.latitude, longitude: position.longitude });
            }
          }
        );
        setWatchId(id);
      } catch (error) {
        console.error('Error starting geolocation:', error);
      }
    };
  
    // Stop tracking the user's location
    const stopTracking = async () => {
      if (watchId) {
        await BackgroundGeolocation.removeWatcher({ id: watchId });
        setWatchId(null);
      }
    };
  
    return (
      <GeolocationContext.Provider value={{ setToken,setUsername,setId,username,token,id,location, startTracking, stopTracking }}>
        {children}
      </GeolocationContext.Provider>
    );
  };
  
  // Create a custom hook to use the geolocation context
  export const useGeolocation = () => {
    const context = useContext(GeolocationContext);
    if (context === undefined) {
      throw new Error('useGeolocation must be used within a GeolocationProvider');
    }
    return context;
  };