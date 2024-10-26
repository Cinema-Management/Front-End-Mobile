import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
export default function App() {
    return (
        <NavigationContainer>
            <QueryClientProvider client={queryClient}>
                <StackNavigator />
            </QueryClientProvider>
        </NavigationContainer>
    );
}
