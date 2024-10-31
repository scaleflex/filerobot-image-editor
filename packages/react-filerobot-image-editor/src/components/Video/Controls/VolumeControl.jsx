/** External Dependencies */
import PropTypes from 'prop-types';
import { Volume, Mute } from '@scaleflex/icons';

/** Internal Dependencies */
import Styled from './Controls.styled';

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
    <Styled.VolumeControlWrapper $shown={isAudioSliderOpen}>
      <Styled.IconButton size="lg" onClick={toggleMute} color="basic">
        <Styled.Icon $hidden={isMuted} icon={<Volume size={14} />} />
        <Styled.Icon $hidden={!isMuted} icon={<Mute size={14} />} />
      </Styled.IconButton>
      <Styled.VolumeSlider
        hideAnnotation
        min={0}
        max={1}
        step={0.1}
        value={value ?? 1}
        onChange={onScrub}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
      />
    </Styled.VolumeControlWrapper>
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
