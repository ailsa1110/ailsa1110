/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, ReactElement } from 'react';
import dotenv from 'dotenv';
import { render, RenderOptions } from '@testing-library/react';
import 'whatwg-fetch';
import { Provider } from 'react-redux';
import { server } from '../../src/mocks/server';
import '@testing-library/jest-dom/extend-expect';
import { store } from '../../src/app/store';

const AllTheProviders: FC = ({ children, options }) => (
  <Provider store={store} {...options}>
    {children}
  </Provider>
);

const resetStore = () => {
  store.dispatch({ type: 'RESET_APP' });
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries' | 'providerProps'>) => render(ui, { wrapper: AllTheProviders, ...options });

// msw setup
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

dotenv.config({ });

export * from '@testing-library/react';

export { customRender as render, resetStore };
