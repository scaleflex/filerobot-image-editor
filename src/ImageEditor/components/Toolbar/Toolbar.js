import React, { Component } from 'react';
import { Toolbar } from '../../styledComponents';
import { TOOLS } from '../../config';
import Tool from './Tool';



export default class extends Component {
  render() {
    return (
      <Toolbar>
        {TOOLS.map(name => <Tool name={name} key={name}/>)}
      </Toolbar>
    )
  }
}