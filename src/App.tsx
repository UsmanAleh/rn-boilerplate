import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from '@/theme';
import ApplicationNavigator from '@/navigation/Application';

import store, { persistor } from '@/store';

function App() {
  return (
    <GestureHandlerRootView>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <ApplicationNavigator />
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}

export default App;
