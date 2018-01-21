import React, { Component } from 'react';
import { ToolWrapper, ToolIcon, ToolLabel } from '../../styledComponents/index';


export default class extends Component {
  render() {
    const { name } = this.props;

    return (
      <ToolWrapper>
        <ToolIcon name={name}/>
        <ToolLabel>{name}</ToolLabel>
      </ToolWrapper>
    )
  }
}