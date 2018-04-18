import { DrawerNavigator } from 'react-navigation';
import DoorViewPager from '../containers/DoorViewPager';
import DoorConfig from '../containers/DoorConfig';
import CustomDrawerContent from '../containers/CustomDrawerContent';
import ShareScreen from './ShareScreen';
import ScanQrScreen from './ScanQrScreen';
import Proxy from './Proxy';

const NGateNavigation = DrawerNavigator({
    DoorConfig: {
      screen: DoorConfig,
    },
    DoorViewPager: {
      screen: DoorViewPager,
    },
    ShareScreen: {
      screen: ShareScreen,
    },
    ScanQrScreen: {
      screen: ScanQrScreen,
    },
    Proxy: {
      screen: Proxy,
    },
  },
  {
    initialRouteName: 'DoorViewPager',
    contentComponent: CustomDrawerContent,
  },
);

export default NGateNavigation;
