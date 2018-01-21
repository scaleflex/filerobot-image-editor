import React, { Component } from 'react';
//const Caman = require('caman').Caman;
const { Image } = require('canvas');

export default class ImageManipulator extends Component {
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    //Caman('#scaleflex-image-edit-box', function () {
    //  //this.brightness(10);
    //  //this.contrast(30);
    //  //this.sepia(60);
    //  //this.saturation(-30);
    //  //this.render();
    //});
  }

  render() {
    return (
      <img
        id="scaleflex-image-edit-box"
        src="//jolipage.api.airstore.io/v1/get/_/9b9443fd-810a-5540-9672-cd911c1c6c40/main_photo_2.jpg"
      />
    )
  }
}