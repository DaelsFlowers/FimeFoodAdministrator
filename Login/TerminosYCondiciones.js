import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useState } from 'react'
import TopBanner from "../assets/Top-login.png"
import BottonBanner from "../assets/botton-login.png"

const TerminosYCondiciones = () => {
    const [rol, setRol] = useState();
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
                <View style={styles.LoginView}>
                    <Text style={{ textAlign: "center", fontSize: 24, marginTop: 10, }}>TERMINOS Y CONDICIONES</Text>

                    <View>
                        <BouncyCheckbox
                            size={25}
                            fillColor="green"
                            text='TU INFORMACION SERA PROPORCIONADA A OTROS POR TEMAS DE SEGURIDAD PARA MANTENER A TODOS LOS USUARIOS SEGUROS'
                            unfillColor="#FFFFFF"
                            innerIconStyle={{ borderWidth: 2 }}
                            style={{ width: "90%", alignSelf: "center", marginTop: 20 }}
                        />
                    </View>
                    <View>
                        <BouncyCheckbox
                            size={25}
                            fillColor="green"
                            text='SE PROHIBE TODO TIPO DE VENTAS ILEGALES DENTRO DE LA APLICACION, ESTO INCLUYE:ARMAS, SUSTANCIAS PSICOACTIVAS, TAREAS Y FOTOGRAFIAS DE TODO TIPO.'
                            unfillColor="#FFFFFF"
                            innerIconStyle={{ borderWidth: 2 }}
                            style={{ width: "90%", alignSelf: "center", marginTop: 20 }}
                        />
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, marginVertical: 30, textAlign: "center" }}>
                            GRACIAS A ESTO MANTENDREMOS UNA APLICACION PARA ESTUDIANTES DE FORMA SEGURA, GRACIAS.
                        </Text>
                    </View>

                    <View style={styles.buttonLogin} >
                        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center", marginTop: 8 }} >ACCEPTAR</Text>
                    </View>
                    <View style={styles.buttonCancel} >
                        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center", marginTop: 8 }} >REGRESAR</Text>
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
    buttonCancel: {
        backgroundColor: "#891e1e",
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

export default TerminosYCondiciones