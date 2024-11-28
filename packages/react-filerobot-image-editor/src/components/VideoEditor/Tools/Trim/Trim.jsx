/** External Dependencies */
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { DeleteOutline, Split } from '@scaleflex/icons';

/** Internal Dependencies */
import { useStore } from 'hooks';
import formatSecondsToDuration from 'utils/formatSecondsToDuration';
import { SET_TRIM } from 'actions/setTrim';
import { EVENTS, TOOLS_IDS } from 'utils/constants';
import emitCustomEvent from 'utils/emitCustomEvent';
import ToolsBarItemButton from 'components/Shared/ToolsBar/ToolsBarItemButton';
import { StyledToolsBarItemButtonLabel } from 'components/Shared/ToolsBar/ToolsBar.styled';
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
import { MIN_SEGMENT_WIDTH } from './Trim.constants';

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

    const segmentStartPx = timeToPixel(
      currentSegment.start,
      trimContainerWidth,
      duration,
    );
    const segmentEndPx = timeToPixel(
      currentSegment.end,
      trimContainerWidth,
      duration,
    );
    const splitPointPx = timeToPixel(
      trackProgress,
      trimContainerWidth,
      duration,
    );

    const leftSegmentWidth = splitPointPx - segmentStartPx;
    const rightSegmentWidth = segmentEndPx - splitPointPx;

    if (
      leftSegmentWidth < MIN_SEGMENT_WIDTH ||
      rightSegmentWidth < MIN_SEGMENT_WIDTH
    ) {
      return;
    }

    const newSegments = [...segments];
    newSegments.splice(
      currentSegmentIndex,
      1,
      { start: currentSegment.start, end: trackProgress },
      { start: trackProgress, end: currentSegment.end },
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
      currentSegmentIndex,
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

  const splitButtonDisabled =
    currentSegmentIndex === -1 || !isReady || trackProgress < 1;
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
        <ToolsBarItemButton
          className="FIE_trim-split-button"
          id={TOOLS_IDS.TRIM}
          Icon={Split}
          onClick={splitSegment}
          disabled={splitButtonDisabled}
        >
          <StyledToolsBarItemButtonLabel
            className="FIE_trim-split-button-label"
            disabled={splitButtonDisabled}
          >
            {t('splitAt')} {formatSecondsToDuration(trackProgress)}
          </StyledToolsBarItemButtonLabel>
        </ToolsBarItemButton>
        <ToolsBarItemButton
          className="FIE_trim-delete-button"
          id={TOOLS_IDS.TRIM}
          Icon={DeleteOutline}
          onClick={deleteSelectedSegment}
          disabled={
            currentSegmentIndex === -1 || segments.length <= 1 || !isReady
          }
        >
          <StyledToolsBarItemButtonLabel
            className="FIE_trim-delete-button-label"
            disabled={
              currentSegmentIndex === -1 || segments.length <= 1 || !isReady
            }
          >
            {t('delete')}
          </StyledToolsBarItemButtonLabel>
        </ToolsBarItemButton>
      </StyledTrimButtonsWrapper>
    </StyledTrimWrapper>
  );
};

export default Trim;
