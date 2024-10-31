/** External Dependencies */
import { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Repeat, NoRepeat } from '@scaleflex/icons';

/** Internal Dependencies */
import { useDispatch, useStore } from 'hooks';
import { SELECT_TOOL } from 'actions';
import TimeLapse from './Timelapse';
import PlaybackSpeedMenu from './PlaybackSpeedMenu';
import VolumeControl from './VolumeControl';
import Styled from './Controls.styled';

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
    }, [1000]);
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
    }, [1000]);
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
    const { keyCode } = event;

    switch (keyCode) {
      case 32: // space
      case 75: // 'k'
        event.preventDefault();
        return handlePlayPause();

      case 39: // arrowRight
        event.preventDefault();
        return handleSeek(5);

      case 37: // arrowLeft
        event.preventDefault();
        return handleSeek(-5);

      case 38: // arrowUp
        event.preventDefault();

        return handleVolumeUp();

      case 40: // arrowDown
        event.preventDefault();
        return handleVolumeDown();

      case 77: // 'm'
        event.preventDefault();
        return handleToggleMute();
      default:
    }
  };

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

  const toggleBuffer = (value) => {
    setIsBuffering(value);
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
      mediaRef.addEventListener('waiting', () => toggleBuffer(true));
      mediaRef.addEventListener('playing', () => toggleBuffer(false));
      document.addEventListener('keydown', handleKeyboardControls);

      // Pause and clean up on unmount
      return () => {
        if (mediaRef) {
          mediaRef.pause();
          mediaRef.removeEventListener('loadedmetadata', handleVideoLoaded);
          mediaRef.removeEventListener('canplaythrough', handleCanPlay);
          mediaRef.removeEventListener('play', onPlay);
          mediaRef.removeEventListener('pause', onPause);
          mediaRef.addEventListener('waiting', () => toggleBuffer(true));
          mediaRef.addEventListener('playing', () => toggleBuffer(false));
        }

        document.removeEventListener('keydown', handleKeyboardControls);
        resetControls();
        clearInterval(intervalRef.current);
      };
    }
  }, [mediaRef, designLayer]);

  return (
    <Styled.MediaControls>
      <Styled.SeekSlider
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
      <Styled.ControlsWrapper>
        <Styled.PlayButton
          color="basic"
          size="lg"
          disabled={!isPlaying && !isReadyRef.current}
          $disableHover={!isReadyRef.current}
          onClick={handlePlayPause}
        >
          <Styled.LoadingIcon
            $hidden={isReadyRef.current && !isBuffering}
            size={40}
          />
          <Styled.Icon $hidden={isPlaying} icon={<Play size={14} />} />
          <Styled.Icon $hidden={!isPlaying} icon={<Pause size={14} />} />
        </Styled.PlayButton>
        <Styled.IconButton size="lg" onClick={toggleLoop} color="basic">
          <Styled.Icon $hidden={isLoopDisabled} icon={<Repeat size={14} />} />
          <Styled.Icon
            $hidden={!isLoopDisabled}
            icon={<NoRepeat size={14} />}
          />
        </Styled.IconButton>
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
        <Styled.ExtraControllers>
          <Styled.PlaybackButton
            color="basic"
            onClick={handleTogglePlaybackMenu}
          >
            {`${playbackSpeed}x`}
          </Styled.PlaybackButton>
        </Styled.ExtraControllers>
      </Styled.ControlsWrapper>
      <PlaybackSpeedMenu
        value={playbackSpeed}
        onClose={handleTogglePlaybackMenu}
        onClick={handleChangePlaybackSpeed}
        anchor={playbackMenuAnchor}
      />
    </Styled.MediaControls>
  );
};

export default Controls;
