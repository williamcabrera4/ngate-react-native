import { DrawerNavigator } from 'react-navigation';
import DoorViewPager from '../containers/DoorViewPager';
import DoorConfig from '../containers/DoorConfig';
import CustomDrawerContent from '../containers/CustomDrawerContent';

const NGateNavigation = DrawerNavigator({
    DoorConfig: {
      screen: DoorConfig,
    },
    DoorViewPager: {
      screen: DoorViewPager,
    },
  },
  {
    initialRouteName: 'DoorViewPager',
    contentComponent: CustomDrawerContent,
  },
);

export default NGateNavigation;
