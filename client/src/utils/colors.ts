export const getRandomPastelColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const redMixed = Math.floor((red + 255) / 2);
  const greenMixed = Math.floor((green + 255) / 2);
  const blueMixed = Math.floor((blue + 255) / 2);

  const redHex = redMixed.toString(16).padStart(2, "0");
  const greenHex = greenMixed.toString(16).padStart(2, "0");
  const blueHex = blueMixed.toString(16).padStart(2, "0");

  return `#${redHex}${greenHex}${blueHex}`;
};
