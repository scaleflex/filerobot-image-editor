const usePhoneScreen = (screenWidth = 438) =>
  window.matchMedia(`(max-width: ${screenWidth}px)`).matches;

export default usePhoneScreen;
