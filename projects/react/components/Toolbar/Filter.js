import { Component } from 'react';
import { EffectWrapper, EffectIcon, EffectLabel} from '../../styledComponents';
import { getIcon, getLabel } from '../../utils';


export default class extends Component {


  render() {
    const { active, name, onApplyFilters } = this.props;

    return (
      <EffectWrapper active={active === name} onClick={onApplyFilters.bind(null, name)}>
        <EffectIcon src={getIcon(name)}/>
        <EffectLabel>{getLabel(name)}</EffectLabel>
      </EffectWrapper>
    )
  }
}