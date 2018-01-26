import React, { Component } from 'react';
import { EffectWrapper, EffectIcon, EffectLabel} from '../../styledComponents';
import { getIcon, getLabel } from '../../utils';


export default class extends Component {


  render() {
    const { name, onApplyEffects } = this.props;

    return (
      <EffectWrapper onClick={onApplyEffects.bind(null, name)}>
        <EffectIcon src={getIcon(name)}/>
        <EffectLabel>{getLabel(name)}</EffectLabel>
      </EffectWrapper>
    )
  }
}