module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@api': ['./src/api'],
            '@assets': ['./src/assets'],
            '@components': ['./src/components'],
            '@config': ['./src/config'],
            '@languages': ['./src/languages'],
            '@navigation': ['./src/navigation'],
            '@react-query': ['./src/react-query'],
            '@screens': ['./src/screens'],
            '@services': ['./src/services'],
            '@store': ['./src/store'],
            '@theme': ['./src/theme'],
            '@utils': ['./src/utils'],
          },
        },
      ],
    ],
  };
};
