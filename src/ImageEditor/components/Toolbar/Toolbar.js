import React, { Component } from 'react';
import { Toolbar } from '../../styledComponents';
import { TOOLS } from '../../config';
import Tool from './Tool';
import Effects from './Effects';
import Filters from './Filters';
import Crop from './Crop';


export default class extends Component {
  render() {
    const { activeTab } = this.props;

    return (
      <Toolbar>
        {!activeTab && TOOLS.map(name => <Tool name={name} key={name} {...this.props}/>)}

        {activeTab === 'effects' && <Effects {...this.props}/>}
        {activeTab === 'filters' && <Filters {...this.props}/>}
        {activeTab === 'crop' && <Crop {...this.props}/>}
      </Toolbar>
    )
  }
}