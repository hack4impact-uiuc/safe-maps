import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'

// Instagram like tab navigator
import {TabNavigator} from 'react-navigation'

// Components on the navigator
import MapTab from './components/AppTabNavigator/MapTab'
import SettingTab from './components/AppTabNavigator/SettingTab'

class MainScreen extends Component {
    render() {
        return (
            <AppTabNavigator/>
        );
    }
}

export default MainScreen;

// This instance will create the TabNavigator that displays the instagram-like tab bar
const AppTabNavigator = TabNavigator({

    MapTab: {
        screen: MapTab
    },

    SettingTab: {
        screen: SettingTab
    }

}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
        style: {
            ...Platform.select({
                android: {
                    backgroundColor: 'white'
                }
            })
        },
        showLabel: false,
        showIcon: true,
    }
})