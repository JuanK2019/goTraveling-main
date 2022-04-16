import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WishList from '../screens/WishList'

const Stack = createStackNavigator()

export default function WishListStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "wishList"
                component = {WishList}
                options = {{ title: "Lista de deseos" }}
            />
        </Stack.Navigator>
    )
}