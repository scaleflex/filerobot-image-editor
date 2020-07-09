import React, { Component, createRef } from 'react';
import { PreviewCanvas } from '../styledComponents';
import { PREVIEW_CANVAS_ID } from '../config';

export default class CustomizedCanvas extends Component {
  _canvas;
  _context;

  constructor(props) {
    super(props);

    this.canvasRef = createRef();

    this.state = {
      selectedShape: {},
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
          deleteShape: this.deleteShape,
          deleteShapesByType: this.deleteShapesByType
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

  pushShapeToShapes = (newShape) => this.updateState({ shapes: [...this.props.shapes, newShape] });

  targettedShape = (index = undefined) => index || index === 0 ? this.props.shapes[index] : this.state.selectedShape;

  onSelect = (event) => {
    const { offsetX, offsetY } = event;
    const { shapes } = this.props;

    shapes.forEach(
      (shape, index) => {
        if (
            offsetX >= shape.x
            && offsetX <= shape.x + shape.width
            && offsetY >= shape.y
            && offsetY <= shape.y + shape.height
          ) {
            this.setState({
              selectedShape: {
                ...shape,
                index,
                startEdgeOffset: {
                  x: offsetX - shape.x,
                  y: offsetY - shape.y,
                }
              }
            });

            this._canvas.addEventListener('mousemove', this.startDragging);
            this._canvas.addEventListener('mouseup', this.endDragging);
            this._canvas.addEventListener('mouseleave', this.endDragging);
          }
      }
    );
  }

  startDragging = (event) => {
    const { selectedShape } = this.state;
    
    // event.offsetX - startEdgeOffset.x for the shape's X from its starting point not the exact mouse position.
    this.setState({
      selectedShape: {
        ...selectedShape,
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
  }

  getCanvasCenter = (reduceWidthBy = 0, reduceHeightBy = 0) => {
    const centeredX = (this._canvas.width / 2) - reduceWidthBy;
    const centeredY = (this._canvas.height / 2) - reduceHeightBy;

    return [centeredX, centeredY];
  }

  // All the repeated operations are passed here around the draw function.
  draw = (drawFn, opacity = 1.0) => {
    this._context.globalAlpha = +opacity;
    drawFn();
  }

  redrawShape = (index = undefined) => {
    const shape = this.targettedShape(index);

    this._context.clearRect(shape.oldX, shape.oldY, shape.width, shape.height);

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

  drawRect = ({ x, y, width, height, opacity }) => {
    this.draw(() => {
      this._context.fillRect(x, y, width, height);
    }, opacity);
  }

  drawCircle = ({ x, y, radius, opacity }) => {
    this.draw(() => {
      this._context.beginPath();
      this._context.arc(x, y, radius, 0, 2 * Math.PI);
      this._context.stroke();
    }, opacity);
  }

  drawImage = ({ img, x, y, opacity }) => {
    this.draw(() => {
      this._context.drawImage(img, x, y);
    }, opacity);
  }

  drawText = ({ color, textSize, textFont, text, x, y })  => {
    this.draw(() => {
      this._context.fillStyle = color;
      this._context.textAlign = "start";
      this._context.textBaseline = "middle";
      this._context.font = `${textSize}px ${textFont}`;
      this._context.fillText(text, x, y, this._canvas.width);
    }, opacity)
  }

  // TODO: add other shapes variants...

  addRect = ({ x, y, width = 100, height = 75, ...others }) => {
    const [centerX, centerY] = this.getCanvasCenter(width / 2, height / 2);

    const args = { x: x || centerX, y: y || centerY, width, height };

    if (others.key && this.replaceShapeIfExisted(others.key, { ...args, ...others })) { return; }

    this.drawRect(args);
    
    this.pushShapeToShapes({
      ...others,
      ...args,
      variant: 'rect',
    });
  }

  addCircle = ({ x, y, radius = 25, ...others }) => {
    const [centerX, centerY] = this.getCanvasCenter(radius, radius);

    const args = { x: x || centerX, y: y || centerY, radius };

    if (others.key && this.replaceShapeIfExisted(others.key, { ...args, ...others })) { return; }

    this.drawCircle(args);

    this.pushShapeToShapes({
      ...others,
      ...args,
      variant: 'circle'
    });
  }

  addImage = ({ img, x = undefined, y = undefined, opacity = 1.0, ...others }) => {
    
    if(img) {
      const [centerX, centerY] = this.getCanvasCenter(img.width / 2, img.height / 2);
      const args = { img, x: x || centerX, y: y || centerY, width: img.width, height: img.height, opacity };

      if (others.key && this.replaceShapeIfExisted(others.key, { ...args, ...others })) { return; }
console.log("AFTER");
      this.drawImage(args);

      this.pushShapeToShapes({
        ...others,
        ...args,
        variant: 'image'
      });
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
      const args = { x: x || centerX, y: y || centerY, opacity };

      if (others.key && this.replaceShapeIfExisted(others.key, { ...args, ...others })) { return; }

      this.drawText(args);

      this.pushShapeToShapes({
        ...others,
        ...args,
        variant: 'text'
      })
    }
  }

  getShapeByKey = (shapeKey) => {
    const { shapes } = this.props;
    return shapes.filter(({ key }) => key === shapeKey)[0];
  }

  replaceShapeIfExisted = (key, args) => {
    const shape = this.getShapeByKey(key);

    if (shape) {
      args = { ...args, x: shape.x, y: shape.y };
      console.log(args);
      this.updateShape(shape.index, args)

      return true;
    }

    return false;
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
  
  eraseAndremoveShapeFromArray = (index, shapes) => {
    this.eraseShape(index);
    shapes.splice(index, 1);

    return shapes;
  }

  deleteShape = (index) => {
    const { shapes } = this.props;
    this.updateState({
      shapes: this.eraseAndremoveShapeFromArray(index, shapes)
    });
  }

  deleteShapes = (indicies = []) => {
    let { shapes } = this.props;
    indicies.forEach(i => {
      shapes = this.eraseAndremoveShapeFromArray(i, shapes)
    });

    this.updateState({
      shapes
    });
  }

  deleteShapesByType = (shapesType) => {
    const { shapes } = this.props;
    if (shapes && shapes.length === 0) { return; }

    const shapesIndicies = [];
    
    shapes
      .filter(({ type }, index) => {
        if (type === shapesType) {
          shapesIndicies.push(index);
          return true;
        }

        return false;
      });

    if (shapesIndicies.length > 0) { this.deleteShapes(shapesIndicies); }
  }


  render() {
    const { height: parentCanvasHeight, width: parentCanvasWidth } = this.props

    return (
      <PreviewCanvas
        ref={this.canvasRef}
        id={PREVIEW_CANVAS_ID}
        width={parentCanvasWidth}
        height={parentCanvasHeight}
      />
    );
  }

}
