import React, { Component, createRef } from 'react';
import { PreviewCanvas } from '../styledComponents';
import { getWatermarkSquaredPosition } from '../utils';
import { PREVIEW_CANVAS_ID, SHAPES_VARIANTS, WATERMARK_UNIQUE_KEY } from '../config';
import '../utils/canvas-round';


export default class CustomizedCanvas extends Component {
  _canvas;
  _context;
  _initArgs = {
    hidden: false,
  };
  _allowedTabs = [
    'shapes',
    'image',
    'text',
    'watermark'
  ]

  constructor(props) {
    super(props);

    this.canvasRef = createRef();
    this.shapeResizingBoxRef = createRef();

    this.state = {
      resizeControlTarget: null,
      latestCanvasSize: null
    }
  }

  componentDidMount() {
    if (this.canvasRef && this.canvasRef.current && !this._canvas) {
      this._canvas = this.canvasRef.current;
      this._canvas.addEventListener('mousedown', this.onSelect);
      this._context = this._canvas.getContext('2d');

      const border = `1px solid ${
        this.props.theme?.colors?.text || (this.props.colorScheme === 'light' ? '#000' : '#fff')
      }`;
      const availableShapes = [
        {
          label: 'Rectangle',
          variant: SHAPES_VARIANTS.RECT,
          iconStyles: { height: 50, width: 100, border },
          drawFn: this.addRect,
        },
        {
          label: 'Square',
          variant: SHAPES_VARIANTS.SQUARE,
          iconStyles: { border },
          drawFn: (props) => this.addSquare({ width: 75, height: 75, ...props }),
          // iconUrl: undefined,
        },
        {
          label: 'Circle',
          variant: SHAPES_VARIANTS.CIRCLE,
          iconStyles: { border, borderRadius: '50%' },
          drawFn: this.addCircle
          // iconUrl: undefined,
        },
      ]

      this.props.updateState({
        shapeOperations: {
          addImage: this.addImage,
          addRect: this.addRect,
          addCircle: this.addCircle,
          addText: this.addText,
          addOrUpdate: this.addAnyShape,
          updateShape: this.updateShape,
          updateShapes: this.updateShapes,
          replaceAllShapes: this.replaceAllShapes,
          deleteShape: this.deleteShapeByKeyOrIndex,
          deleteShapes: this.deleteAllShapesOrByTypeOrIndicies,
          setShapeVisibility: this.setShapeVisibilityByKeyOrIndex,
          getShape: this.getShapeByKeyOrIndex,
          getShapesIndicies: this.getShapesIndexByAnyProp,
          prepareFinalCanvas: this.prepareFinalCanvas
        },
        availableShapes
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    return { ...state, latestCanvasSize: props.latestCanvasSize || { width: 0, height: 0 } };
  }

  componentWillUnmount() {
    this._canvas.removeEventListener('mousedown', this.onSelect);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
      this.redrawShape()
    }
  }

  prepareFinalCanvas = (originalCanvasDimensions) => {
    const { width, height } = originalCanvasDimensions;
    const { shapes } = this.props;
    const newCanvas = document.createElement('canvas');
    newCanvas.width = width;
    newCanvas.height = height;

    this._canvas.parentNode.insertBefore(newCanvas, this._canvas);

    const oldCanvas = this._canvas;

    this._canvas = newCanvas;
    this._context = newCanvas.getContext('2d');

    shapes.map((shape) => {
      // Mapping both (X & WIDTH), (Y & HEIGHT) of shape from old to new canvas with final dimnesions.
      shape.x = shape.x.mapNumber(0, oldCanvas.width, 0, width);
      shape.y = shape.y.mapNumber(0, oldCanvas.height, 0, height);
      
      if (shape.variant !== SHAPES_VARIANTS.TEXT) {
        shape.width = shape.width.mapNumber(0, oldCanvas.width, 0, width);
        shape.height = shape.height.mapNumber(0, oldCanvas.height, 0, height);
      } else {
        shape.textSize = parseInt(shape.textSize).mapNumber(0, oldCanvas.width, 0, width);
      }

      this.drawShapeThroughVariant(shape);
    });

    return this._canvas;
  }

  updateState = (data, callback = () => {}) => {
    const { updateState } = this.props;
    updateState(data, callback);
  }

  pushShapeToShapes = (newShape, otherStates) => {
    const { shapes } = this.props;
    const shapeIndex = shapes.length;

    this.updateState({
      shapes: [
        ...shapes,
        {
          ...newShape,
          index: shapeIndex
        }
      ],
      ...otherStates
    });

    return shapeIndex;
  }

  targettedShape = (index = undefined) => index || index === 0 ? this.props.shapes[index] : this.props.selectedShape;

  onSelect = (event) => {
    const { shapes, activeTab } = this.props;
    if (!this._allowedTabs.includes(activeTab)) {
      return;
    }

    const { offsetX, offsetY } = event;

    
    let foundShape = false;

    shapes.forEach(
      (shape) => {
        if (
            !shape.hidden
            && offsetX >= shape.x
            && offsetX <= shape.x + shape.width
            && offsetY >= shape.y
            && offsetY <= shape.y + shape.height
            && shape.tab === activeTab
          ) {
            foundShape = true;

            this.updateState({
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
            this._canvas.addEventListener('touchmove', this.startDragging);
            document.addEventListener('mouseup', this.endDragging);
            document.addEventListener('touchend', this.endDragging);
          }
      }
    );

    // Remove the old event listeners incase clicked on no shapes after clicking on one before.
    if (!foundShape) {
      this.updateState({ selectedShape: {} });
      this.disableResizingActions();
      this._canvas.removeEventListener('keyup', this.activateShapeDeleting);
      this._canvas.removeEventListener('mousemove', this.startDragging);
      this._canvas.removeEventListener('touchmove', this.startDragging);
      document.removeEventListener('mouseup', this.endDragging);
      document.removeEventListener('touchend', this.endDragging);
    }
  }

  activateShapeDeleting = ({ key }) => {
    const { selectedShape } = this.props;

    if (
        (key === 'Delete' || key === 'Backspace')
        && selectedShape
    ) {
      this.deleteShapeByKeyOrIndex({ index: selectedShape.index });
      this.updateState({ selectedShape: {} });
      this.disableResizingActions();
      this._canvas.removeEventListener('keyup', this.activateShapeDeleting);
    }
  }

  activateResizingActions = () => {
    const { selectedShape } = this.props;

    if (selectedShape.lockScaleToPercentage) { return; }
    
    Array.from(document.getElementsByClassName('shape-resizing-control'))
      .forEach((control) => {
        control.addEventListener('mousedown', this.trackShapeResize)
      });
  }

  trackShapeResize = ({ target }) => {
    this.setState({ resizeControlTarget: target });
    document.addEventListener('mousemove', this.handleShapeResizing);
    document.addEventListener('touchmove', this.handleShapeResizing);
    document.addEventListener('mouseup', this.disableResizingActions);
    document.addEventListener('touchend', this.disableResizingActions);
  }

  handleShapeResizing = ({ movementX, movementY, shiftKey }) => {
    const { resizeControlTarget } = this.state;
    const { selectedShape, processWithCloudimage } = this.props;
    let { index, width, height, x, y, variant, originalWidth, originalHeight } = selectedShape;

    if (
      !resizeControlTarget ||
      (variant === SHAPES_VARIANTS.TEXT)
    ) { return; }

    const oldHeight = height;
    
    const { direction } = resizeControlTarget.dataset;
    if (processWithCloudimage) {
      const notAllowedWithCloudImage = ['e', 'w', 'n', 's'];
      if (notAllowedWithCloudImage.includes(direction)) {
        return;
      }
      shiftKey = true;
    }
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
      x += movementX;
    }
    const northHandle = () => {
      height -= movementY;
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
        eastHandle();
        if (width >= this._canvas.width && shiftKey) { break; }
        northHandle();
      break;
      case 'nw':
        if (shiftKey) { keepShapeRatio(true); }
        westHandle();
        if (width >= this._canvas.width && shiftKey) { break; }
        northHandle();
      break;
      case 'se':
        if (shiftKey) { keepShapeRatio(true); }
        eastHandle();
        if (width >= this._canvas.width && shiftKey) { break; }
        southHandle();
      break;
      case 'sw':
        if (shiftKey) { keepShapeRatio(false); }
        westHandle();
        if (width >= this._canvas.width && shiftKey) { break; }
        southHandle();
      break;
      default:
      return;
    }

    if (variant === SHAPES_VARIANTS.SQUARE || variant === SHAPES_VARIANTS.CIRCLE) {
      if (height !== oldHeight) { width = height;} else { height = width; }
    }

    // In cloudimage process f max width or height don't increase any of them.
    if (processWithCloudimage && (width >= originalWidth || height >= originalHeight)) {
      return;
    }

    const minWidthAndHeight = 15;
    if (
        height <= minWidthAndHeight ||
        width <= minWidthAndHeight
      ) { return; }

    // Limiting the dragging to be inside the canvas only.
    if (x < 0) { x = 0 }
    if (y < 0) { y = 0 }
    if (x + width > this._canvas.width) { x = this._canvas.width - width }
    if (y + height > this._canvas.height) { y = this._canvas.height - height }
    if (width > this._canvas.width) { width = this._canvas.width }
    if (height > this._canvas.height) { height = this._canvas.height }

    const updatedShape = { width, height, x, y };

    this.updateShape(updatedShape, index, {
      selectedShape: {
        ...selectedShape,
        ...updatedShape
      }
    });
  }

  disableResizingActions = (e) => {
    document.removeEventListener('mousemove', this.handleShapeResizing);
    document.removeEventListener('mouseup', this.disableResizingActions);

    this.updateState({ selectedShape: {} })
    this.setState({ resizeControlTarget: null });
  }

  removeResizingBox = ({ offsetX, offsetY }) => {
    const { selectedShape } = this.props;
    if (
        offsetX < selectedShape.x
        || offsetX > selectedShape.x + selectedShape.width
        || offsetY < selectedShape.y
        || offsetY > selectedShape.y + selectedShape.height
    ) {
      this.updateState({
        selectedShape: { ...selectedShape, resizingBox: false }
      });

      this._canvas.removeEventListener('click', this.removeResizingBox);
    }
  }

  startDragging = (event) => {
    if (event.targetTouches && event.targetTouches[0]) {
      event.preventDefault();
      const { clientX, clientY } = event.targetTouches[0];
      const { x, y } = this._canvas.getBoundingClientRect();
      event.offsetX = clientX - x;
      event.offsetY = clientY - y;
    }
    
    const { selectedShape } = this.props;
    const { startEdgeOffset = {}, width, height, index } = selectedShape;
    
    // event.offsetX - startEdgeOffset.x for the shape's X from its starting point not the exact mouse position.
    let newX = event.offsetX - startEdgeOffset.x;
    let newY = event.offsetY - startEdgeOffset.y;

    // Limiting the dragging to be inside the canvas only.
    if (newX < 0) { newX = 0 }
    if (newY < 0) { newY = 0 }
    if (newX + width > this._canvas.width) { newX = this._canvas.width - width }
    if (newY + height > this._canvas.height) { newY = this._canvas.height - height }

    const newSelectedShape = {
      ...selectedShape,
      x: newX,
      y: newY
    }
    
    this.updateShape(newSelectedShape, index, { selectedShape: newSelectedShape });
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
  draw = (drawFn, { opacity = 1.0, hidden, color, stroke = {} }) => {
    if (hidden) { return; }

    this._context.globalAlpha = +opacity;
    this._context.fillStyle = color;
    this._context.strokeStyle = stroke.color || 'transparent';
    this._context.lineWidth = stroke.width || 1;
    drawFn();
    
    // Make the new canvas rounded if the crop is rounded style.
    // round is a manually written protoype method from canvas-round file in utils.
    if (this.props.round) { this._context.round() }
  }

  redrawShape = (index = undefined) => {
    let { shapes } = this.props;
    
    this.clearShape(0, 0, this._canvas.width, this._canvas.height);

    const shapesCount = shapes.length;

    // If the shape isn't the top shape (last in array) then re-order all the shapes and make the current as last one.
    // Then re-draw with the new order otherwise re-draw with the old order which has the current shape as last/top one.
    if (index && index !== shapesCount - 1) {
      const currentShape = { ...shapes.splice(index, 1)[0], index: shapesCount };
      shapes.splice(shapesCount, 0, currentShape);

      shapes = shapes.map((shape, currentIndex) => {
        shape.index = currentIndex;
        this.drawShapeThroughVariant(shape);

        return shape;
      });

      this.updateState({ shapes, selectedShape: currentShape });
    } else {
      shapes.forEach((shape) => this.drawShapeThroughVariant(shape));
    }
  }

  drawShapeThroughVariant = (shape) => {
    switch(shape.variant) {
      case SHAPES_VARIANTS.IMAGE:
        this.drawImage(shape);
        break;
      case SHAPES_VARIANTS.RECT:
      case SHAPES_VARIANTS.SQUARE:
        this.drawRect(shape);
        break;
      case SHAPES_VARIANTS.CIRCLE:
        this.drawCircle(shape);
        break;
      case SHAPES_VARIANTS.TEXT:
        this.drawText(shape);
      default:
        return;
    }
  }

  drawRect = ({ x, y, width, height, stroke, ...others }) => {
    this.draw(() => {
      this._context.fillRect(x, y, width, height);
      if (stroke) {
        this._context.strokeRect(x, y, width, height);
      }
    }, { stroke, ...others });
  }

  drawCircle = ({ x, y, radius, width, height, stroke, ...others }) => {
    this.draw(() => {
      this._context.roundRect(x, y, width, height);
      this._context.fill();

      if (stroke) {
        this._context.stroke();
      }
    }, { stroke, ...others });
  }

  drawImage = ({ img, x, y, width, height, stroke, ...others }) => {
    this.draw(() => {
      this._context.drawImage(img, x, y, width, height);
      if (stroke) {
        this._context.strokeRect(x, y, width, height);
      }
    }, { stroke, ...others });
  }

  setTextStyle = ({ textSize, textFont }) => {
    this._context.textAlign = "start";
    this._context.textBaseline = "top";
    this._context.font = `${textSize}px ${textFont}`;
  }

  getTextWidthAndHeight = ({ text, textSize, textFont }) => {
    this.setTextStyle({ textSize, textFont });
    const metrics = this._context.measureText(text);
    let { width } = metrics;
    let height = width === 0 ? 0 : metrics.actualBoundingBoxDescent - metrics.actualBoundingBoxAscent;

    return [width, height];
  }

  drawText = ({ text, textSize, textFont, x, y, stroke, ...others })  => {
    this.draw(() => {
      this.setTextStyle({ textSize, textFont });
      this._context.fillText(text, x, y, this._canvas.width);
      if (stroke) {
        this._context.strokeText(text, x, y);
      }
    }, { stroke, ...others })
  }

  // TODO: add other shapes variants...

  addRect = ({ x, y, width = 100, height = 75, stroke = {}, color = '#000000',
    opacity = 1.0, variant = SHAPES_VARIANTS.RECT, tab = 'shapes', ...others } = {}
  ) => {
    const [centerX, centerY] = this.getCanvasCenter(width / 2, height / 2);

    const drawingArgs = { x: x || centerX, y: y || centerY, width, height, stroke, opacity, color };
    const allArgs = { ...this._initArgs, ...others, ...drawingArgs, variant, tab };

    if (others.key && this.replaceShapeIfExisted(others.key, allArgs)) { return; }

    this.drawRect(drawingArgs);
    
    const index = this.pushShapeToShapes(allArgs);

    this.updateState({
      selectedShape: { ...allArgs, index, resizingBox: true }
    }, this.activateResizingActions);
  }

  addSquare = (rectArgs) => {
    if (!rectArgs.width)
      rectArgs.width = rectArgs.height = 75;
    rectArgs.variant = SHAPES_VARIANTS.SQUARE;
    this.addRect(rectArgs);
  }

  addCircle = ({ x, y, radius = 50, stroke = {}, color = '#000000',
    opacity = 1.0, tab = 'shapes', ...others } = {}
  ) => {
    const [centerX, centerY] = this.getCanvasCenter(radius, radius);
    const widthAndHeight = radius * 2;
    
    const drawingArgs = { x: x || centerX, y: y || centerY, radius, color, opacity, stroke,
      width: widthAndHeight, height: widthAndHeight };
    const allArgs = { ...this._initArgs, ...others, ...drawingArgs, tab, variant: SHAPES_VARIANTS.CIRCLE };

    if (others.key && this.replaceShapeIfExisted(others.key, allArgs)) { return; }

    this.drawCircle(drawingArgs);

    const index = this.pushShapeToShapes(allArgs);

    this.updateState({
      selectedShape: { ...allArgs, index, resizingBox: true }
    }, this.activateResizingActions);
  }

  addImage = (
    { img, x = undefined, y = undefined, opacity = 1.0, tab='image', stroke = {}, otherStates, ...others } = {}
  ) => {
    if(img) {
      const addIt = () => {        
        const [originalWidth, originalHeight] = this.getSuitableImgDiemensions(img, others.lockScaleToPercentage);

        const [centerX, centerY] = this.getCanvasCenter(
          (others.width || originalWidth) / 2,
          (others.height || originalHeight) / 2
        );

        const drawingArgs = {
          img, opacity, originalWidth, originalHeight,
          width: others.width || originalWidth,
          height: others.height || originalHeight,
          x: x || centerX,
          y: y || centerY,
          stroke
        };

        const allArgs = { ...this._initArgs, ...others, ...drawingArgs, variant: SHAPES_VARIANTS.IMAGE, tab };

        if (others.key && this.replaceShapeIfExisted(others.key, allArgs, otherStates)) { return; }

        this.drawImage(drawingArgs);

        const index = this.pushShapeToShapes(allArgs);

        this.updateState({
          selectedShape: { ...allArgs, index, resizingBox: true },
          ...otherStates
        }, this.activateResizingActions);
      }

      if (typeof img === 'string') {
        img = this.makeImgElement(img, addIt);
      } else { addIt(); }
      
    }
  }

  addText = ({
    text = 'Text', textSize = 62, color = "#000000", textFont = 'Arial', x = undefined, y = undefined,
    stroke = {}, opacity = 1.0, tab = 'text', otherStates, ...others
  } = {}) => {
    const [width, height] = this.getTextWidthAndHeight({ text, textSize, textFont });
    
    // Set text style here for measuring the text's width & hegiht before drawing.
    const [centerX, centerY] = this.getCanvasCenter(width / 2, height / 2);

    if (text) {
      const drawingArgs = { text, textSize, textFont, x: x || centerX, y: y || centerY, opacity,
        stroke, color };
      const allArgs = { ...this._initArgs, ...others, ...drawingArgs, width, height, variant: SHAPES_VARIANTS.TEXT, tab };

      if (others.key && this.replaceShapeIfExisted(others.key, allArgs, otherStates)) { return; }

      this.drawText(drawingArgs);

      const index = this.pushShapeToShapes(allArgs);

      this.updateState({
        selectedShape: { ...allArgs, index, resizingBox: true },
        ...otherStates
      }, this.activateResizingActions);
    }
  }

  addAnyShape = (shapeArgs, otherStates) => {
    if (shapeArgs.index || shapeArgs.index === 0) {
      const { shapes } = this.props;
      const shape = shapes[shapeArgs.index];
      if (!shapeArgs.variant || shape.variant === shapeArgs.variant) {
        this.updateShape(shapeArgs, shapeArgs.index, otherStates);
        return;
      }
    }

    const args = { ...shapeArgs, otherStates };
    switch(shapeArgs.variant) {
      case SHAPES_VARIANTS.IMAGE:
        this.addImage(args);
        break;
      case SHAPES_VARIANTS.RECT:
        this.addRect(args);
        break;
      case SHAPES_VARIANTS.SQUARE:
        this.addSquare(args);
        break;
      case SHAPES_VARIANTS.CIRCLE:
        this.addCircle(args);
        break;
      case SHAPES_VARIANTS.TEXT:
        this.addText(args);
      default:
        return;
    }
  }

  getSuitableImgDiemensions = (img, lockScaleToPercentage = 0) => {
    let width = img.width;
    let height = img.height;

    // Scaling down the image if it's bigger than the canvas
    if (height > this._canvas.height) {
      const ratio = height / this._canvas.height;
      height /= ratio;
      width /= ratio;
    }

    if (width > this._canvas.width) {
      const ratio = width / this._canvas.width;
      height /= ratio;
      width /= ratio;
    }

    if (lockScaleToPercentage) {
      const scaleValue = (lockScaleToPercentage / 100);
      width *= scaleValue;
      height *= scaleValue;
    }
    
    width = this.fromLatestCanvasSizeValue(width, 'width');
    height = this.fromLatestCanvasSizeValue(height, 'height');

    return [width, height];
  }

  getShapeByKeyOrIndex = ({ key: shapeKey, index: shapeIndex }) => {
    if (!shapeKey && !shapeIndex && shapeKey !== 0 && shapeIndex !== 0) { return false; }
    const { shapes } = this.props;

    return shapeIndex ? shapes[shapeIndex] : shapes.filter(({ key }) => key === shapeKey)[0];
  }

  replaceShapeIfExisted = (key, args, otherStates = undefined) => {
    const shape = this.getShapeByKeyOrIndex({ key });

    if (shape) {
      args = { ...args, x: shape.x, y: shape.y, width: shape.width, height: shape.height };
      this.updateShape(args, shape.index, otherStates)

      return true;
    }

    return false;
  }

  setShapeVisibilityByKeyOrIndex = ({ key, index }, isHidden = undefined) => {
    const shape = this.getShapeByKeyOrIndex({ key, index });
    if (shape && shape.hidden !== isHidden) {
      this.updateShape({ hidden: isHidden || !shape.hidden}, shape.index);
    }
  }

  getShapesIndexByAnyProp = (propertyName, propertyValue) => {
    const { shapes } = this.props;
    
    if (shapes && shapes.length === 0) { return []; }

    const shapesIndicies = [];

    shapes
      .filter(({ [propertyName]: filterProp }, index) => {
        if (filterProp === propertyValue ||
            (typeof filterProp === 'undefined' && Boolean(filterProp) === propertyValue)
         ) {
          shapesIndicies.push(index);
          return true;
        }

        return false;
      });

    return shapesIndicies;
  }

  updateShapes = (updatedData, otherStates, callback = () => {}) => {
    let { shapes } = this.props;
    shapes = shapes.map(s => ({ ...s, ...updatedData }));
    this.updateState({ shapes, ...otherStates }, callback);
  }

  replaceAllShapes = (newShapes, callback = () => {}) => {
    this.updateState({ shapes: newShapes }, () => {
      this.redrawShape();
      callback();
    });
  }

  updateShape = (updatedData, index, otherStatesToBeUpdated = undefined) => {
    const { shapes, selectedShape } = this.props;

    if (!updatedData ||
        (
          (!index && index !== 0) &&
          (!selectedShape || (!selectedShape.index && selectedShape.index !== 0))
        ) 
      ) { return; }
    
    if (typeof updatedData.img === 'string') {
      this.updateState({
        selectedShape: { ...selectedShape, lockScaleToPercentage: updatedData.lockScaleToPercentage, img: updatedData.img }
      });
      this.makeImgElement(updatedData.img, this.updateShape, updatedData, index, otherStatesToBeUpdated);
      return;
    }

    const updates = {};

    // if no index provided and selected shape would be updated then add the obj and update the stats' selectes shape.
    if (!index && index !== 0) { updates.selectedShape = { ...selectedShape, ...updatedData } }

    index = index || index === 0 ? index : selectedShape.index;

    if (shapes[index]) {
      const latestShapes = shapes;

      if (
        (updatedData.textSize && updatedData.textSize !== shapes[index].textSize)||
        (updatedData.text && updatedData.text !== shapes[index].text)
      ) {
        const targetShape = shapes[index];
        const [width, height] = this.getTextWidthAndHeight({ ...targetShape, ...updatedData });

        if (!updates.selectedShape) {
          updatedData.width = width;
          updatedData.height = height;
          updatedData.text = updatedData.text || targetShape.text;
        } else {
          updatedData.width = updates.selectedShape.width = width;
          updatedData.height = updates.selectedShape.height = height;
          updatedData.text = updates.selectedShape.text = updatedData.text || targetShape.text;
        }
      } else {
        const newData = { ...updatedData }

        if (typeof updatedData.x !== 'undefined' && typeof updatedData.y !== 'undefined') {
          newData.x = updatedData.x;
          newData.y = updatedData.y; 
        }

        if (updatedData.stroke) {
          newData.stroke = updatedData.stroke;
        }

        if (updatedData.width && updatedData.height) {
          newData.width = updatedData.width;
          newData.height = updatedData.height;
        }

        if (updatedData.lockScaleToPercentage) {
          updatedData.lockScaleToPercentage = updatedData.lockScaleToPercentage;
        }

        updates.selectedShape = {
          ...selectedShape,
          ...newData
        }
      }

      latestShapes[index] = { ...latestShapes[index], ...updatedData };
      this.updateState({ shapes: latestShapes, ...updates, ...otherStatesToBeUpdated }, () => {
        this.redrawShape(index);
      });
    }
  }

  clearShape = (x, y, width, height, stroke = {}) => {
    const { width: strokeWidth } = stroke;
    const strokeWidthConst = strokeWidth || 1;

    const clearFromX  = x - strokeWidthConst;
    const clearFromY  =  y - strokeWidthConst;
    const clearWidth  = width + strokeWidthConst;
    const clearHeight = height + strokeWidthConst;

    this._context.clearRect(clearFromX, clearFromY, clearWidth, clearHeight);
  }
  
  eraseAndRemoveShapeFromArray = (index, shapes) => {
    if (Object.keys(this.targettedShape(index)).length === 0) { return; }

    this.clearShape(0, 0, this._canvas.width, this._canvas.height);
    
    const newShapes = shapes.filter(shape => {
      if (shape.index === index) { return false; }
      if (shape.index > index) { shape.index -= 1; };

      this.drawShapeThroughVariant(shape);
      return shape;
    });

    return newShapes;
  }

  deleteShapeByKeyOrIndex = ({ index, key }, otherStates = {}) => {
    const { selectedShape } = this.props;

    if (!index && index !== 0 && !key) {

      if (!selectedShape) { return; }
      
      index = selectedShape.index;
    }

    const { shapes } = this.props;
    const shapeIndex = index || index === 0 ? index : (this.getShapeByKeyOrIndex({ key }) || {}).index;

    if (shapeIndex || shapeIndex === 0) {
      if (shapeIndex === selectedShape.index) { otherStates.selectedShape = {} }
      this.updateState({
        shapes: this.eraseAndRemoveShapeFromArray(shapeIndex, shapes),
        ...otherStates
      });
    }
  }

  deleteShapes = (indicies = [], otherStates) => {
    let { shapes } = this.props;
    indicies.forEach(i => {
      shapes = this.eraseAndRemoveShapeFromArray(i, shapes)
    });

    this.updateState({
      shapes,
      ...otherStates
    });
  }

  deleteAllShapesOrByTypeOrIndicies = ({ type, all = false, applied = false, secured = [] }) => {
    if (!type && !all) { return; }

    if (all) {
      const watermarkIndex = (this.getShapeByKeyOrIndex({ key: WATERMARK_UNIQUE_KEY }) || {}).index;
      const securedIndicies = [...secured];
      if ((watermarkIndex || watermarkIndex === 0) && !securedIndicies.includes(watermarkIndex)) {
        securedIndicies.push(watermarkIndex);
      }

      let shapes = [];
      this.clearShape(0, 0, this._canvas.width, this._canvas.height);
      if (!applied) {
        shapes = this.props.shapes.filter(s => {
          if (s.applied || securedIndicies.includes(s.index)) {
            this.drawShapeThroughVariant(s);
            return s;
          }

          return false;
        });
      }
      this.updateState({ shapes, selectedShape: {} });
      return;
    }

    const shapesIndicies = this.getShapesIndexByAnyProp('type', type);
    if (shapesIndicies.length > 0) { this.deleteShapes(shapesIndicies); }
  }

  makeImgElement = (src, fn, dataObject, ...args) => {
    if (!src) { return ''; }
    this.updateState({ isShowSpinner: true });

    const img = new Image();

    img.crossOrigin = 'Anonymous';
    img.src = `${src}?v=${Math.random()}`;

    img.onload = () =>  {
      if (dataObject) {
        let width, height;
        
        if (dataObject.position) {
          let x, y;
          [
            x,
            y,
            width,
            height
          ] = getWatermarkSquaredPosition(dataObject.position, this._canvas, img.width, img.height);

          dataObject.x = x;
          dataObject.y = y;
        }

        const [originalWidth, originalHeight] = this.getSuitableImgDiemensions(img, dataObject.lockScaleToPercentage);

        dataObject.width = width || originalWidth;
        dataObject.originalWidth = originalWidth;
        dataObject.height =  height || originalHeight;
        dataObject.originalHeight = originalHeight;

        fn(dataObject,...args);
      } else {
        fn(...args);
      }
      
      this.updateState({ isShowSpinner: false });
    }

    img.onerror = () => {
      this.updateState({ isShowSpinner: false });
      console.error('Error loading the image...');
    }

    if (dataObject){ dataObject.img = img }
    return img;
  }

  fromLatestCanvasSizeValue = (number, property) => {
    if (this._canvas && this.state.latestCanvasSize) {
      // property = width or height
      return number.mapNumber(0, this.state.latestCanvasSize[property], 0, this._canvas[property]);
    }
    
    return number;
  }


  render() {
    const {
      height: parentCanvasHeight,
      width: parentCanvasWidth,
      selectedShape: {
        width = 0,
        height = 0,
        x = 0,
        y = 0,
        resizingBox = false,
        lockScaleToPercentage = 0
      },
      processWithCloudimage,
      wrapperId
    } = this.props
    const resizingBoxLines = ['e', 'n', 'w', 's'];
    const resizingBoxPoints = ['ne', 'nw', 'sw', 'se'];
    if (!processWithCloudimage) {
      resizingBoxPoints.splice(0, 0, 'e', 'n', 'w', 's',)
    }
    const left = (this._canvas ? this._canvas.offsetLeft : 0) + x;
    const top = (this._canvas ? this._canvas.offsetTop : 0 ) + y;
    const mutualStyles = { pointerEvents: 'all' };

    return (
      <>
        <PreviewCanvas
          ref={this.canvasRef}
          id={`${wrapperId}_${PREVIEW_CANVAS_ID}`}
          width={parentCanvasWidth}
          height={parentCanvasHeight}
          tabIndex={1}
        />

        <div
          ref={this.shapeResizingBoxRef}
          className="cropper-crop-box"
          style={{ display: resizingBox && !lockScaleToPercentage ? 'block' : 'none',
            width, height, left, top, pointerEvents: 'none' }}
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
