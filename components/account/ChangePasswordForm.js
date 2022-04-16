import { isEmpty, size } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { reauthenticate, updatePassword } from '../../utils/actions'

export default function ChangePasswordForm({ setShowModal, toastRef }) {
    
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if(!validateForm()){
            return
        }

        setLoading(true)
        const resultReauthenticate = await reauthenticate(currentPassword)
        if(!resultReauthenticate.statusResponse){
            setLoading(false)
            setErrorCurrentPassword("Contraseña incorrecta.")
            return
        }
        
        const resultUpdatePassword = await updatePassword(newPassword)
        setLoading(false)

        if(!resultUpdatePassword.statusResponse){
            setErrorNewPassword("Oucrrió un problema cambiando la contraseña. por favor intente más tarde.")
            return
        }

        toastRef.current.show("Se ha actualizado la contraseña.", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid = true

        if(isEmpty(currentPassword)){
            setErrorCurrentPassword("Debe ingresar su contraseña actual.")
            isValid = false
        }

        if(size(newPassword) < 6){
            setErrorNewPassword("Debe ingresar una nueva contraseña de al menos 6 caracteres.")
            isValid = false
        }

        if(size(confirmPassword) < 6){
            setErrorConfirmPassword("Debe ingresar una nueva confirmación de al menos 6 caracteres.")
            isValid = false
        }

        if(newPassword !== confirmPassword){
            setErrorNewPassword("La nueva contraseña y la confirmación no son iguales.")
            setErrorConfirmPassword("La nueva contraseña y la confirmación no son iguales.")
            isValid = false
        }

        if(newPassword === currentPassword){
            setErrorCurrentPassword("Debe ingresar una contraseña diferente a la actual.")
            setErrorNewPassword("Debe ingresar una contraseña diferente a la actual.")
            setErrorConfirmPassword("Debe ingresar una contraseña diferente a la actual.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.view}>            
            <Input
                placeholder="Ingresa la contraseña actual"
                containerStyle={styles.input}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                    
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline" }
                        iconProps={{ color:"#00507D" }}                        
                        onPress={() => setShowPassword(!showPassword)}                    
                    />
                }
            />
            <Input
                placeholder="Ingresa la nueva contraseña"
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                    
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline" }
                        iconProps={{ color:"#00507D" }}                        
                        onPress={() => setShowPassword(!showPassword)}                    
                    />
                }
            />
            <Input
                placeholder="Ingresa la confirmación de la nueva contraseña"
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon                    
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline" }
                        iconProps={{ color:"#00507D" }}                        
                        onPress={() => setShowPassword(!showPassword)}                    
                    />
                }
            />
            <Button
                title="Cambiar contraseña"
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
