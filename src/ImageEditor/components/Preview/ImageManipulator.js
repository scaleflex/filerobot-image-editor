import React, { Component } from 'react';
import { Canvas } from '../../styledComponents';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';


export default class ImageManipulator extends Component {
  constructor(props) {
    super();

    this.state = { ...props };
  }

  shouldComponentUpdate() { return false; }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeTab !== this.state.activeTab) {
      if (this.state.activeTab) this.destroyMode(this.state.activeTab);

      this.changeTab(nextProps.activeTab);
    }

    this.setState({ ...nextProps });
  }

  componentDidMount() {
    this.props.updateState({
      isShowSpinner: true,
      applyChanges: this.applyChanges,
      applyOperations: this.applyOperations
    });
    const canvas = this.getCanvasNode();
    const ctx = canvas.getContext('2d');

    /* Enable Cross Origin Image Editing */
    const img = new Image();
    img.crossOrigin = '';
    img.src = '//scaleflex.ultrafast.io/https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/koala.jpg';

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      this.props.updateState({ isShowSpinner: false });
      this.setState({ originalWidth: img.width, originalHeight: img.height, originalImage: img })
    }

    //var $brightness = document.getElementById('brightnessbtn');
    ////
    /////* In built filters */
    //$brightness.addEventListener('click', (e) => {
    //  window.Caman(this.canvas, function() {
    //    this.brightness(30).render();
    //    this.crop(100, 100, 0, 0);
    //  });
    //});
  }

  getCanvasNode = () => document.getElementById('scaleflex-image-edit-box');

  initEffects = () => {}

  initFilters = () => {}

  initAdjust = () => {}

  initCrop = () => {
    const canvas = this.getCanvasNode();

    this.cropper = new Cropper(canvas, {
      viewMode: 1,
      modal: false,
      background: false,
      rotatable: false,
      scalable: false,
      zoomable: false,
      movable: false,
      crop: event => { this.setState({ cropDetails: event.detail }); }
    });
  }

  initResize = () => {}

  initOrientation = () => {}

  destroyCrop = () => {
    this.cropper.destroy();
  }

  destroyAll = () => {}

  applyCanvasChanges = () => {}

  applyCrop = () => {
    const { cropDetails, operations } = this.state;
    const { width, height, x, y } = cropDetails;
    const canvas = this.getCanvasNode();
    let operation = {
      stack: [
        { name: 'crop', arguments: [width, height, x, y] },
        { name: 'render', arguments: [] }
      ]
    };
    operations.push(operation);
    this.destroyCrop();

    window.Caman(canvas, function () {
      const caman = this;

      operation.stack.forEach(handler => { caman[handler.name](...handler.arguments); });
    });

    this.props.updateState({ isHideCanvas: false, activeTab: null, operations, currentOperation: operation });
  }

  applyOperations = (operations = [], operationIndex) => {
    this.revert();
    const canvas = this.getCanvasNode();

    operations.forEach((operation, index) => {
      window.Caman(canvas, function () {
        if (operationIndex < index) return;

        const caman = this;

        operation.stack.forEach(handler => { caman[handler.name](...handler.arguments); });
      });
    });

    setTimeout(() => {
      this.props.updateState({ isHideCanvas: false, currentOperation: operations[operationIndex] });
    })
  }

  applyOrientation = () => {}

  applyResize = () => {}

  revert = () => {
    const { originalWidth, originalHeight, originalImage } = this.state;
    const canvas = this.getCanvasNode();
    const ctx = canvas.getContext('2d');

    window.Caman(canvas, function () {
      const caman = this;

      caman.revert(true);
      canvas.width = originalWidth;
      canvas.height = originalHeight;
      ctx.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
    });
  }

  render() { return <Canvas id="scaleflex-image-edit-box"/>; }

  applyChanges = (activeTab) => {
    switch (activeTab) {
      case 'effects':
      case 'filters':
      case 'adjust':
        this.applyCanvasChanges();
        break;
      case 'crop':
        this.applyCrop();
        break;
      case 'orientation':
        this.applyOrientation();
        break;
      case 'resize':
        this.applyResize();
        break;
    }
  }

  changeTab = (name) => {
    switch (name) {
      case 'effects':
        this.initEffects();
        break;
      case 'filters':
        this.initFilters();
        break;
      case 'adjust':
        this.initAdjust();
        break;
      case 'crop':
        this.initCrop();
        break;
      case 'resize':
        this.initResize();
        break;
      case 'orientation':
        this.initOrientation();
        break;
      default:
        this.destroyAll();
    }
  }

  destroyMode = (name) => {
    switch (name) {
      case 'effects':
        break;
      case 'filters':
        break;
      case 'adjust':
        break;
      case 'crop':
        this.destroyCrop();
        break;
      case 'resize':
        break;
      case 'orientation':
        break;
    }
  }
}

{/*<div style={{ display: 'inline-block', verticalAlign: 'top'}}>*/}
{/*<button id={'brightnessbtn'} style={{ position: 'absolute', top: 10, right: 100 }}>Brrritness</button>*/}
{/*<button style={{ position: 'absolute', top: 10, right: 10 }} onClick={() => { this.cropper.destroy(); this.forceUpdate() }}>Boom</button>*/}
{/*<button id={'brightnessbtn'} style={{ position: 'absolute', top: 10, right: 100 }}>Brrritness</button>*/}
{/*</div>*/}