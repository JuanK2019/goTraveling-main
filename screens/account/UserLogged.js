import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-easy-toast"

import { closeSession, getCurrentUser } from "../../utils/actions"
import Loading from "../../components/goTraveling/Loading"
import InfoUser from "../../components/account/InfoUser"
import AccountOptions from "../../components/account/AccountOptions"

export default function UserLogged() {
  const toastRef = useRef();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [user, setUser] = useState(null);
  const [relodUser, setReloadUser] = useState(false)

  useEffect(() => {
      setUser(getCurrentUser())
      setReloadUser(false)
  }, [relodUser])

  return (
    <View style={styles.container}>
      {user && (
        <View>
          <InfoUser
            user={user}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
          <AccountOptions user={user} 
          toastRef={toastRef} 
          setReloadUser={setReloadUser}
          />
        </View>
      )}
      <Button
        title="Cerrar Sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionTitle}
        onPress={() => {
          closeSession();
          navigation.navigate("touristSites");
        }}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={loading} text={loadingText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#f9f9f9",
  },
  btnCloseSession: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "#6DC72A",
    borderTopWidth: 1,
    borderTopColor: "#6DC72A",
    borderBottomWidth: 1,
    borderBottomColor: "#6DC72A",
    paddingVertical: 10,
    width: "80%",
    alignSelf: "center"
  },
  btnCloseSessionTitle: {
    color: "#FFFFFF",
  },
});
