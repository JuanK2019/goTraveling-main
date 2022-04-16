import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TopTouristSites from '../screens/TopTouristSites'

const Stack = createStackNavigator()

export default function TopTouristSitesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "topTouristSites"
                component = {TopTouristSites}
                options = {{ title: "Top 10" }}
            />
        </Stack.Navigator>
    )
}