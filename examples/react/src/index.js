import React, { Component } from 'react';
import { render } from 'react-dom';
import FilerobotImageEditor from '../../../projects/react';


const config = {
  filerobotUploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
  filerobotContainer: 'scaleflex-tests-v5a',
  processWithCloudimage: false,
  uploadWithCloudimageLink: false,
  cloudimageToken: 'demo'
  // elementId: '',
  // hideCloudimageSwitcher: false,
  // uploadParams: {},
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      isShow: false,
      imgSrc: '//scaleflex.ultrafast.io/https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/koala.jpg'
    }
  }

  showImageEditor = () => {
    this.setState({ isShow: true });
  }

  onUpload = (newUrl) => {
    this.setState({ imgSrc: newUrl });
  }

  onClose = () => {
    this.setState({ isShow: false });
  }

  render() {
    const { imgSrc, isShow } = this.state;

    return (
      <div>
        <h1>Filerobot Image Editor</h1>

        <img src={imgSrc} onClick={this.showImageEditor} alt="example image"/>

        <FilerobotImageEditor
          show={isShow}
          src={imgSrc}
          config={config}
          onUpload={this.onUpload}
          onClose={this.onClose}
        />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));