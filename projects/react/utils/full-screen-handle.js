import { MODAL_ID } from '../config';

export const toggleModalFullscreen = (configElementId) => {
  // It should be .getElementById but it is not as we user might have multiple blocks with same ID (which is not right)
  // but we do that for making sure right implement most of the time
  // so that we would have the last added block with that ID to be fullscreened as most probably it would be the plugin.
  const modalElems = document.querySelectorAll(`#${configElementId || MODAL_ID}`);
  const modal = modalElems[modalElems.length - 1];

  if (!modal) { return; }

  document.fullscreenElement = document.fullscreenElement || document.mozFullscreenElement
    || document.msFullscreenElement || document.webkitFullscreenDocument;
  
  document.exitFullscreen = document.exitFullscreen || document.mozExitFullscreen
    || document.msExitFullscreen || document.webkitExitFullscreen;

  modal.requestFullscreen = modal.requestFullscreen || modal.mozRequestFullscreen
    || modal.msRequestFullscreen || modal.webkitRequestFullscreen;

  if (!document.fullscreenElement) {
    modal.requestFullscreen()
      .catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
  } else if (document.exitFullscreen) { document.exitFullscreen(); }
}