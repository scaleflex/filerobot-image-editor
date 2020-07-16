import React, { Component, createRef } from 'react';
import { PreviewCanvas } from '../styledComponents';
import { PREVIEW_CANVAS_ID } from '../config';


export default class CustomizedCanvas extends Component {
  _canvas;
  _context;
  _initArgs = {
    hidden: false,
  };

  constructor(props) {
    super(props);

    this.canvasRef = createRef();
    this.shapeResizingBoxRef = createRef();

    this.state = {
      selectedShape: {},
      resizeControlTarget: null,
    }
  }

  componentDidMount() {
    if (this.canvasRef && this.canvasRef.current && !this._canvas) {
      this._canvas = this.canvasRef.current;
      this._canvas.addEventListener('mousedown', this.onSelect);
      this._context = this._canvas.getContext('2d');

      this.props.updateState({
        shapeOperations: {
          addImage: this.addImage,
          addRect: this.addRect,
          addCircle: this.addCircle,
          addText: this.addText,
          updateShape: this.updateShape,
          deleteShape: this.deleteShapeByKeyOrIndex,
          deleteShapes: this.deleteShapesByType,
          setShapeVisibility: this.setShapeVisibilityByKeyOrIndex,
          getShape: this.getShapeByKeyOrIndex,
        }
      });
    }
  }

  componentWillUnmount() {
    this._canvas.removeEventListener('mousedown', this.onSelect);
  }

  updateState = (data, callback = () => {}) => {
    const { updateState } = this.props;
    updateState(data, callback);
  }

  pushShapeToShapes = (newShape) => {
    const { shapes } = this.props;
    const shapeIndex = shapes.length;

    this.updateState({
      shapes: [
        ...shapes,
        {
          ...newShape,
          index: shapeIndex
        }
      ]
    });

    return shapeIndex;
  }

  targettedShape = (index = undefined) => index || index === 0 ? this.props.shapes[index] : this.state.selectedShape;

  onSelect = (event) => {
    const { offsetX, offsetY } = event;
    const { shapes } = this.props;
    
    let foundShape = false;

    shapes.forEach(
      (shape) => {
        if (
            offsetX >= shape.x
            && offsetX <= shape.x + shape.width
            && offsetY >= shape.y
            && offsetY <= shape.y + shape.height
          ) {
            foundShape = true;

            this.setState({
              selectedShape: {
                ...shape,
                resizingBox: true,
                startEdgeOffset: {
                  x: offsetX - shape.x,
                  y: offsetY - shape.y,
                }
              }
            });

            this.activateResizingActions();
            this._canvas.addEventListener('keyup', this.activateShapeDeleting);
            this._canvas.addEventListener('mousemove', this.startDragging);
            this._canvas.addEventListener('mouseup', this.endDragging);
            this._canvas.addEventListener('mouseleave', this.endDragging);
          }
      }
    );

    // Remove the old event listeners incase clicked on no shapes after clicking on one before.
    if (!foundShape) {
      this.setState({ selectedShape: {} });
      this.disableResizingActions();
      this._canvas.removeEventListener('keyup', this.activateShapeDeleting);
      this._canvas.removeEventListener('mousemove', this.startDragging);
      this._canvas.removeEventListener('mouseup', this.endDragging);
      this._canvas.removeEventListener('mouseleave', this.endDragging);
    }
  }

  activateShapeDeleting = ({ key }) => {
    const { selectedShape } = this.state;

    if (
        (key === 'Delete' || key === 'Backspace')
        && selectedShape
    ) {
      this.deleteShapeByKeyOrIndex({ index: selectedShape.index });
      this.setState({ selectedShape: {} });
      this.disableResizingActions();
      this._canvas.removeEventListener('keyup', this.activateShapeDeleting);
    }
  }

  activateResizingActions = () => {
    document.addEventListener('click', this.disableResizingActions);

    Array.from(document.getElementsByClassName('shape-resizing-control'))
      .forEach((control) => {
        control.addEventListener('mousedown', this.trackShapeResize)
      });
  }

  trackShapeResize = ({ target }) => {
    this.setState({ resizeControlTarget: target });
    document.addEventListener('mousemove', this.handleShapeResizing);
    document.addEventListener('mouseup', this.disableResizingActions);
  }

  handleShapeResizing = ({ movementX, movementY, shiftKey }) => {
    const { selectedShape, resizeControlTarget } = this.state;
    if (!resizeControlTarget) { return; }
    
    let { index, width, height, x, y, oldX, oldY } = selectedShape;

    let oldWidth = width;
    let oldHeight = height;

    const { direction } = resizeControlTarget.dataset;
    const keepShapeRatio = (sameAxesIncSign) => {
      const ratio = width / height;
      if (Math.abs(movementX) >= Math.abs(movementY)) {
        const tempHeight = Math.abs(height - (width + movementX) / ratio);
        movementY = (!sameAxesIncSign ? -1 : 1) * Math.sign(movementX) * tempHeight;
      } else {
        const tempWidth = Math.abs(width - ((height + movementY) * ratio));
        movementX = (!sameAxesIncSign ? -1 : 1) * Math.sign(movementY) * tempWidth;
      }
    }
    const eastHandle = () => { width += movementX; }
    const southHandle = () => { height += movementY; }
    const westHandle = () => {
      width -= movementX;

      if (movementX < 0) {
        oldX += movementX;
        oldWidth -= movementX; // movementX would be (-ve) with another (-) would be added not subtracted.
      } else {
        oldX = x;
      }

      x += movementX;
    }
    const northHandle = () => {
      height -= movementY;

      if (movementY < 0) {
        oldY += movementY;
        oldHeight -= movementY; // movementY would be (-ve) with another (-) would be added not subtracted.
      } else {
        oldY = y;
      }

      y += movementY;
    }

    switch(direction) {
      case 'e':
        eastHandle();
      break;
      case 'w':
        westHandle();
      break;
      case 'n':
        northHandle();
      break;
      case 's':
        southHandle();
      break;
      case 'ne':
        if (shiftKey) { keepShapeRatio(false); }
        northHandle();
        eastHandle();
      break;
      case 'nw':
        if (shiftKey) { keepShapeRatio(true); }
        northHandle();
        westHandle();
      break;
      case 'se':
        if (shiftKey) { keepShapeRatio(true); }
        southHandle();
        eastHandle();
      break;
      case 'sw':
        if (shiftKey) { keepShapeRatio(false); }
        southHandle();
        westHandle();
      break;
      default:
      return;
    }

    const minWidthAndHeight = 15;
    if (height <= minWidthAndHeight || width <= minWidthAndHeight) { return; }

    const updatedShape = { width, height, x, y, oldX, oldY, oldWidth, oldHeight };

    this.setState({
      selectedShape: {
        ...selectedShape,
        ...updatedShape,
      }
    }, () => {
      this.updateShape(index, updatedShape)
    });
  }

  disableResizingActions = (e) => {
    if (e && this._canvas.contains(e.target)) { return; }
    document.removeEventListener('click', this.disableResizingActions);
    document.removeEventListener('mousemove', this.handleShapeResizing);
    document.removeEventListener('mouseup', this.disableResizingActions);

    this.setState({ selectedShape: {} })
    this.setState({ resizeControlTarget: null });
  }

  removeResizingBox = ({ offsetX, offsetY }) => {
    const { selectedShape } = this.state;
    if (
        offsetX < selectedShape.x
        || offsetX > selectedShape.x + selectedShape.width
        || offsetY < selectedShape.y
        || offsetY > selectedShape.y + selectedShape.height
    ) {
      this.setState({
        selectedShape: { ...selectedShape, resizingBox: false, oldWidth: undefined, oldHeight: undefined }
      });

      this._canvas.removeEventListener('click', this.removeResizingBox);
    }
  }

  startDragging = (event) => {
    const { selectedShape } = this.state;
    
    // event.offsetX - startEdgeOffset.x for the shape's X from its starting point not the exact mouse position.
    this.setState({
      selectedShape: {
        ...selectedShape,
        oldWidth: undefined,
        oldHeight: undefined,
        oldX: selectedShape.x,
        oldY: selectedShape.y,
        x: event.offsetX - selectedShape.startEdgeOffset.x,
        y: event.offsetY - selectedShape.startEdgeOffset.y
      }
    }, () => {
      this.updateShape(selectedShape.index, this.state.selectedShape);
    });
  }

  endDragging = () => {
    this._canvas.removeEventListener('mousemove', this.startDragging);
    this._canvas.removeEventListener('mouseup', this.endDragging);
    this._canvas.removeEventListener('mouseleave', this.endDragging);
    this._canvas.addEventListener('click', this.removeResizingBox);
  }

  getCanvasCenter = (reduceWidthBy = 0, reduceHeightBy = 0) => {
    const centeredX = (this._canvas.width / 2) - reduceWidthBy;
    const centeredY = (this._canvas.height / 2) - reduceHeightBy;

    return [centeredX, centeredY];
  }

  // All the repeated operations are passed here around the draw function.
  draw = (drawFn, { opacity = 1.0, hidden }) => {
    if (hidden) { return; }

    this._context.globalAlpha = +opacity;
    drawFn();
  }

  redrawShape = (index = undefined) => {
    const shape = this.targettedShape(index);
    
    this._context.clearRect(
      shape.oldX || shape.x,
      shape.oldY || shape.y,
      shape.oldWidth || shape.width,
      shape.oldHeight || shape.height
    );

    switch(shape.variant) {
      case 'image':
        this.drawImage(shape);
        break;
      case 'rect':
        this.drawRect(shape);
        break;
      case 'circle':
        this.drawCircle(shape);
        break;
      case 'text':
        this.drawText(shape);
      default:
        return;
    }
  }

  drawRect = ({ x, y, width, height, opacity, hidden }) => {
    this.draw(() => {
      this._context.fillRect(x, y, width, height);
    }, { opacity, hidden });
  }

  drawCircle = ({ x, y, radius, opacity, hidden }) => {
    this.draw(() => {
      this._context.beginPath();
      this._context.arc(x, y, radius, 0, 2 * Math.PI);
      this._context.stroke();
    }, { opacity, hidden });
  }

  drawImage = ({ img, x, y, opacity, width, height, hidden }) => {
    this.draw(() => {
      this._context.drawImage(img, x, y, width, height);
    }, { opacity, hidden });
  }

  drawText = ({ color, textSize, textFont, text, x, y, opacity, hidden })  => {
    this.draw(() => {
      this._context.fillStyle = color;
      this._context.textAlign = "start";
      this._context.textBaseline = "middle";
      this._context.font = `${textSize}px ${textFont}`;
      this._context.fillText(text, x, y, this._canvas.width);
    }, { opacity, hidden })
  }

  // TODO: add other shapes variants...

  addRect = ({ x, y, width = 100, height = 75, ...others }) => {
    const [centerX, centerY] = this.getCanvasCenter(width / 2, height / 2);

    const drawingArgs = { x: x || centerX, y: y || centerY, width, height };
    const allArgs = { ...this._initArgs, ...others, ...drawingArgs };

    if (others.key && this.replaceShapeIfExisted(others.key, allArgs)) { return; }

    this.drawRect(drawingArgs);
    
    const index = this.pushShapeToShapes({
      ...allArgs,
      variant: 'rect',
    });

    this.setState({
      selectedShape: { ...allArgs, index, resizingBox: true }
    }, this.activateResizingActions);
  }

  addCircle = ({ x, y, radius = 25, ...others }) => {
    const [centerX, centerY] = this.getCanvasCenter(radius, radius);

    const drawingArgs = { x: x || centerX, y: y || centerY, radius };
    const allArgs = { ...this._initArgs, ...others, ...drawingArgs };

    if (others.key && this.replaceShapeIfExisted(others.key, allArgs)) { return; }

    this.drawCircle(drawingArgs);

    const index = this.pushShapeToShapes({
      ...allArgs,
      variant: 'circle'
    });

    this.setState({
      selectedShape: { ...allArgs, index, resizingBox: true }
    }, this.activateResizingActions);
  }

  addImage = ({ img, x = undefined, y = undefined, opacity = 1.0, ...others }) => {
    if(img) {
      const width = img.width;
      const height = img.height;
      const [centerX, centerY] = this.getCanvasCenter(width / 2, height / 2);

      const drawingArgs = {
        img, opacity, width, height,
        originalWidth: width,
        originalHeight: height,
        x: x || centerX,
        y: y || centerY
      };

      const allArgs = { ...this._initArgs, ...others, ...drawingArgs };

      if (others.key && this.replaceShapeIfExisted(others.key, allArgs)) { return; }

      this.drawImage(drawingArgs);

      const index = this.pushShapeToShapes({
        ...allArgs,
        variant: 'image'
      });

      this.setState({
        selectedShape: { ...allArgs, index, resizingBox: true }
      }, this.activateResizingActions);
    }
  }

  addText = ({
    text, textSize = 62, color = "#000000", textFont = 'Arial', x = undefined, y = undefined, ...others
  }) => {
    const metrics = this._context.measureText(text);
    const { width } = metrics;
    const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const [centerX, centerY] = this.getCanvasCenter(width / 2, height / 2);

    if (text) {
      const drawingArgs = { x: x || centerX, y: y || centerY, opacity };
      const allArgs = { ...this._initArgs, ...others, ...drawingArgs };

      if (others.key && this.replaceShapeIfExisted(others.key, allArgs)) { return; }

      this.drawText(drawingArgs);

      const index = this.pushShapeToShapes({
        ...allArgs,
        variant: 'text'
      });

      this.setState({
        selectedShape: { ...allArgs, index, resizingBox: true }
      }, this.activateResizingActions);
    }
  }

  getShapeByKeyOrIndex = ({ key: shapeKey, index: shapeIndex }) => {
    if (!shapeKey && !shapeIndex) { return false; }
    const { shapes } = this.props;

    return shapeIndex ? shapes[shapeIndex] : shapes.filter(({ key }) => key === shapeKey)[0];
  }

  replaceShapeIfExisted = (key, args) => {
    const shape = this.getShapeByKeyOrIndex({ key });

    if (shape) {
      args = { ...args, x: shape.x, y: shape.y, width: shape.width, height: shape.height };
      this.updateShape(shape.index, args)

      return true;
    }

    return false;
  }

  setShapeVisibilityByKeyOrIndex = ({ key, index }, isHidden = undefined) => {
    const shape = this.getShapeByKeyOrIndex({ key, index });
    
    if (shape && isHidden !== undefined && shape.hidden !== isHidden) {
      this.updateShape(shape.index, { hidden: isHidden });
    }
  }

  getShapesIndexByAnyProp = (propertyName, propertyValue) => {
    const { shapes } = this.props;
    
    if (shapes && shapes.length === 0) { return []; }

    const shapesIndicies = [];

    shapes
      .filter(({ [propertyName]: filterProp }, index) => {
        if (filterProp === propertyValue) {
          shapesIndicies.push(index);
          return true;
        }

        return false;
      });

    return shapesIndicies;
  }

  updateShape = (index, updatedData) => {
    const { shapes } = this.props;

    if (shapes[index]) {
      const latestShapes = shapes;
      latestShapes[index] = { ...latestShapes[index], ...updatedData };

      this.updateState({ shapes: latestShapes }, () => {
        this.redrawShape(index);
      });
    }
  }

  eraseShape = (index = undefined) => {
    const { x, y, width, height } = this.targettedShape(index);
    this._context.clearRect(x, y, width, height);
  }
  
  eraseAndRemoveShapeFromArray = (index, shapes) => {
    this.eraseShape(index);
    shapes.splice(index, 1);

    return shapes;
  }

  deleteShapeByKeyOrIndex = ({ index, key }) => {
    if (!index && index !== 0 && !key) { return; }

    const { shapes } = this.props;
    const shapeIndex = index || index === 0 ? index : (this.getShapeByKeyOrIndex({ key }) || {}).index;

    if (shapeIndex || shapeIndex === 0) {
      this.updateState({
        shapes: this.eraseAndRemoveShapeFromArray(shapeIndex, shapes)
      });
    }
  }

  deleteShapes = (indicies = []) => {
    let { shapes } = this.props;
    indicies.forEach(i => {
      shapes = this.eraseAndRemoveShapeFromArray(i, shapes)
    });

    this.updateState({
      shapes
    });
  }

  deleteShapesByType = ({ type }) => {
    if (!type) { return; }

    const shapesIndicies = this.getShapesIndexByAnyProp('type', type);
    if (shapesIndicies.length > 0) { this.deleteShapes(shapesIndicies); }
  }


  render() {
    const { height: parentCanvasHeight, width: parentCanvasWidth } = this.props
    const { selectedShape: { width = 0, height = 0, x = 0, y = 0, resizingBox = false } } = this.state;
    const resizingBoxLines = ['e', 'n', 'w', 's'];
    const resizingBoxPoints = ['e', 'n', 'w', 's', 'ne', 'nw', 'sw', 'se'];
    const left = (this._canvas ? this._canvas.offsetLeft : 0) + x;
    const top = (this._canvas ? this._canvas.offsetTop : 0 ) + y;
    const mutualStyles = { pointerEvents: 'all' };

    return (
      <>
        <PreviewCanvas
          ref={this.canvasRef}
          id={PREVIEW_CANVAS_ID}
          width={parentCanvasWidth}
          height={parentCanvasHeight}
          tabIndex={1}
        />

        <div
          ref={this.shapeResizingBoxRef}
          className="cropper-crop-box"
          style={{ display: resizingBox ? 'block' : 'none', width, height, left, top, pointerEvents: 'none' }}
        >
          {resizingBoxLines.map((l) => (
            <span
              key={l}
              className={`cropper-line line-${l} shape-resizing-control`}
              data-direction={l}
              style={mutualStyles}
            ></span>
            )
          )}
          {resizingBoxPoints.map((p) => (
            <span
              key={p}
              className={`cropper-point point-${p} shape-resizing-control`}
              data-direction={p}
              style={mutualStyles}
            ></span>
            )
          )}
        </div>
      </>
    );
  }

}
