/** External Dependencies */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

/** Internal Dependencies */
import { useStore } from 'hooks';
import PropTypes from 'prop-types';
import {
  StyledHandle,
  StyledSegment,
  StyledSegmentHandle,
  StyledSegmentWrapper,
} from './Trim.styled';
import { pixelToTime, timeToPixel } from './Trim.utils';
import { MIN_SEGMENT_WIDTH } from './Trims.constants';

const Segment = ({
  sliderRef,
  duration,
  segment,
  segmentIndex = 0,
  updateVideoProgress,
  trackProgress,
  trimContainerWidth,
  getSegmentBounds,
  updateSegmentBounds,
}) => {
  const { originalSource: mediaRef } = useStore();

  const [segmentPixelStart, setSegmentPixelStart] = useState(0);
  const [segmentPixelEnd, setSegmentPixelEnd] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);

  const leftHandleRef = useRef(null);
  const segmentHandleRef = useRef(null);
  const rightHandleRef = useRef(null);
  const isInternalUpdate = useRef(false);

  const segmentWidth = segmentPixelEnd - segmentPixelStart;

  const getMappedTime = useCallback(
    (pixel) => pixelToTime(pixel, trimContainerWidth, duration),
    [trimContainerWidth, duration],
  );

  const getMappedPixel = useCallback(
    (time) => timeToPixel(time, trimContainerWidth, duration),
    [trimContainerWidth, duration],
  );

  const handleDragStart = () => {
    isInternalUpdate.current = true;
    mediaRef.pause();
  };

  const handleDragLeft = (e) => {
    const sliderRect = sliderRef.current?.getBoundingClientRect();
    const { minStart } = getSegmentBounds(segmentIndex);
    const newStart = Math.min(
      segmentPixelEnd - MIN_SEGMENT_WIDTH,
      Math.max(minStart, e.clientX - sliderRect.left),
    );

    setSegmentPixelStart(newStart);
  };

  const handleDragRight = (e) => {
    const sliderRect = sliderRef.current?.getBoundingClientRect();
    const { maxEnd } = getSegmentBounds(segmentIndex);
    const newEnd = Math.max(
      segmentPixelStart + MIN_SEGMENT_WIDTH,
      Math.min(maxEnd, e.clientX - sliderRect.left),
    );

    setSegmentPixelEnd(newEnd);
  };

  const handleDragStop = () => {
    const startTime = getMappedTime(segmentPixelStart);
    const endTime = getMappedTime(segmentPixelEnd);

    updateSegmentBounds(startTime, endTime, segmentIndex);
    setTimeout(() => {
      isInternalUpdate.current = false;
    }, 0);
  };

  const handleTimelineDragStart = (e) => {
    isInternalUpdate.current = true;
    mediaRef.pause();
    updateVideoProgress(getMappedTime(segmentPixelStart));
    setDragStartX({
      mouseX: e.clientX,
      startPos: segmentPixelStart,
    });
  };

  const handleTimelineDrag = (e) => {
    if (!dragStartX) return;

    const deltaX = e.clientX - dragStartX.mouseX;
    const { minStart, maxEnd } = getSegmentBounds(segmentIndex);
    const newStart = Math.max(
      minStart,
      Math.min(maxEnd - segmentWidth, dragStartX.startPos + deltaX),
    );

    setSegmentPixelStart(newStart);
    setSegmentPixelEnd(newStart + segmentWidth);
    updateVideoProgress(getMappedTime(newStart));
  };

  const handleTimelineDragStop = () => {
    const startTime = getMappedTime(segmentPixelStart);
    const endTime = getMappedTime(segmentPixelEnd);

    setDragStartX(null);
    updateSegmentBounds(startTime, endTime, segmentIndex);
    setTimeout(() => {
      isInternalUpdate.current = false;
    }, 0);
  };

  useEffect(() => {
    if (trimContainerWidth && !isInternalUpdate.current) {
      setSegmentPixelStart(getMappedPixel(segment?.start || 0));
      setSegmentPixelEnd(getMappedPixel(segment?.end || duration));
    }
  }, [duration, segment, trimContainerWidth]);

  useEffect(() => {
    return () => {
      if (isInternalUpdate.current) {
        clearTimeout(isInternalUpdate.current);
      }
    };
  }, []);

  const isHighlighted =
    trackProgress >= getMappedTime(segmentPixelStart) &&
    trackProgress < getMappedTime(segmentPixelEnd);

  return (
    <StyledSegmentWrapper className="FIE_trim-segment-wrapper">
      <StyledSegment
        className="FIE_trim-segment"
        isHighlighted={isHighlighted}
        id={isHighlighted ? 'highlighted-segment' : ''}
        left={segmentPixelStart}
        width={segmentWidth}
      >
        <Draggable
          axis="x"
          bounds="parent"
          position={{ x: -12, y: 0 }}
          nodeRef={leftHandleRef}
          onStart={handleDragStart}
          onDrag={handleDragLeft}
          onStop={handleDragStop}
        >
          <StyledHandle
            className="FIE_segment-left-handle"
            ref={leftHandleRef}
          />
        </Draggable>
        <Draggable
          axis="x"
          bounds="parent"
          nodeRef={segmentHandleRef}
          onStart={handleTimelineDragStart}
          onDrag={handleTimelineDrag}
          onStop={handleTimelineDragStop}
        >
          <StyledSegmentHandle
            className="FIE_segment-handle"
            ref={segmentHandleRef}
            style={{ width: `${segmentWidth - 40}px` }}
          />
        </Draggable>
        <Draggable
          axis="x"
          bounds="parent"
          position={{ x: segmentWidth - 22, y: 0 }}
          nodeRef={rightHandleRef}
          onStart={handleDragStart}
          onDrag={handleDragRight}
          onStop={handleDragStop}
        >
          <StyledHandle
            className="FIE_segment-right-handle"
            ref={rightHandleRef}
          />
        </Draggable>
      </StyledSegment>
    </StyledSegmentWrapper>
  );
};

export default Segment;

Segment.propTypes = {
  sliderRef: PropTypes.instanceOf(Object).isRequired,
  duration: PropTypes.number.isRequired,
  segment: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }),
  segmentIndex: PropTypes.number,
  trackProgress: PropTypes.number.isRequired,
  trimContainerWidth: PropTypes.number.isRequired,
  getSegmentBounds: PropTypes.func.isRequired,
  updateVideoProgress: PropTypes.func.isRequired,
  updateSegmentBounds: PropTypes.func.isRequired,
};
