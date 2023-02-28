import { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import BottomTab from './BottomTab';
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { ActivityIndicator } from 'react-native';
import { authentication } from '../firebase/firebase-config';

export default function RootNavigator() {
    const {user, setUser} = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // onAuthStateChanged returns an unsubscriber
      const unsubscribeAuthStateChanged = onAuthStateChanged (
        authentication,
        (authenticatedUser) => {
          authenticatedUser ? setUser(authenticatedUser) : setUser(null);
          setIsLoading(false);
        }
      );
  
      // unsubscribe auth listener on unmount
      return unsubscribeAuthStateChanged;
    }, [user]);
  
    if (isLoading) {
      return <ActivityIndicator/>
    };
    
    return (
        <NavigationContainer>
            { user ?  <BottomTab/> : <AuthStack/> }
        </NavigationContainer>
    )};