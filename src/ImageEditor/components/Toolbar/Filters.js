import React, { Component } from 'react';
import { FILTERS } from '../../config';
import { EffectsWrapper } from '../../styledComponents';
import Filter from './Filter';


export default class extends Component {
  render() {
    return (
      <EffectsWrapper>
        {FILTERS.map(name => <Filter key={name} name={name}/>)}
      </EffectsWrapper>
    )
  }
}