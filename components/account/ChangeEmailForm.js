import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import { reauthenticate, updateEmail } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailForm({ email, setShowModal, toastRef, setReloadUser }) {
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateForm()) {
            return
        }

        setLoading(true)
        const resultReauthenticate = await reauthenticate(password)
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorPassword("Contraseña incorrecta.")
            return
        }

        const resultUpdateEmail = await updateEmail(newEmail)
        setLoading(false)

        if (!resultUpdateEmail.statusResponse) {
            setErrorEmail("Este correo ya existe en la aplicación.")
            return
        }

        setReloadUser(true)
        toastRef.current.show("Se ha actualizado el correo.", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setErrorEmail(null)
        setErrorPassword(null)
        let Valid = true

        if(!validateEmail(newEmail)) {
            setErrorEmail("Debes ingresar un correo correcto.")
            Valid = false
        }

        if(newEmail === email) {
            setErrorEmail("Debes ingresar un correo diferente al actual.")
            Valid = false
        }

        if(isEmpty(password)) {
            setErrorPassword("Debes ingresar tu contraseña para hacer el cambio.")
            Valid = false
        }
        return Valid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa tu nuevo correo"
                containerStyle={styles.input}
                defaultValue={email}
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#00507D"
                }}
            />
            <Input
                placeholder="Ingresa tu contraseña"
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                    type="material-community"   
                    name={ showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={{ color: "#00507D" }}
                    onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar Correo Electrónico"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: "90%"
    },
    btn: {
        backgroundColor: "#6DC72A"
    }
})