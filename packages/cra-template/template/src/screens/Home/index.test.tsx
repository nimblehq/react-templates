import React from 'react';

import { render, screen } from '@testing-library/react';

import HomeScreen from '.';

describe('HomeScreen', () => {
  it('renders learn react link', () => {
    render(<HomeScreen />);

    const linkElement = screen.getByTestId('app-link');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('sample_page.learn_react');
  });
});
