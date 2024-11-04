export const getRandomColor = (s?: string | number) => {
  const letters = `012345678${s || 9}ABCDEF`;
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getInverseColor = (hexColor: string): string => {
  // Remove '#' if it exists
  hexColor = hexColor.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Choose black or white as inverse color based on luminance
  let inverseHex: string;
  if (luminance > 0.5) {
    inverseHex = '#000000'; // Black for bright colors
  } else {
    inverseHex = '#FFFFFF'; // White for dark colors
  }

  return inverseHex;
};
