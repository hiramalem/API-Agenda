import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import * as services from "../../../services/contact-services"
import { Header } from "../../header";

export function ExcluirContato({ navigation, route }) {


    const { idContato } = route.params;
    const [contato, setContato] = useState({})

    services.getContatoById(idContato)
        .then(
            result => {
                setContato(result)
            }
        )
        .catch(
            e => {
                console.log(e);
            }
        )

    const deleteContato = () =>{
        services.deleteContato(contato.idContato)
        .then(
            result=>{
                Alert.alert('Sucesso', `O contato ${result.nome} foi excluído com sucesso!`);
                navigation.navigate('consulta-contatos')
            }
        )
        .catch(
            e => {
                console.log(e);
                Alert.alert('Erro', 'Ocorreu um erro. Tente novamente.')
            }
        )

    }

    return (
        <>
            <Header navigation={navigation} />
            <Card>
                <Card.Title
                    title='Confirmação de Exclusão'
                    subtitle={`Deseja realmente excluir ${contato.nome}?`}
                />

                <Card.Content>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{contato.nome}</Text>
                    <Text>{contato.email}</Text>
                    <Text>{contato.telefone}</Text>

                    <View style={{ marginTop: 30 }}>
                        <Button 
                        mode="contained"
                        onPress={() => deleteContato()}
                        >Confirmar Exclusão</Button>
                        <Button
                            mode="outlines"
                            onPress={() => { navigation.navigate('consulta-contatos') }}
                        >Cancelar Exclusão</Button>
                    </View>
                </Card.Content>
            </Card>
        </>

    )

}