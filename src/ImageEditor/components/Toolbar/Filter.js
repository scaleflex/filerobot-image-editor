import React, { Component } from 'react';
import { EffectWrapper, EffectIcon, EffectLabel} from '../../styledComponents';
import { getLabel } from '../../utils';


export default class extends Component {


  render() {
    const { name } = this.props;

    return (
      <EffectWrapper>
        <EffectIcon src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrcsWUjkLk8aSllKeTSPFlr_b6r9sCdmzeU-xGMTBZJOXVwZR3'}/>
        <EffectLabel>{getLabel(name)}</EffectLabel>
      </EffectWrapper>
    )
  }
}