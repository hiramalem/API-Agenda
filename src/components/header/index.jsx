import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";

export function Header ({navigation}){

    const sair = () => {
        console.log('logout');
    }

    return(

        <View>
            <Appbar.Header>
                <Appbar.Content title='Agenda de Contatos' subtitle='Coti Informática'/>
                <Appbar.Action icon="home"
                onPress={()=> navigation.navigate('consulta-contatos')}/>
                <Appbar.Action icon="account-plus"
                onPress={()=> navigation.navigate('cadastro-contatos')}/>
                <Appbar.Action icon="logout"
                onPress={()=> sair ()}/>
            </Appbar.Header>
        </View>




    )


}