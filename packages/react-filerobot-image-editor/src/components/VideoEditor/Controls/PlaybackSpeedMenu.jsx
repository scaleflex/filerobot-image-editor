/** External Dependencies */
import PropTypes from 'prop-types';
import { MenuItem } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { StyledMenu } from './Controls.styled';

const PlaybackSpeedMenu = ({
  value,
  anchor,
  onClose,
  getOnClickCbkFunction,
  playbackSpeedMenuItems,
}) => {
  return (
    <StyledMenu
      className="FIE_video-controls-speed-menu"
      open={Boolean(anchor)}
      onClose={onClose}
      anchorEl={anchor}
      value={value}
      position="top-end"
      $isOpen={Boolean(anchor)}
    >
      {playbackSpeedMenuItems.map((option) => (
        <MenuItem
          className="FIE_video-controls-speed-menuitem"
          key={option}
          onClick={getOnClickCbkFunction(option)}
        >
          {option}
        </MenuItem>
      ))}
    </StyledMenu>
  );
};

PlaybackSpeedMenu.propTypes = {
  value: PropTypes.number,
  anchor: PropTypes.instanceOf(Object),
  onClose: PropTypes.func,
  getOnClickCbkFunction: PropTypes.func,
  playbackSpeedMenuItems: PropTypes.arrayOf(PropTypes.number),
};

export default PlaybackSpeedMenu;
