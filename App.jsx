import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { TimerProvider } from './src/utils/TimerContext';
const queryClient = new QueryClient();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <NavigationContainer>
                        <TimerProvider>
                            <StackNavigator />
                            <Toast />
                        </TimerProvider>
                    </NavigationContainer>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    );
}
