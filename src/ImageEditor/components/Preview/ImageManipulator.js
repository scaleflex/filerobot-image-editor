import React, { Component } from 'react';
//const Caman = require('caman').Caman;
//const { Image } = require('canvas');

export default class ImageManipulator extends Component {
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    console.log(window.Caman)
    //window.Caman('#scaleflex-image-edit-box', function () {
    //  debugger;
    //  this.brightness(5).render();
    //});
    var canvas = document.getElementById('scaleflex-image-edit-box');
    var ctx = canvas.getContext('2d');

    /* Enable Cross Origin Image Editing */
    var img = new Image();
    img.crossOrigin = '';
    img.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/koala.jpg';

    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    }

    var $brightness = document.getElementById('brightnessbtn');

    /* In built filters */
    $brightness.addEventListener('click', function(e) {
      window.Caman('#scaleflex-image-edit-box', function() {
        this.brightness(30).render();
      });
    });
  }

  render() {
    return (
      <div>
        <canvas id="scaleflex-image-edit-box"/>
        <button id="brightnessbtn">Brightness</button>
      </div>
    )
  }
}