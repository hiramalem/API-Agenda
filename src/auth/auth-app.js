import AsyncStorage from "@react-native-async-storage/async-storage";


export const signIn = async (data) => {
    try{
        const content = JSON.stringify(data);
        await AsyncStorage.setItem('USER_DATA', content)
    }
    catch(e) {
        console.log(e)
    }
}

export const signOut = async () => {
    try{
        await AsyncStorage.removeItem('USER_DATA')
    }
    catch(e) {
        console.log(e)
    }
}

export const getData = async () => {

    const content = JSON.stringify(data);

    try{
        return await AsyncStorage.setItem('USER_DATA')
    }

    catch (e) {
        console.log(e)
    }
}
