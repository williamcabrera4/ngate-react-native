import httpClient from '../libs/httpClient';
import { config } from '../constants/constants';
import * as DeviceInfo from 'react-native-device-info';

const phone = {
  brand: DeviceInfo.getBrand(),
  model: DeviceInfo.getModel(),
  uniqueId: DeviceInfo.getUniqueID(),
};

const httpUrl = (route) => `${config.NGateHost}/${route}`;

export const getDeviceState = (uuid) => httpClient.post(httpUrl(`api/v1/devices/${uuid}/monitor`), { phone });

export const sendDeviceAction = (uuid, parameters) =>
  httpClient.post(httpUrl(`api/v1/devices/${uuid}/action`), { parameters, phone });
