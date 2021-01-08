import React from 'react';
import { render, screen } from '@testing-library/react';
import Test from './Test';
import Participants from '../components/Participants';

// Test

describe('Pain au chocolat ou chocolatine', () => {
  it('return Pain au chocolat', () => {
    expect(Test('Pain au chocolat')).toEqual('on dit Pain au chocolat');
  });
});

// describe('Participant Name', () => {
//   it('render one participant name', () => {
//     render(<Participants />);
//     expect(screen.getByText('Virgile Rietsch' && 'Mayana Bastard'));
//     // const allH3 = screen.getAllByRole('heading', { level: 3 })[0];
//     // expect(allH3).toEqual(<h3>Virgile Rietsch </h3>);
//   });
// });

// describe('Participants list', () => {
//   it('render the 5 participants', () => {
//     render(<Participants />);
//     expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(5);
//   });
// });
