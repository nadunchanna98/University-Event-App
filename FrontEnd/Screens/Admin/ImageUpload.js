import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ImageUpload = () => {
    const [photo, setPhoto] = React.useState(null);
    const [photoShow, setPhotoShow] = React.useState(null);

    const takePhotoAndUpload = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        let localUri = result.uri;
        setPhotoShow(localUri);
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('photo', { uri: localUri, name: filename, type });

        await axios.post('http://localhost/api/file-upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(res => {
            setPhoto(res.data.photo.photo);
        }).catch(err => {
            console.log(err.response);
        });
    }

    const dicardImage = () => {
        setPhotoShow(null);
    }

    return (
        <View style={styles.mainBody}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>React Native Image Upload Axios</Text>
            </View>

            {photoShow &&
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: photoShow }}
                        style={{ width: '100%', height: 350 }}
                    />
                </View>
            }

            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={takePhotoAndUpload}
            >
                <Text style={styles.buttonTextStyle}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={dicardImage}
            >
                <Text style={styles.buttonTextStyle}>Discard Image</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    },
    imageContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        borderWidth:1,
        borderColor:'#d9d6d6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    titleContainer: {
        alignItems:'center',
        marginBottom:30,
    },
    title: {
        fontSize:23,
        fontWeight:'bold',
    },
});

export default ImageUpload;