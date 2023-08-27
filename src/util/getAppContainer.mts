export const getAppContainer = () => {
  const container = document.querySelector('main#panorama');
  if (!container) {
    throw new Error('NoContainer: #panorama');
  }
  return container as HTMLElement;
};
