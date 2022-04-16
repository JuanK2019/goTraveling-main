import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { onChange } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'

import { loginWithEmailAndPassword } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'
import Loading from '../goTraveling/Loading'


export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [FormData, setFormData] = useState(defaultFromValues())
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({ ...FormData, [type]: e.nativeEvent.text })
    }

    const LoginDo = async() => {
       if(!validateData()) {
           return;
       }

       setLoading(true)
       const result = await loginWithEmailAndPassword(FormData.email, FormData.password)
       setLoading(false)

       if(!result.statusResponse) {
           setErrorEmail(result.error)
           setErrorPassword(result.error)
           return 
       }

       navigation.navigate("account")
    }

    const validateData = () => {
        setErrorEmail("")
        setErrorPassword("")
        let valid = true
    
    if(!validateEmail(FormData.email)) {
        setErrorEmail("Ingresa un correo que sea válido.")
        valid = false
    }

    if(isEmpty(FormData.password)) {
        setErrorPassword("Debes ingresar una contraseña.")
        valid = false
    }

    return valid
}

    return (
        <View style={styles.container}>
            <Input
              containerStyle={styles.input}
              placeholder="Ingrese el correo electrónico"
              onChange={(e) => onChange(e, "email")}
              errorMessage={errorEmail}
              defaultValue={FormData.email}
            />
            <Input
              containerStyle={styles.input}
              placeholder="Ingrese la contraseña"
              password={true}
              secureTextEntry={!showPassword}
              onChange={(e) => onChange(e, "password")}
              errorMessage={errorPassword}
              defaultValue={FormData.password}
              rightIcon={
                <Icon
                  type="material-community"
                  name={ showPassword ? "eye-off" : "eye-off-outline" }
                  iconStyle={styles.icon}
                  onPress={() => setShowPassword(!showPassword)}
              />
              }
            />
            <Button
              title= "Iniciar Sesión"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn}
              onPress={() => LoginDo()}
            />
            <Loading isVisible={loading} text="Iniciando sesión"/>
        </View>
    )
            }       

const defaultFromValues = () => {
    return { email: "", password: "" }
}

const styles = StyleSheet.create({
    form: {
        marginTop: 20
    },
    input: {
        width: "90%",
        alignSelf: "center"
    },  
    btnContainer: {
        marginTop: 20,
        width: "80%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#6DC72A"
    },
    icon: {
        color: "#00507D"
    }
})