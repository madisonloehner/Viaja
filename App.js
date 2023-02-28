import 'react-native-gesture-handler';
import React from 'react';
import { AuthenticatedUserProvider } from './providers/AuthenticatedUserProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNav';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Asyncstorage: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {

  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider style = {{flex:1}}>
        <RootNavigator/>
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
}

