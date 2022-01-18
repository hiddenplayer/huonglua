import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as fi from "../firebase";
import * as firebase from "firebase/app";

const AddProduct = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    // const blob = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.onload = function () {
    //     resolve(xhr.response);
    //   };
    //   xhr.onerror = function (e) {
    //     console.log(e);
    //     reject(new TypeError("Network request failed"));
    //   };
    //   xhr.responseType = "blob";
    //   xhr.open("GET", uri, true);
    //   xhr.send(null);
    // });
    // const ref = firebase.storage().ref().child(new Date().toISOString());
    // const ref = firebase.
    // const snapshot = await ref.put(blob);
    // // We're done with the blob, close and release it
    // blob.close();
    // return await snapshot.ref.getDownloadURL();
  }
  return (
    <View>
      <Image source={{ uri: image }} style={{ height: 200, width: "100%" }} />
      <Button title="Pick image" onPress={() => pickImage()} />
      <Button title="Upload" onPress={() => uploadImageAsync(image)} />
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
