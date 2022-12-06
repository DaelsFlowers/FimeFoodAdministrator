import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
//bannerTop
import TopBanner from "../../assets/Top-set.png"
import PerfilImg from "../../assets/PerfilImg.png"

export default function PerfilSeller({ navigation }) {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    })

    function handleChange(text, eventName) {
        console.log(values);
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    const user = firebase.auth().currentUser;
    const firestore = firebase.firestore;

    async function loadData() {
        try {
            const docRef = firestore().collection("Users").doc(user.uid).get();
            setName((await docRef).data().name)
            setEmail((await docRef).data().email)
            setPassword((await docRef).data().password)
            setPhone((await docRef).data().phone)
        } catch (error) {

        }
    }
    useEffect(() => {
        loadData()
    }, [])

    function UpdateUser() {
        const { name, email, password, phone } = values

        user.updatePassword(password).then(() => {
            user.updateEmail(email)
                .then(() => {
                    firestore().collection("Users").doc(user.uid).update({
                        name: name,
                        email: email,
                        password: password,
                        password2: password,
                        phone: phone
                    })
                    alert("SE ACTUALIZO CORRECTAMENTE");
                    firebase.auth().signOut()
                })
                .catch((error) => {
                    alert(error.message);
                    console.log(error.message)
                })
        }).catch((error) => {
            alert(error.message);
            console.log(error.message)
        });
    }
    function DeleteUser() {
        firestore().collection("Users").doc(user.uid).delete().then(() => {
            user.delete().then(() => {
                alert("HASTA LA PROXIMA");
            }).catch((error) => {
                alert(error.message);
                console.log(error.message)
            });
        }).catch((error) => {
            calert(error.message);
            console.log(error.message)
        });

    }


    return (

        <SafeAreaView style={styles.View}>

            <View style={styles.TopView}>
                {/* <View style={styles.TopViewAux}></View> */}
                <Image
                    style={styles.TopBanner}
                    source={TopBanner}
                />
            </View>


            <View style={styles.ContentView}>
                <Text style={{ textAlign: "center", fontSize: 22, fontWeight: 'bold' }}>PERFIL</Text>



                <View style={styles.LoginView}>
                    <Image
                        style={styles.PerfilImg}
                        source={PerfilImg}
                    />
                    <Text style={styles.Label}>NOMBRE</Text>
                    <View style={styles.input} >
                        <TextInput placeholder={name} style={styles.inputIn} onChangeText={text => handleChange(text, "name")} />
                    </View>
                    <Text style={styles.Label}>CORREO</Text>
                    <View style={styles.input} >
                        <TextInput placeholder={email} style={styles.inputIn} onChangeText={text => handleChange(text, "email")} />
                    </View>

                    <Text style={styles.Label}>CONTRASEÑA</Text>
                    <View style={styles.input} >
                        <TextInput placeholder={password} style={styles.inputIn} onChangeText={text => handleChange(text, "password")} />
                    </View>

                    <Text style={styles.Label}>TELEFONO</Text>
                    <View style={styles.input} >
                        <TextInput placeholder={phone} style={styles.inputIn} onChangeText={text => handleChange(text, "phone")} />
                    </View>
                    <View style={styles.buttonRegister} >
                        <Button title="ACTUALIZAR DATOS" color="#1e3c89" onPress={() => UpdateUser()} />
                    </View>

                    <View>
                        <BouncyCheckbox
                            size={25}
                            fillColor="red"
                            text='QUIERO BORRAR MI CUENTA'
                            unfillColor="#FFFFFF"
                            innerIconStyle={{ borderWidth: 2 }}
                            style={{ alignSelf: "center", marginTop: 20 }}
                        />
                    </View>
                    <View style={styles.buttonCancel} >
                        <Button title="BORRAR CUENTA" color="#891e1e" onPress={() => DeleteUser()} />
                    </View>

                </View>



            </View>




        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    //BASE
    View: {
        backgroundColor: "#fff",
        flex: 3,
    },
    TopView: {
        //backgroundColor: "#f0f",
        flex: 1,
    },
    ContentView: {
        //        backgroundColor: "#ff0",
        flex: 6,

    },
    TopBanner: {
        width: "100%",
        height: 100,
        resizeMode: 'stretch',
    },


    //END BASE
    LoginView: {
        backgroundColor: "#fff",
        marginTop: 10,
        width: "90%",
        alignSelf: "center",
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
    PerfilImg: {
        marginTop: 10,
        height: 100,
        width: 100,
        resizeMode: 'stretch',
        alignSelf: "center",
    },
    Label: {
        textAlign: "center",
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: "#fff",
        shadowColor: "rgba(0, 0,0, 0.48)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        width: "80%",
        alignSelf: "center",
        borderColor: "rgba(0, 0,0, 0.25)",
        borderWidth: 1,
    },
    inputIn: {
        width: "100%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },
    buttonRegister: {
        backgroundColor: "#1e3c89",
        margin: 25,
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


