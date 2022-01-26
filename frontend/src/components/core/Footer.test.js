import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '../../utils/test.utils';
import Footer from './Footer';

describe('When the header component is rendered', () => {
  test('Then texts should be on the component', () => {
    render(<Footer />);
    expect(screen.getByText(/Miguel/i)).toBeInTheDocument();
  });
});
