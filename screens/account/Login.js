import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import LoginForm from '../../components/account/LoginForm'

export default function Login() {
    return (
        <KeyboardAwareScrollView>
         <Image
            source={require("../../assets/Logo.png")}
            resizeMode="contain"
            style={styles.image}
         />
             <LoginForm/>
          <Divider style={styles.Divider}/>
        </KeyboardAwareScrollView>
         
        )
    }

function CreateAccount(props) {
    const navigation = useNavigation()

    return (
        <Text style={styles.register}
            onPress={() => navigation.navigate("register")}>
            ¿Aún no tienes una cuenta?{" "}
            <Text style={styles.btnRegister}>
                Regístrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image : {
        marginTop: 20,
        height: 200,
        width: "100%",
        marginBottom: 20
    },
    container: {
        marginHorizontal: 40
    },
    divider: {
        backgroundColor: "#442484",
        margin: 20
    },
    register: {
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: "center"
    },
    btnRegister: {
        color: "#00507D",
        fontWeight: "bold"
    }
})

