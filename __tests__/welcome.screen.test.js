import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '../screens/WelcomeScreen';

test('rendering Welcome Screen component', async () => {
    const {debug} = render(<WelcomeScreen/>);
    debug();
});