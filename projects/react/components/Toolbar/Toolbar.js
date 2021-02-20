import { Component } from 'react';
import { Toolbar, NoClickOverlay, NoClickToolbar } from '../../styledComponents';
import Tool from './Tool';
import Effects from './Effects';
import Filters from './Filters';
import Crop from './Crop';
import Resize from './Resize';
import Orientation from './Orientation';
import Adjust from './Adjust';
import Watermark from './Watermark';
import FocusPoint from './FocusPoint';
import Shapes from './Shapes';
import Image from './Image';
import Text from './Text';


export default class extends Component {
  render() {
    const { activeTab, isShowSpinner, activeBody, config } = this.props;
    const { tools } = config;

    return (
      <Toolbar overlayYHidden={activeTab !== 'watermark'}>
        {!activeTab && tools.map(name => <Tool name={name} key={name} {...this.props}/>)}
        {activeTab === 'adjust' && <Adjust {...this.props}/>}
        {activeTab === 'effects' && <Effects {...this.props}/>}
        {activeTab === 'filters' && <Filters {...this.props}/>}
        {activeTab === 'rotate' && <Orientation {...this.props}/>}
        {activeTab === 'crop' && <Crop {...this.props}/>}
        {activeTab === 'resize' && <Resize {...this.props}/>}
        {activeTab === 'watermark' && <Watermark {...this.props}/>}
        {activeTab === 'focus_point' && <FocusPoint {...this.props}/>}
        {activeTab === 'shapes' && <Shapes {...this.props}/>}
        {activeTab === 'image' && <Image {...this.props}/>}
        {activeTab === 'text' && <Text {...this.props}/>}
        {(isShowSpinner) && <NoClickOverlay/>}
        {activeBody !== 'preview' && <NoClickToolbar/>}
      </Toolbar>
    )
  }
}