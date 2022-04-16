import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Loading from '../../components/goTraveling/Loading'
import { getCurrentUser } from '../../utils/actions'
import { useFocusEffect } from '@react-navigation/native'

import UserGuest from '../account/UserGuest2' //ACÁ TAMBIÉN VOLVÍ A IMPORTAR
import UserLogged from '../account/UserLogged'

export default function Account() {
    const [login, setLogin] = useState(null)

    useFocusEffect (() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])

    if (login == null) {
        return <Loading isVisible={true} text="Cargando..."/>
    }

    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})