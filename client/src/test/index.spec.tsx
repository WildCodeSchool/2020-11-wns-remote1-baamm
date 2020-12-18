import React from 'react';
import { render, screen } from '@testing-library/react';
import Test from './Test';
import WaitingQueue from '../components/WaitingQueue';
import Participants from '../components/Participants';

// Test

describe('Pain au chocolat ou chocolatine', () => {
  it('return Pain au chocolat', () => {
    expect(Test('Pain au chocolat')).toEqual('on dit Pain au chocolat');
  });
});

describe('does it Render participants text test', () => {
  it('render the participant text', () => {
    render(<Participants />);
    // const allH3 = screen.getAllByRole('heading', { level: 3 })[0];
    // expect(allH3).toEqual(<h3>Virgile Rietsch </h3>);
    expect(screen.getByText('Virgile Rietsch' && 'Mayana Bastard'));
  });
});

describe('does it Render participants list', () => {
  it('render the participant', () => {
    render(<Participants />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(5);
  });
});
