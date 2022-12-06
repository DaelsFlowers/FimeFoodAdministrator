import { View, Text, Image, StyleSheet, Button, SafeAreaView, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import BouncyCheckbox from "react-native-bouncy-checkbox";

import TopBanner from "../assets/Top-login.png"
import BottonBanner from "../assets/botton-login.png"

export default function RegisterScreen({ navigation }) {


    const auth = firebase.auth;
    const firestore = firebase.firestore;



    const [rol, setRol] = useState();

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        phone: ""
    })

    function handleChange(text, eventName) {

        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    function Register() {
        const { name, email, password, password2, phone } = values

        if (password == password2) {
            auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firestore().collection("Users").doc(auth().currentUser.uid).set({
                        uid: auth().currentUser.uid,
                        name,
                        email,
                        password,
                        password2,
                        phone
                    })
                })
                .catch((error) => {
                    alert(error.message);
                    console.log(error.message)
                })
        } else {
            alert("LAS CONTRASEÑAS SON DIFERENTES")
        }

    }

    return (

        <SafeAreaView style={styles.View}>

            <View style={styles.TopView}>
                <View style={styles.TopViewAux}></View>
                <Image
                    style={styles.TopBanner}
                    source={TopBanner}
                />
            </View>

            <View style={styles.ContentView}>
                <ScrollView>
                    <View style={styles.LoginView}>
                        <Text style={{ textAlign: "center", fontSize: 24, marginTop: 10, }}>CREA UN PERFIL</Text>

                        <Text style={{ marginLeft: 30, fontSize: 14, marginTop: 10, }}>NOMBRE</Text>
                        <TextInput style={styles.input}
                            keyboardType="default" onChangeText={text => handleChange(text, "name")} />
                        <Text style={{ marginLeft: 30, fontSize: 14, marginTop: 10, }}>CORREO</Text>
                        <TextInput style={styles.input}
                            keyboardType="default" onChangeText={text => handleChange(text, "email")} />
                        <Text style={{ marginLeft: 30, fontSize: 14, marginTop: 10, }}>CONTRASEÑA</Text>
                        <TextInput style={styles.input}
                            keyboardType="default" onChangeText={text => handleChange(text, "password")} />
                        <Text style={{ marginLeft: 30, fontSize: 14, marginTop: 10, }}>CONTRASEÑA</Text>
                        <TextInput style={styles.input}
                            keyboardType="default" onChangeText={text => handleChange(text, "password2")} />
                        <Text style={{ marginLeft: 30, fontSize: 14, marginTop: 10, }}>TELEFONO</Text>
                        <TextInput style={styles.input}
                            keyboardType="default" onChangeText={text => handleChange(text, "phone")} />
                        <View>
                            <BouncyCheckbox
                                size={25}
                                fillColor="green"
                                text='Acceptar Terminos y Condiciones'
                                unfillColor="#FFFFFF"
                                innerIconStyle={{ borderWidth: 2 }}
                                style={{ alignSelf: "center", marginTop: 20 }}
                            />
                        </View>
                        <Text style={{ fontSize: 10, marginTop: 10, textAlign: "center" }}>
                            PODRAS PUBLICAR TUS PRODUCTOS Y QUE LOS DEMAS LOS VEAN, ESTO HABILITA QUE LOS DEMAS PUEDAN VER TU NUMERO DE TELEFONO
                        </Text>
                        <View style={styles.buttonRegister} >
                            <Button title="REGISTRARSE" color="#1E8942" onPress={() => Register()} />
                        </View>


                    </View>
                </ScrollView>

                <View style={styles.RegisterView}>
                    <Text style={{ textAlign: "center", fontSize: 16, marginTop: 18, width: 300, alignSelf: "center" }}>YA CUENTRAS CON UN PERFIL?</Text>
                    <View style={styles.buttonLogin} >
                        <Button title="INICIAR SESION" color="#1e3c89" onPress={() => navigation.navigate("Login")} />
                    </View>

                </View>
            </View>


            <View style={styles.bottonView}>
                <Image
                    style={styles.BottonBanner}
                    source={BottonBanner}
                />
            </View>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    View: {
        backgroundColor: "#fff",
        flex: 1,
    },
    TopView: {
        //backgroundColor: "#f0f",
        flex: 1,
    },
    bottonView: {
        //backgroundColor: "#0ff",
        flex: 1,
        justifyContent: "flex-end"
    },
    TopViewAux: {
        height: 20,
        backgroundColor: "#1e8942"
    },
    ContentView: {
        //backgroundColor: "#ff0",
        marginTop: 50,
    },
    LoginView: {
        backgroundColor: "#fff",
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 25,
    },
    RegisterView: {
        backgroundColor: "#fff",
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 25,
    },
    TopBanner: {
        width: "100%",
        height: 140,
        resizeMode: 'stretch',
    },
    BottonBanner: {
        width: "100%",
        height: 90,
        resizeMode: 'stretch',
    },
    input: {
        marginTop: 5,
        marginHorizontal: 30,
        height: 25,
        borderWidth: 1,
        borderColor: "#fff",
        borderBottomColor: "#000"
    },
    buttonLogin: {
        backgroundColor: "#1E8942",
        margin: 5,
        width: 175,
        height: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 5,
        alignSelf: "center",
    },
    buttonRegister: {
        backgroundColor: "#1e3c89",
        margin: 15,
        width: 175,
        height: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 5,
        alignSelf: "center",
    }
});
