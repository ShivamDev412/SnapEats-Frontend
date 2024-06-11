const useDeviceType = () => {
  const device = navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      device
    );
  return isMobile;
};
export default useDeviceType;