/** External Dependencies */
import { cloneElement } from 'react';
import styled, { css } from 'styled-components';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';
import {
  Slider as SfxSlider,
  Menu as SfxMenu,
  IconButton as SfxIconButton,
  Button,
} from '@scaleflex/ui/core';
import { Loading } from '@scaleflex/icons';

const MediaControls = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: -16px;
  padding: 0px 16px;
`;

const SeekSlider = styled(SfxSlider)`
  appearance: none;
  height: 4px;
  border: 0;
  padding: 0;
  border-radius: 0;
  transition: height 150ms linear;

  .SfxSlider-rail {
    background: ${({ theme: { palette } }) => palette[PC.IconsPlaceholder]};
    border: inherit;
    border-radius: inherit;
  }

  .SfxSlider-Track {
    background: ${({ theme: { palette } }) => palette[PC.IconsMuted]};
    border: inherit;
    border-radius: inherit;
    transition: height 100ms linear;
  }

  .SfxSlider-thumb {
    background: ${({ theme: { palette } }) => palette[PC.AccentStateless]};
    width: 0;
    height: 0;
    transition: width 150ms linear, height 150ms linear;

    &:after {
      width: 12px;
      height: 12px;
    }
  }

  ${({ $forceShow }) =>
    $forceShow &&
    css`
      height: 4px;

      .SfxSlider-thumb {
        width: 12px;
        height: 12px;
      }

      .SfxSlider-Track {
        background: ${({ theme: { palette } }) => palette[PC.AccentStateless]};
      }
    `}

  &:hover {
    height: 4px;

    .SfxSlider-thumb {
      width: 12px;
      height: 12px;
    }

    .SfxSlider-Track {
      background: ${({ theme: { palette } }) => palette[PC.AccentStateless]};
    }
  }
`;

const ControlsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 10px calc(24px - 6px);
  background-color: ${({ theme: { palette } }) => palette[PC.BackgroundHover]};
`;

const TimeLapse = styled.p`
  margin: 0;
  color: ${({ theme: { palette } }) => palette[PC.TextSecondary]};
  ${({ theme: { typography } }) => typography.font[FV.LabelMediumEmphasis]};
`;

const Menu = styled(SfxMenu)`
  transition: all 200ms ease-out;
  margin-bottom: 5px;
  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      opacity: 0;
    `}
`;

const VolumeSlider = styled(SfxSlider)`
  border: 0;
  width: 0;
  border-radius: 4px;
  height: 2px;
  transition: margin 0.2s cubic-bezier(0.4, 0, 1, 1),
    width 0.2s cubic-bezier(0.4, 0, 1, 1);

  .SfxSlider-rail {
    background: ${({ theme: { palette } }) =>
      palette[PC.BorderPrimaryStateless]};
    border: inherit;
    border-radius: inherit;
  }

  .SfxSlider-Track {
    background: ${({ theme: { palette } }) => palette[PC.IconsPrimary]};
    border: inherit;
    transition: height 100ms linear;
  }

  .SfxSlider-thumb {
    background: ${({ theme: { palette } }) => palette[PC.IconsPrimary]};
    transition: width 150ms linear, height 150ms linear;
    width: 8px;
    height: 8px;
    opacity: 0;
    transition: opacity 100ms ease-out;
  }
`;

const PlayButton = styled(SfxIconButton)`
  position: relative;

  &:active,
  &:focus {
    background-color: transparent;
  }

  &:hover {
    background-color: transparent;

    ${({ $disableHover }) =>
      $disableHover &&
      css`
        background-color: transparent;
      `}
  }
`;

const PlaybackButton = styled(Button)`
  border: 0;
  min-width: 40px;
`;

const LoadingIcon = styled(Loading)`
  position: absolute;
  animation: spinner 2s linear infinite;
  top: calc(50% - 20.5px);
  left: calc(50% - 20.5px);
  transition: opacity 100ms ease-in-out;
  color: ${({ theme: { palette } }) => palette[PC.AccentStateless]};

  ${({ $hidden }) =>
    $hidden &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
`;

const VolumeControlWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  ${({ $shown }) =>
    $shown &&
    css`
      ${VolumeSlider} {
        width: 56px;

        .SfxSlider-thumb {
          opacity: 1;
        }
      }
    `}

  &:hover ${VolumeSlider} {
    width: 56px;

    .SfxSlider-thumb {
      opacity: 1;
    }
  }
`;

const IconButton = styled(SfxIconButton)`
  position: relative;
  width: 40px;
  height: 40px;

  &:hover,
  &:active,
  &:focus {
    background-color: transparent;
  }
`;

const Icon = styled(({ icon, ...props }) => cloneElement(icon, props))`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 150ms ease-out;
  color: ${({ theme: { palette } }) => palette[PC.IconsPrimary]};
  background: transparent;

  ${({ $hidden }) =>
    $hidden &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
`;

const ExtraControllers = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  gap: 12px;
`;

const ExtraControllerBtn = styled(IconButton)`
  display: inline-flex;
`;

const Styled = {
  MediaControls,
  ControlsWrapper,
  PlayButton,
  PlaybackButton,
  LoadingIcon,
  SeekSlider,
  TimeLapse,
  Menu,
  VolumeControlWrapper,
  VolumeSlider,
  IconButton,
  Icon,
  ExtraControllers,
  ExtraControllerBtn,
};

export default Styled;
