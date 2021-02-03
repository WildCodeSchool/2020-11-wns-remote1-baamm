import React from 'react';
import { render, screen } from '@testing-library/react';
import Test from './Test';
import Participants from '../components/Participants/Participants';

describe('Pain au chocolat ou Chocolatine', () => {
  it('return Chocolatine', () => {
    expect(Test('Chocolatine')).toEqual('on dit Chocolatine');
  });
});

describe('Participant Name', () => {
  it('render one participant name', () => {
    render(<Participants />);
    expect(screen.getByText('Virgile Rietsch' && 'Mayana Bastard'));
    // const allH3 = screen.getAllByRole('heading', { level: 3 })[0];
    // expect(allH3).toEqual(<h3>Virgile Rietsch </h3>);
  });
});

describe('Participants list', () => {
  it('render the 5 participants', () => {
    render(<Participants />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(5);
  });
});
