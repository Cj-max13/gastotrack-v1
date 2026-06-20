import { NativeModules } from 'react-native';

const { NotificationModule } = NativeModules;

export const requestPermission = () => {
  if (NotificationModule) {
    NotificationModule.requestPermission();
  } else {
    console.warn('NotificationModule not available - using Expo Go or native module not built yet');
  }
};

export const saveToken = (token) => {
  if (NotificationModule && token) {
    NotificationModule.saveToken(token);
  } else {
    console.warn('NotificationModule not available - using Expo Go or native module not built yet');
  }
};

export default {
  requestPermission,
  saveToken,
};
