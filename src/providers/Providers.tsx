import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '../store';

interface ProviderProps {
  children?: React.ReactNode;
}

const Providers = ({children}: ProviderProps) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default Providers;