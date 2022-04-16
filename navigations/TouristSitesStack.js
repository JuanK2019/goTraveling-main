import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TouristSites from '../screens/TouristSites'

const Stack = createStackNavigator()

export default function TouristSitesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "touristSites"
                component = {TouristSites}
                options = {{ title: "Sitios Turísticos" }}
            />
        </Stack.Navigator>
    )
}