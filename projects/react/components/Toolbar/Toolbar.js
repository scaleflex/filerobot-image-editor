import React, { Component } from 'react';
import { Toolbar, NoClickOverlay, NoClickToolbar } from '../../styledComponents';
import Tool from './Tool';
import Effects from './Effects';
import Filters from './Filters';
import Crop from './Crop';
import Resize from './Resize';
import Orientation from './Orientation';
import Adjust from './Adjust';
import Watermark from './Watermark';


export default class extends Component {
  render() {
    const { activeTab, isShowSpinner, activeBody, config } = this.props;
    const { tools } = config;

    return (
      <Toolbar>
        {!activeTab && tools.map(name => <Tool name={name} key={name} {...this.props}/>)}
        {activeTab === 'adjust' && <Adjust {...this.props}/>}
        {activeTab === 'effects' && <Effects {...this.props}/>}
        {activeTab === 'filters' && <Filters {...this.props}/>}
        {activeTab === 'rotate' && <Orientation {...this.props}/>}
        {activeTab === 'crop' && <Crop {...this.props}/>}
        {activeTab === 'resize' && <Resize {...this.props}/>}
        {activeTab === 'watermark' && <Watermark {...this.props}/>}
        {(isShowSpinner) && <NoClickOverlay/>}
        {activeBody !== 'preview' && <NoClickToolbar/>}
      </Toolbar>
    )
  }
}