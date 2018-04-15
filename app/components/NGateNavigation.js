import { DrawerNavigator } from 'react-navigation';
import DoorViewPager from '../containers/DoorViewPager';
import DoorConfig from '../containers/DoorConfig';
import CustomDrawerContent from '../containers/CustomDrawerContent';
import ShareScreen from './ShareScreen';

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
  },
  {
    initialRouteName: 'DoorViewPager',
    contentComponent: CustomDrawerContent,
  },
);

export default NGateNavigation;
