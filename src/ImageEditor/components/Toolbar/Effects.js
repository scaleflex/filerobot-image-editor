import React, { Component } from 'react';
import { EFFECTS } from '../../config';
import { EffectsWrapper } from '../../styledComponents';
import Effect from './Effect';


export default class extends Component {
  render() {
    return (
      <EffectsWrapper>
        {EFFECTS.map(name => <Effect key={name} name={name}/>)}
      </EffectsWrapper>
    )
  }
}