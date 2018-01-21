import React, { Component } from 'react';
import { ToolWrapper, ToolIcon, ToolLabel } from '../../styledComponents/index';


export default class extends Component {
  render() {
    const { name, activeTab } = this.props;

    return (
      <ToolWrapper
        active={activeTab === name}
        onClick={this.props.updateState.bind(this, { activeTab: name })}
      >
        <ToolIcon name={name}/>
        <ToolLabel>{name}</ToolLabel>
      </ToolWrapper>
    )
  }
}