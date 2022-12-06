import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableHighlight, ScrollView, Button, Alert, FlatList, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect, Component } from 'react'

import { Picker } from '@react-native-picker/picker'
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
//bannerTop
import TopBanner from "../../assets/Top-set.png"

//Icons
import ProductsIcon from "../../assets/ProducstIcon.png"
import PerfilIcon from "../../assets/PerfilIcon.png"

import ExitIcon from "../../assets/ExitIcon.png"


export default function HomeSeller({ navigation }) {

    const auth = firebase.auth;
    const firestore = firebase.firestore;

    const [names, setnames] = useState()
    const [phone, setPhone] = useState()
    const user = firebase.auth().currentUser;
    const [rol, setRol] = useState();
    const [productsList, setProductsList] = useState([]);

    const [values, setValues] = useState({
        userid: user.uid,
        name: "",
        horario: "",
        costo: "",
        categoria: "",
        img: "",
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
        const { userid, name, horario, costo, categoria, img } = values

        if (name !== "" && horario !== "" && costo !== "" && categoria !== "") {
            firestore().collection("Productos").where("userid", "==", user.uid).get()
                .then((snahp) => {
                    const cantidad = snahp.size
                    if (cantidad < 3) {
                        firestore().collection("Productos").doc().set({
                            id: (userid + cantidad).toString(),
                            user: names,
                            phone: phone,
                            userid,
                            name,
                            horario,
                            costo,
                            categoria,
                            img
                        })
                        alert("PRODUCTO GUARDADO")
                        loadData()
                    } else {
                        alert("YA CUENTA CON 3 PRODUCTOS")
                    }
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

        } else {
            alert("FAVOR DE LLENAR TODOS LOS CAMPOS")
        }
    }




    async function loadData() {
        try {
            firestore().collection("Productos").where("userid", "==", user.uid).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        if (!querySnapshot.empty) {
                            const ProductList = []
                            querySnapshot.forEach(doc => {
                                ProductList.push(doc.data())
                            })
                            setProductsList(ProductList)
                        }
                        console.log(doc.id, " => ", doc.data());
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            const docRef = firestore().collection("Users").doc(user.uid).get();
            setnames((await docRef).data().name)
            setPhone((await docRef).data().phone)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        loadData()
    }, [])




    return (

        <SafeAreaView style={styles.View}>

            <View style={styles.TopView}>
                <TouchableHighlight style={{ position: "absolute", zIndex: 2, margin: 10 }}
                    onPress={() => firebase.auth().signOut()}>
                    <Image
                        style={styles.TopBannerExitIcon}
                        source={ExitIcon} />
                </TouchableHighlight>
                <Image
                    style={styles.TopBanner}
                    source={TopBanner}
                />
            </View>


            <View style={styles.ContentView}>
                {/* BUSCADOR */}
                <View>
                    <Text style={{ textAlign: "center", fontSize: 22, fontWeight: 'bold' }}>PRODUCTO</Text>
                </View>
                {/* ----------------plantilla---------------- */}
                <ScrollView>
                    <View>

                        <View style={{ marginVertical: 5 }}>
                            <View style={styles.Card}>
                                {/* <View style={styles.CardImagen}>
                                    <Text style={styles.Label2}>ICONO</Text>
                                    <Text style={styles.emoji}>{newItem.emoji}</Text>

                                </View> */}
                                <View style={styles.CardInfo}>
                                    <Text style={styles.Label}>PRODUCTO</Text>
                                    <View style={styles.input} >
                                        <TextInput placeholder="PRODUCTO" style={styles.inputIn}
                                            onChangeText={text => handleChange(text, "name")} />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <View style={{ marginRight: 5 }}>
                                            <Text style={styles.Label}>HORARIO</Text>
                                            <View style={styles.input} >
                                                <TextInput placeholder="HORARIO" style={styles.inputIn}
                                                    onChangeText={text => handleChange(text, "horario")} />
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 5 }}>
                                            <Text style={styles.Label}>COSTO</Text>
                                            <View style={styles.input} >
                                                <TextInput placeholder="COSTO" style={styles.inputIn} keyboardType="number-pad"
                                                    onChangeText={text => handleChange(text, "costo")} />
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.Label}>CATEGORIA</Text>
                                        <View style={{ borderColor: "#000", borderWidth: 1, width: "100%", height: 40 }}>
                                            <Picker
                                                selectedValue={rol}
                                                onValueChange={(itemValue, itemIndex) =>
                                                (setRol(itemValue),
                                                    handleChange(itemValue, "categoria")
                                                )
                                                }>
                                                <Picker.Item label="POSTRES" value="POSTRES" style={{ fontSize: 14 }} />
                                                <Picker.Item label="BEBIDAS" value="BEBIDAS" style={{ fontSize: 14 }} />
                                                <Picker.Item label="TACOS" value="TACOS" style={{ fontSize: 14 }} />
                                                <Picker.Item label="PIZZA" value="PIZZA" style={{ fontSize: 14 }} />
                                                <Picker.Item label="HAMBURGESAS" value="HAMBURGESAS" style={{ fontSize: 14 }} />
                                                <Picker.Item label="OTROS" value="OTROS" style={{ fontSize: 14 }} />

                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{
                                    marginLeft: 10,
                                    width: "95%",
                                    height: 35,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                    alignSelf: "center"
                                }}  >
                                    <Button title="GUARDAR" color="#1E8942" onPress={Register} />
                                </View>


                            </View>
                        </View>
                        {/* ----------------lista productos--------------------- */}


                        <View>
                            <Text style={{ textAlign: "center", fontSize: 22, fontWeight: 'bold' }}>PRODUCTOS GUARDADOS</Text>
                        </View>

                        <FlatList data={productsList}
                            renderItem={({ item }) =>
                                <View style={{ marginVertical: 3 }}>
                                    <View style={styles.Card}>
                                        {/* <View style={styles.CardImagen}>
                                    <Text style={styles.Label2}>ICONO</Text>
                                    <Text style={styles.emoji}>{newItem.emoji}</Text>

                                </View> */}
                                        <View style={styles.CardInfo}>
                                            <Text style={styles.Label}>PRODUCTO</Text>
                                            <View style={styles.input} >
                                                <TextInput placeholder={item.name} style={styles.inputIn} editable={false} />
                                            </View>
                                            <View style={{ flex: 1, flexDirection: "row" }}>
                                                <View style={{ marginRight: 5 }}>
                                                    <Text style={styles.Label}>HORARIO</Text>
                                                    <View style={styles.input} >
                                                        <TextInput placeholder={item.horario} style={styles.inputIn} editable={false} />
                                                    </View>
                                                </View>
                                                <View style={{ marginLeft: 5 }}>
                                                    <Text style={styles.Label}>COSTO</Text>
                                                    <View style={styles.input} >
                                                        <TextInput placeholder={item.costo} style={styles.inputIn} editable={false} />
                                                    </View>
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={styles.Label}>CATEGORIA</Text>
                                                <View style={{ borderColor: "#000", borderWidth: 1, width: "100%", height: 30 }}>
                                                    <TextInput placeholder={item.categoria} style={styles.inputIn} editable={false} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{
                                            marginLeft: 10,
                                            width: "47.5%",
                                            height: 35,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                            alignSelf: "center"
                                        }} >
                                            <Button title="EDITAR" color="#1e3c89" />
                                        </View>
                                        <View style={styles.buttondelete} >
                                            <Text style={{ color: "#fff", fontSize: 16, textAlign: "center", marginTop: 8 }} >ELIMINAR</Text>
                                        </View>
                                    </View>

                                </View>

                            } keyExtractor={(item, index) => index.toString()} />



                    </View>
                </ScrollView>

                <Text style={{ textAlign: "center" }}>
                    SOLO SE PUEDEN PUBLICAR 3 PRODUCTOS POR VENDEDOR Y EL COSTO TIENE QUE SER MENOR O IGUAL A $500.00
                </Text>

            </View>


            <View style={styles.tabzone}>

                <View style={{ display: "flex", flex: 1, flexDirection: "row" }}>

                    <TouchableOpacity onPress={() => navigation.navigate("Perfil")} style={{ alignSelf: "center" }}>
                        <Image
                            style={styles.Icon}
                            source={PerfilIcon}
                        />
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView >

    )
}

const styles = StyleSheet.create({

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
        flex: 7,
    }, emoji: {
        fontSize: 55,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        marginVertical: 6,
        alignSelf: "center"
    },
    TopBannerExitIcon: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    TopBanner: {
        width: "100%",
        height: 100,
        resizeMode: 'stretch',
    },
    tabzone: {
        height: 75,
        backgroundColor: "#1e8942",
    },
    Icon: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        flex: 1,
        marginLeft: 150,

    },
    Card: {
        width: "95%",
        height: 155,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        shadowColor: "rgba(30, 137, 66, 0.58)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 5,
        borderColor: "rgba(30, 137, 66, 0.58)",
        borderWidth: 1,
        alignSelf: "center",
        display: 'flex',
        flexDirection: "row"
    },
    CardImagen: {
        //backgroundColor: "#000",
        width: "30%",
        height: "85%",
        paddingVertical: 5,
    },
    CardImagenImg: {
        height: "95%",
        width: "90%",
        resizeMode: 'cover',
        alignSelf: "center",
        marginTop: 3,
        borderRadius: 5,
        borderColor: "rgba(0, 0,0, 0.48)",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 15,
    },
    CardImagenImg1: {
        height: "95%",
        width: "90%",
        resizeMode: 'cover',
        alignSelf: "center",
        marginTop: 3,
        borderRadius: 5,
        borderColor: "rgba(0, 0,0, 0.48)",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 15,
    },
    CardInfo: {
        //backgroundColor: "#0F0",
        width: "100%",
        height: "100%",
        padding: 5,
    },
    Label: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    Label2: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: "center"
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
        width: "100%",
        minWidth: "49%",
        borderColor: "rgba(0, 0,0, 0.25)",
        borderWidth: 1,
    },
    inputIn: {
        width: "100%",
        height: 20,
        fontSize: 12
    },
    buttonadd: {
        backgroundColor: "#1E8942",
        marginLeft: 10,
        width: "47.5%",
        height: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttondelete: {
        backgroundColor: "#891e1e",

        width: "47.5%",
        height: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ImgPicker: {
        position: "absolute",
        marginTop: 40,
        width: "25%",
        height: "25%",
        alignSelf: "center",
        backgroundColor: 'rgba(255,255, 255, 0.5)',
        zIndex: 2
    }
});