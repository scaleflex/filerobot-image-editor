/** External Dependencies */
import { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Repeat, NoRepeat } from '@scaleflex/icons';

/** Internal Dependencies */
import { useDispatch, useStore } from 'hooks';
import { SELECT_TOOL } from 'actions';
import TimeLapse from './Timelapse';
import PlaybackSpeedMenu from './PlaybackSpeedMenu';
import VolumeControl from './VolumeControl';
import {
  StyledMediaControls,
  StyledControlsWrapper,
  StyledPlayButton,
  StyledPlaybackButton,
  StyledLoadingIcon,
  StyledSeekSlider,
  StyledIconButton,
  StyledIcon,
  StyledExtraControllers,
} from './Controls.styled';

const Controls = () => {
  const dispatch = useDispatch();
  const { originalSource: mediaRef, designLayer, toolId } = useStore();

  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackEnded, setTrackEnded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [playbackMenuAnchor, setPlaybackMenuAnchor] = useState();
  const [volumeLevel, setVolumeLevel] = useState(1);
  const [beforeMutedVolumeLevel, setBeforeMutedVolumeLevel] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isAudioSliderOpen, setIsAudioSliderOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoopDisabled, setIsLoopDisabled] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const intervalRef = useRef();
  const audioSliderTimerRef = useRef();
  const isReadyRef = useRef(false);
  const wasPlayingRef = useRef(false);
  const lastOpenedToolId = useRef(toolId);

  const resetControls = () => {
    setVolumeLevel(1);
    setPlaybackSpeed(1);
    setTrackProgress(0);
  };

  const selectTool = useCallback((newToolId) => {
    dispatch({
      type: SELECT_TOOL,
      payload: {
        toolId: newToolId,
      },
    });
  }, []);

  const drawDesignLayer = () => {
    if (!designLayer || mediaRef.paused || mediaRef.ended) {
      return;
    }
    designLayer.batchDraw();
    requestAnimationFrame(drawDesignLayer);
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (mediaRef.ended) {
        setTrackEnded(true);
        setIsPlaying(false);
      } else {
        setTrackProgress(mediaRef.currentTime);
      }
    }, 1000);
  };

  const handleVideoLoaded = () => {
    mediaRef.currentTime = 0;
  };

  const handleChangeVolumeLevel = (value) => {
    const adaptedValue = Math.min(Math.max(value, 0), 1);
    if (!Number.isFinite(adaptedValue)) {
      return;
    }

    setVolumeLevel(adaptedValue);
    mediaRef.volume = adaptedValue;
  };

  const handleToggleMute = () => {
    const nextIsMuted = !isMuted;
    let nextVolumeLevel = 0;

    if (nextIsMuted) {
      setBeforeMutedVolumeLevel(volumeLevel);
      nextVolumeLevel = 0;
    } else if (volumeLevel > 0.1) {
      nextVolumeLevel = volumeLevel;
    } else {
      nextVolumeLevel = beforeMutedVolumeLevel;
    }

    setIsMuted(nextIsMuted);
    handleChangeVolumeLevel(nextVolumeLevel);
  };

  const handleTogglePlaybackMenu = (event) => {
    if (!playbackMenuAnchor) {
      setPlaybackMenuAnchor(event.currentTarget);
    } else {
      setPlaybackMenuAnchor();
    }
  };

  const handleChangePlaybackSpeed = (value) => () => {
    setPlaybackSpeed(value);
    handleTogglePlaybackMenu();
    mediaRef.playbackRate = value;
  };

  const closeAudioSlider = () => {
    setIsAudioSliderOpen(true);
    clearTimeout(audioSliderTimerRef.current);

    audioSliderTimerRef.current = setTimeout(() => {
      setIsAudioSliderOpen(false);
    }, 1000);
  };

  const handleVolumeUp = () => {
    setIsMuted(false);
    handleChangeVolumeLevel((mediaRef.volume || 0) + 0.2);
    closeAudioSlider();
  };

  const handleVolumeDown = () => {
    const nextValue = (mediaRef.volume || 0) - 0.2;

    handleChangeVolumeLevel(nextValue);
    closeAudioSlider();
  };

  const handleSeek = (value) => {
    clearInterval(intervalRef.current);

    const newTime = mediaRef.currentTime + value;
    if (!Number.isFinite(newTime)) {
      return;
    }

    mediaRef.currentTime = newTime;

    setTrackProgress(mediaRef.currentTime);
    startTimer();
  };

  const handlePlay = () => {
    if (!isReadyRef.current) return;
    mediaRef.play();
    drawDesignLayer();
    selectTool(null);
  };

  const handleCanPlay = () => {
    isReadyRef.current = true;
    setDuration(mediaRef.duration);
    setIsBuffering(false);
    designLayer.batchDraw();
  };

  const handlePause = () => {
    if (!isReadyRef.current) return;
    mediaRef.pause();
    drawDesignLayer();
  };

  const handlePlayPause = () => {
    if (mediaRef.paused) {
      handlePlay();
    } else {
      handlePause();
    }
  };

  const handleKeyboardControls = (event) => {
    const { key } = event;

    switch (key) {
      case ' ':
      case 'k':
        event.preventDefault();
        return handlePlayPause();

      case 'ArrowRight':
        event.preventDefault();
        return handleSeek(5);

      case 'ArrowLeft':
        event.preventDefault();
        return handleSeek(-5);

      case 'ArrowUp':
        event.preventDefault();
        return handleVolumeUp();

      case 'ArrowDown':
        event.preventDefault();
        return handleVolumeDown();

      case 'm':
        event.preventDefault();
        return handleToggleMute();

      default:
    }
  };

  const handleWaiting = () => setIsBuffering(true);
  const handlePlaying = () => setIsBuffering(false);

  const onPlay = () => {
    setIsPlaying(true);
    startTimer();
  };

  const onPause = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    selectTool(lastOpenedToolId.current);
  };

  const onScrubStart = () => {
    wasPlayingRef.current = isPlaying;
    selectTool(null);
  };

  const onScrub = (_, value) => {
    clearInterval(intervalRef.current);
    mediaRef.currentTime = value;

    setIsSeeking(true);
    setIsPlaying(false);
    setTrackProgress(mediaRef.currentTime);
  };

  const onScrubEnd = () => {
    if (wasPlayingRef.current) {
      setIsPlaying(true);
      handlePlay();
    }
    if (!wasPlayingRef.current) {
      selectTool(lastOpenedToolId.current);
    }
    setIsSeeking(false);
    startTimer();
  };

  const toggleLoop = () => {
    mediaRef.loop = !mediaRef.loop;
    setIsLoopDisabled(!isLoopDisabled);
  };

  useEffect(() => {
    if (toolId !== null) {
      lastOpenedToolId.current = toolId;
      handlePause();
    }
  }, [toolId]);

  useEffect(() => {
    setIsMuted(volumeLevel === 0);
  }, [volumeLevel]);

  useEffect(() => {
    if (mediaRef && designLayer) {
      mediaRef.load();

      mediaRef.addEventListener('loadedmetadata', handleVideoLoaded);
      mediaRef.addEventListener('canplaythrough', handleCanPlay);
      mediaRef.addEventListener('play', onPlay);
      mediaRef.addEventListener('pause', onPause);
      mediaRef.addEventListener('waiting', handleWaiting);
      mediaRef.addEventListener('playing', handlePlaying);
      document.addEventListener('keydown', handleKeyboardControls);

      // Pause and clean up on unmount
      return () => {
        if (mediaRef) {
          mediaRef.pause();
          mediaRef.removeEventListener('loadedmetadata', handleVideoLoaded);
          mediaRef.removeEventListener('canplaythrough', handleCanPlay);
          mediaRef.removeEventListener('play', onPlay);
          mediaRef.removeEventListener('pause', onPause);
          mediaRef.addEventListener('waiting', handleWaiting);
          mediaRef.addEventListener('playing', handlePlaying);
        }

        document.removeEventListener('keydown', handleKeyboardControls);
        resetControls();
        clearInterval(intervalRef.current);
      };
    }
  }, [mediaRef, designLayer]);

  return (
    <StyledMediaControls>
      <StyledSeekSlider
        className="FIE_video-controls-slider"
        value={trackProgress || 0}
        step={1}
        min={0}
        hideAnnotation
        labelTooltip="off"
        max={duration || 0}
        $forceShow={trackEnded || !isPlaying || isSeeking}
        onChange={onScrub}
        onMouseUp={onScrubEnd}
        onMouseDown={onScrubStart}
      />
      <StyledControlsWrapper>
        <StyledPlayButton
          className="FIE_video-controls-play"
          color="basic"
          size="lg"
          disabled={!isPlaying && !isReadyRef.current}
          $disableHover={!isReadyRef.current}
          onClick={handlePlayPause}
        >
          <StyledLoadingIcon
            className="FIE_video-controls-loading"
            $hidden={isReadyRef.current && !isBuffering}
            size={40}
          />
          <StyledIcon
            className="FIE_video-controls-play-icon"
            $hidden={isPlaying}
            icon={<Play size={14} />}
          />
          <StyledIcon
            className="FIE_video-controls-pause-icon"
            $hidden={!isPlaying}
            icon={<Pause size={14} />}
          />
        </StyledPlayButton>
        <StyledIconButton
          className="FIE_video-controls-loop-button"
          size="lg"
          onClick={toggleLoop}
          color="basic"
        >
          <StyledIcon
            className="FIE_video-controls-loop-enabled-icon"
            $hidden={isLoopDisabled}
            icon={<Repeat size={14} />}
          />
          <StyledIcon
            className="FIE_video-controls-loop-disabled-icon"
            $hidden={!isLoopDisabled}
            icon={<NoRepeat size={14} />}
          />
        </StyledIconButton>
        <VolumeControl
          value={volumeLevel}
          onChange={handleChangeVolumeLevel}
          isAudioSliderOpen={isAudioSliderOpen}
          setIsAudioSliderOpen={setIsAudioSliderOpen}
          isMuted={isMuted}
          toggleMute={handleToggleMute}
          closeAudioSlider={closeAudioSlider}
        />
        <TimeLapse trackProgress={trackProgress} duration={duration} />
        <StyledExtraControllers>
          <StyledPlaybackButton
            className="FIE_video-controls-playback-button"
            color="basic"
            onClick={handleTogglePlaybackMenu}
          >
            {`${playbackSpeed}x`}
          </StyledPlaybackButton>
        </StyledExtraControllers>
      </StyledControlsWrapper>
      <PlaybackSpeedMenu
        value={playbackSpeed}
        onClose={handleTogglePlaybackMenu}
        getOnClickCbkFunction={handleChangePlaybackSpeed}
        anchor={playbackMenuAnchor}
      />
    </StyledMediaControls>
  );
};

export default Controls;
