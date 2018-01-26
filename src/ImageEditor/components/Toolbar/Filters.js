import React, { Component } from 'react';
import { FILTERS } from '../../config';
import { EffectsWrapper } from '../../styledComponents';
import Filter from './Filter';


export default class extends Component {
  render() {
    const { onApplyEffects } = this.props;

    return (
      <EffectsWrapper>
        {FILTERS.map(name => <Filter key={name} name={name} onApplyEffects={onApplyEffects}/>)}
      </EffectsWrapper>
    )
  }
}