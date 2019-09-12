import React, { Component } from 'react';
import { Toolbar, NoClickOverlay, NoClickToolbar } from '../../styledComponents';
import { TOOLS, CLOUDIMAGE_OPERATIONS } from '../../config';
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
    const { activeTab, processWithCloudimage, isShowSpinner, activeBody } = this.props;
    let allowedTools = TOOLS;

    if (processWithCloudimage)
      allowedTools = TOOLS.filter(tool => CLOUDIMAGE_OPERATIONS.indexOf(tool) > -1);

    return (
      <Toolbar>
        {!activeTab && allowedTools.map(name => <Tool name={name} key={name} {...this.props}/>)}
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