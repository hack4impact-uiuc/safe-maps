import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';

import HomeScreen from './screens/CustomOverlay';

var {height, width} = Dimensions.get('window');

export default DrawerNavigator({
    'Home': {
        screen: HomeScreen,
    },
}, {
    initialRouteName: 'Home',
    drawerWidth: width / 2,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: 'green',
    contentOptions: {
        activeTintColor: 'red',
    },
    order: ['Home']
} );
