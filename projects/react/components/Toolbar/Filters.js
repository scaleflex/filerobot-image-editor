import React, { Component } from 'react';
import { FILTERS } from '../../config';
import { EffectsWrapper } from '../../styledComponents';
import Filter from './Filter';


export default class extends Component {
  render() {
    const { onApplyFilters, filter } = this.props;

    return (
      <EffectsWrapper>
        {FILTERS.map(name => <Filter active={filter} key={name} name={name} onApplyFilters={onApplyFilters}/>)}
      </EffectsWrapper>
    )
  }
}