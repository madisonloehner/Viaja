import { getStatusBarHeight } from 'react-native-status-bar-height';

export const textOptions = {
    biggerThanHeaderText: {
      fontSize: 40,
      color: '#05B479',
      fontWeight: '600',
      marginBottom: 20,
    },

    headingText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#05B479',
      textAlign: 'center',
      marginBottom: 20,
    },

    mediumText: {
      color: '#505050',
      fontSize: 16,
      marginVertical: 10, 
      textAlign: 'center'
    },

    buttonTxt: {
      color: 'white',
      fontSize: 12,
      textAlign: 'center'
    },

    mediumBoldText: {
    color: '#505050',
    fontSize: 16,
    marginVertical: 10, 
    fontWeight: 'bold',
    },    
 
    empahsistText: {
      color: '#05B479',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },

    errorMessage: {
      color: 'red',
      marginTop: 10,
      fontSize: 10,
    },

    locationText: {
      color: '#505050',
      fontSize: 20, 
      textAlign: 'center',
    }, 

    checkIn: {
        color: '#505050',
        fontSize: 20, 
        fontWeight: 'bold'
    },

    locationHeadingText: {
      color: '#05B479',
      fontSize: 16,
      fontWeight: 'bold',
    }, 

    usernameText: {
      fontSize: 16,
      color: '#B7B7B7'
    },
    nameText: {
      fontSize: 16,
      color: '#505050'
    },
    bigWhiteTxt: {
      color: '#505050',
      fontSize: 20,
    }
}

export const parameters = {
    statusBarHeight: getStatusBarHeight(),
    headerHeight: 70,
  };