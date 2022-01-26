import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer
import projectStore from '../redux/project/project-reducer';
import viewerStore from '../redux/viewer/viewer-reducer';
import userStore from '../redux/user/user-reducer';
import imageStore from '../redux/image/image-reducer';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { projectStore, viewerStore, userStore, imageStore },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
