import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders learn react link', () => {
    render(<App />);

    const linkElement = screen.getByTestId('app-link');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('sample_page.learn_react');
  });
});
