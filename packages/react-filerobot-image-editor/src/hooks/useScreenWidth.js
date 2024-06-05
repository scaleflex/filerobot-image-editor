const useScreenWidth = (screenWidth) =>
  window.matchMedia(`(max-width: ${screenWidth}px)`).matches;

export default useScreenWidth;
