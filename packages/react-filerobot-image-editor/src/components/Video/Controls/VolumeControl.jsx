/** External Dependencies */
import PropTypes from 'prop-types';
import { Volume, Mute } from '@scaleflex/icons';

/** Internal Dependencies */
import {
  StyledVolumeControlWrapper,
  StyledIconButton,
  StyledIcon,
  StyledVolumeSlider,
} from './Controls.styled';

const VolumeControl = ({
  value,
  onChange,
  isMuted,
  toggleMute,
  isAudioSliderOpen,
  setIsAudioSliderOpen,
  closeAudioSlider,
}) => {
  const onScrub = (_, newValue) => {
    onChange(newValue);
    setIsAudioSliderOpen(true);
  };

  const onScrubEnd = () => {
    closeAudioSlider();
  };

  return (
    <StyledVolumeControlWrapper $shown={isAudioSliderOpen}>
      <StyledIconButton size="lg" onClick={toggleMute} color="basic">
        <StyledIcon $hidden={isMuted} icon={<Volume size={14} />} />
        <StyledIcon $hidden={!isMuted} icon={<Mute size={14} />} />
      </StyledIconButton>
      <StyledVolumeSlider
        hideAnnotation
        min={0}
        max={1}
        step={0.1}
        value={value ?? 1}
        onChange={onScrub}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
      />
    </StyledVolumeControlWrapper>
  );
};

VolumeControl.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  isMuted: PropTypes.bool,
  toggleMute: PropTypes.func,
  isAudioSliderOpen: PropTypes.bool,
  setIsAudioSliderOpen: PropTypes.func,
  closeAudioSlider: PropTypes.func,
};

export default VolumeControl;
