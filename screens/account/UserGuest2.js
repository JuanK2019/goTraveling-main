import React from 'react'
import { StyleSheet, Image, Text } from 'react-native'
import { useNavigation} from '@react-navigation/native'
import { Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function UserGuest() {
    const navigation = useNavigation()

    return (
        <ScrollView
          contentOffset
          style={styles.viewBody}
        >
            <Image
              source={require("../../assets/Logo.png")}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.title}>Accede a tu perfil en goTraveling</Text>
            <Text style={styles.description}>
            Encontrarás los mejores lugares para visitar, ingresa y podrás disfrutar de nuestro contenido y compartir tus experiencias.
            </Text>
        <Button
            title="Ver perfil"
            color="#6DC72A"
            borderRadius= "50"
            onPress={() => navigation.navigate("login")}
        />
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height: 350,
        width: "100%"
    },
    title: {
      fontWeight: "bold",
      fontSize: 19,
      marginVertical: 10,
      textAlign: "center",
      color: "#00507D"
    }, 
    description: {
        textAlign: "justify",
        marginBottom: 20,
        color: "#000000"
    }
  })
  
  //SE CREÓ DE NUEVO EL COMPONENT "UserGuest".
