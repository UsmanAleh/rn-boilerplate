import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from '@/theme';
import ApplicationNavigator from '@/navigation/Application';

import '@/translations';

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from '@/store';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

function App() {
  return (
    <GestureHandlerRootView>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <ApplicationNavigator />
            </ThemeProvider>
          </QueryClientProvider>
        </PersistGate>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}

export default App;
