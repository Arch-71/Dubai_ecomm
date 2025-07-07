'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '@/redux/store'

export function Providers({ children }) {
  // Only render PersistGate on the client
  if (typeof window === 'undefined') {
    return <Provider store={store}>{children}</Provider>;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}