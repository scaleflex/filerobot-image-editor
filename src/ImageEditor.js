import React, { Component } from 'react';
import Radium from 'radium';
import Cropper from 'react-cropper';


class ImageEditor extends Component {
  crop() {
    console.log(this.refs.cropper.getData());
  }

  render() {
    return (
      <div>
        Image Editor comes soon

        <button onClick={this.crop.bind(this)}>Crop</button>

        <Cropper
          ref='cropper'
          src='http://jolipage.api.airstore.io/v1/get/_/98262867-b05c-5d66-bc75-5cc8fa03a38c/iphone-smartphone.jpg'
          style={{height: '80%', width: '100%'}}
          // Cropper.js options
          viewMode={2}
          //aspectRatio={16 / 9}
          //guides={false}
          //crop={this.crop.bind(this)}
        />
      </div>
    );
  }
}

export default ImageEditor;
