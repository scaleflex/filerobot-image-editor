import { MODAL_ID } from '../config';

export const toggleModalFullscreen = (configElementId) => {
  document.fullscreenElement = document.fullscreenElement || document.mozFullscreenElement
    || document.msFullscreenElement || document.webkitFullscreenDocument;
  
  document.exitFullscreen = document.exitFullscreen || document.mozExitFullscreen
    || document.msExitFullscreen || document.webkitExitFullscreen;

  const modal = document.getElementById(configElementId || MODAL_ID);

  modal.requestFullscreen = modal.requestFullscreen || modal.mozRequestFullscreen
    || modal.msRequestFullscreen || modal.webkitRequestFullscreen;

  if (!document.fullscreenElement) {
    modal.requestFullscreen()
      .catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
  } else if (document.exitFullscreen) { document.exitFullscreen(); }
}