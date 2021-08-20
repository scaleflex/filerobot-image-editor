import { ROOT_CONTAINER_ID } from './constants';

export const toggleFullscreen = (e) => {
  // It should be .getElementById but it is not as user might have multiple blocks with same ID (which is not right)
  // but we do that for making sure right implementation most of the time
  // so that we would have the last added block with that ID to be fullscreened as most probably it would be the plugin.
  const clickedButton = e.currentTarget;
  const element = clickedButton.closest(`#${ROOT_CONTAINER_ID}`);

  if (!element) { return; }

  document.fullscreenElement = document.fullscreenElement || document.mozFullscreenElement
    || document.msFullscreenElement || document.webkitFullscreenDocument;
  
  document.exitFullscreen = document.exitFullscreen || document.mozExitFullscreen
    || document.msExitFullscreen || document.webkitExitFullscreen;

  element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen
    || element.msRequestFullscreen || element.webkitRequestFullscreen;

  if (!document.fullscreenElement) {
    element.requestFullscreen()
      .catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
  } else if (document.exitFullscreen && document.fullscreenElement) { document.exitFullscreen(); }
}