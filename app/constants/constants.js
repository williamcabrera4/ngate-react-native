import envConfig from './config.json';

export const colors = {
  colorPrimary: '#b80942',
  colorPrimaryDark: '#7a062c',
  colorAccent: '#FF4081',
  subContainerBackgroundColor: '#ebeae8',
  gridItemStroke: '#ccc',
  gridItemBackground: '#fff',
  white: '#fff',
};

export const operations = {
  OPEN_CLOSE: 'openclose',
};

export const config = {
  deviceUUID: envConfig.deviceUUID,
  NGateHost: envConfig.NGateHost,
};