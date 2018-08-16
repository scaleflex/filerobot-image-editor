import React, { Component } from 'react';
import { Toolbar, NoClickOverlay } from '../../styledComponents';
import { TOOLS, CLOUDIMAGE_OPERATIONS } from '../../config';
import Tool from './Tool';
import Effects from './Effects';
import Filters from './Filters';
import Crop from './Crop';
import Resize from './Resize';
import Orientation from './Orientation';
import Adjust from './Adjust';


export default class extends Component {
  render() {
    const { activeTab, processWithCloudimage, isShowSpinner } = this.props;
    let allowedTools = TOOLS;

    if (processWithCloudimage)
      allowedTools = TOOLS.filter(tool => CLOUDIMAGE_OPERATIONS.indexOf(tool) > -1);

    return (
      <Toolbar>
        {!activeTab && allowedTools.map(name => <Tool name={name} key={name} {...this.props}/>)}
        {activeTab === 'effects' && <Effects {...this.props}/>}
        {activeTab === 'filters' && <Filters {...this.props}/>}
        {activeTab === 'crop' && <Crop {...this.props}/>}
        {activeTab === 'resize' && <Resize {...this.props}/>}
        {activeTab === 'orientation' && <Orientation {...this.props}/>}
        {activeTab === 'adjust' && <Adjust {...this.props}/>}
        {isShowSpinner && <NoClickOverlay/>}
      </Toolbar>
    )
  }
}