import { useEffect, useState } from "react";
import { Linking, ScrollView, Text } from "react-native";
import { Header } from "../../header";
import * as services from "../../../services/contact-services"
import { Button, Card } from "react-native-paper";

export function ConsultaContatos({ navigation }) {

    const [contatos, setContatos] = useState([])

    const consultarContatos = () =>{

        services.getAllContatos()
        .then(
            result =>{
                setContatos(result)
                console.log(result)
            }
        )

        .catch(
            e => {
                console.log(e)
            }
        )

    }
    
    useEffect(
        ()=>{
            consultarContatos();
        }, []
    )

    return (
        <ScrollView>
            <Header navigation={navigation} />
            
            <Card>
                <Card.Title 
                title='Listagem de Contatos'
                subtitle='O que deseja fazer?'/>
            </Card>

            {
                contatos.map(
                    (data, i) => {
                       return(
                        <Card key={i}>
                            <Card.Content>
                                <Text style={{fontWeight:'bold', fontSize: 16}}>{data.nome}</Text>
                                <Text>{data.email}</Text>
                                <Text>{data.telefone}</Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button icon="pencil-outline">Editar</Button>
                                <Button 
                                icon="delete-forever-outline"
                                onPress={()=>{
                                    navigation.navigate('excluir-contato',{
                                        idContato: data.idContato 
                                    })
                                }}
                                >Excluir</Button>
                                <Button 
                                icon="cellphone"
                                onPress={()=>{Linking.openURL(`tel:${data.telefone}`)}}
                                >Ligar</Button>
                            </Card.Actions>
                        </Card>
                        
                       )     
                    }
                )
            }

        </ScrollView>
        )

}
