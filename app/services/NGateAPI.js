import httpClient from '../libs/httpClient';
import { config } from '../constants/constants';

const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const httpUrl = (route) => `${config.NGateHost}/${route}`;
const request = (route) => httpClient.get(httpUrl(route), httpOptions);

export const getDevices = () => request(`api/devices/`);

export const getDeviceState = (uuid) => request(`api/devices/${uuid}`);

export const sendDeviceAction = (uuid, parameters) =>
  httpClient.post(httpUrl(`api/devices/${uuid}/action`), { parameters })
    .catch((error) => console.error(error));