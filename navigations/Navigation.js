import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TouristSitesStack from './TouristSitesStack'
import FavoritesStack from './FavoritesStack'
import WishListStack from './WishListStack'
import TopTouristSitesStack from './TopTouristSitesStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

  const Drawer = createDrawerNavigator();
  
  export default function App() {

    return (
    
      <NavigationContainer>
        <Drawer.Navigator 
            initialRouteName = "touristSites"            
        >
        <Drawer.Screen name="Sitios Turísticos" component={TouristSitesStack} />
        <Drawer.Screen name="Favoritos" component={FavoritesStack} />
        <Drawer.Screen name="Lista de deseos" component={WishListStack} />
        <Drawer.Screen name="Top 10" component={TopTouristSitesStack} />
        <Drawer.Screen name="Buscar" component={SearchStack} />
        <Drawer.Screen name="Cuenta" component={AccountStack} />         
          
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }

