/** External Dependencies */
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { Button } from '@scaleflex/ui/core';
import { DeleteOutline, Split } from '@scaleflex/icons';

/** Internal Dependencies */
import { useStore } from 'hooks';
import formatSecondsToDuration from 'utils/formatSecondsToDuration';
import { SET_TRIM } from 'actions/setTrim';
import { EVENTS } from 'utils/constants';
import emitCustomEvent from 'utils/emitCustomEvent';
import { getCurrentSegmentIndex, timeToPixel } from './Trim.utils';
import Segment from './Segment';
import {
  StyledTrimSliderThumb,
  StyledRailWrapper,
  StyledRailLine,
  StyledTrimWrapper,
  StyledTrimButtonsWrapper,
  StyledSlider,
  StyledSegmentSkeleton,
} from './Trim.styled';
import { SPLIT_THRESHOLD } from './Trim.constants';

const Trim = () => {
  const {
    dispatch,
    originalSource: mediaRef,
    trim: { segments = [] },
    t,
  } = useStore();
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trimContainerWidth, setTrimContainerWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const sliderRef = useRef(null);
  const animationFrameId = useRef();

  const currentSegmentIndex = useMemo(
    () => getCurrentSegmentIndex(segments, trackProgress),
    [segments, trackProgress],
  );

  const updateSegmentBounds = (newStartTime, newEndTime, segmentIndex) => {
    const updatedSegments = [...segments];
    updatedSegments[segmentIndex] = {
      start: newStartTime,
      end: newEndTime,
    };

    dispatch({
      type: SET_TRIM,
      payload: { segments: updatedSegments },
    });
  };

  const splitSegment = () => {
    const currentSegment = segments[currentSegmentIndex] || {
      start: 0,
      end: duration,
    };

    let splitPoint = trackProgress;
    const leftSegmentDuration = splitPoint - currentSegment.start;
    const rightSegmentDuration = currentSegment.end - splitPoint;

    if (leftSegmentDuration < SPLIT_THRESHOLD) {
      splitPoint = currentSegment.start + SPLIT_THRESHOLD;
    } else if (rightSegmentDuration < SPLIT_THRESHOLD) {
      splitPoint = currentSegment.end - SPLIT_THRESHOLD;
    }

    if (
      splitPoint === currentSegment.start ||
      splitPoint === currentSegment.end
    ) {
      return;
    }

    const newSegments = [...segments];
    newSegments.splice(
      currentSegmentIndex,
      1,
      { start: currentSegment.start, end: splitPoint },
      { start: splitPoint, end: currentSegment.end },
    );

    dispatch({
      type: SET_TRIM,
      payload: {
        segments: newSegments,
      },
    });
  };

  const deleteSelectedSegment = () => {
    dispatch({
      type: SET_TRIM,
      payload: {
        segments: segments.filter((_, index) => index !== currentSegmentIndex),
      },
    });
  };

  const updateVideoProgress = (newTime) => {
    mediaRef.currentTime = newTime;
    setTrackProgress(newTime);
  };

  const cancelAnimation = () => {
    cancelAnimationFrame(animationFrameId.current);
    animationFrameId.current = null;
  };

  const updateVideoProgressWhilePlaying = () => {
    cancelAnimation();
    const animate = () => {
      setTrackProgress(mediaRef.currentTime);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
  };

  const getSegmentBounds = (currentIndex = 0) => {
    const prevSegment = segments[currentIndex - 1];
    const nextSegment = segments[currentIndex + 1];

    const minStart = prevSegment
      ? timeToPixel(prevSegment.end, trimContainerWidth, duration)
      : 0;

    const maxEnd = nextSegment
      ? timeToPixel(nextSegment.start, trimContainerWidth, duration)
      : trimContainerWidth;

    return { minStart, maxEnd };
  };

  const updateTimelineWidth = () => {
    if (sliderRef.current) {
      setTrimContainerWidth(sliderRef.current.getBoundingClientRect().width);
    }
  };

  const handleCanPlay = () => {
    setIsReady(true);
    setDuration(mediaRef.duration);
  };

  const onScrub = (_, value) => {
    cancelAnimation();
    mediaRef.currentTime = value;
    setTrackProgress(value);
    emitCustomEvent(EVENTS.SCRUB_VIDEO, {
      time: value,
    });
  };

  const onPlay = () => {
    updateVideoProgressWhilePlaying();
  };

  const onPause = () => {
    cancelAnimation();
  };

  const handleSeek = (e) => {
    setTrackProgress(e.detail.time);
  };

  useEffect(() => {
    if (mediaRef) {
      mediaRef.addEventListener('play', onPlay);
      mediaRef.addEventListener('pause', onPause);
      mediaRef.addEventListener('canplaythrough', handleCanPlay);
      window.addEventListener(EVENTS.SEEK_VIDEO, handleSeek);

      return () => {
        if (mediaRef) {
          mediaRef.pause();
          mediaRef.removeEventListener('play', onPlay);
          mediaRef.removeEventListener('pause', onPause);
          mediaRef.removeEventListener('canplaythrough', handleCanPlay);
          window.removeEventListener(EVENTS.SEEK_VIDEO, handleSeek);
        }
        cancelAnimation();
      };
    }
  }, [mediaRef]);

  useEffect(() => {
    if (mediaRef && mediaRef.duration) {
      setDuration(mediaRef.duration);
      setIsReady(true);
    }

    updateTimelineWidth();
    const resizeObserver = new ResizeObserver(updateTimelineWidth);

    if (sliderRef.current) {
      resizeObserver.observe(sliderRef.current);
    }

    window.addEventListener('resize', updateTimelineWidth);

    return () => {
      window.removeEventListener('resize', updateTimelineWidth);
      resizeObserver.disconnect();
    };
  }, []);

  const renderSegments = () => {
    if (!isReady && trimContainerWidth === 0) return null;

    const commonProps = {
      sliderRef,
      duration,
      trackProgress,
      trimContainerWidth,
      updateVideoProgress,
      getSegmentBounds,
      updateSegmentBounds,
    };

    if (segments.length === 0) {
      return <Segment {...commonProps} />;
    }

    return segments.map((segment, index) => (
      <Segment
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        segment={segment}
        segmentIndex={index}
        {...commonProps}
      />
    ));
  };

  const Rail = useCallback(
    () => (
      <StyledRailWrapper>
        <StyledRailLine />
      </StyledRailWrapper>
    ),
    [],
  );

  return (
    <StyledTrimWrapper className="FIE_trim-wrapper">
      {!isReady && <StyledSegmentSkeleton width="100%" height="72px" />}
      {renderSegments()}
      <StyledSlider
        className="FIE_trim-slider"
        min={0}
        max={duration || 0}
        step={0.5}
        value={trackProgress || 0}
        hideTrack
        hideAnnotation
        ref={sliderRef}
        onChange={onScrub}
        hidden={!isReady}
        components={{
          Rail,
          Thumb: StyledTrimSliderThumb,
        }}
      />
      <StyledTrimButtonsWrapper className="FIE_trim-buttons-wrapper">
        <Button
          className="FIE_trim-split-button"
          color="link-secondary"
          startIcon={<Split />}
          onClick={splitSegment}
          disabled={currentSegmentIndex === -1 || !isReady}
        >
          {`${t('splitAt')} ${formatSecondsToDuration(trackProgress)}`}
        </Button>
        <Button
          className="FIE_trim-delete-button"
          color="link-secondary"
          startIcon={<DeleteOutline />}
          onClick={deleteSelectedSegment}
          disabled={
            currentSegmentIndex === -1 || segments.length <= 1 || !isReady
          }
        >
          {t('delete')}
        </Button>
      </StyledTrimButtonsWrapper>
    </StyledTrimWrapper>
  );
};

export default Trim;
