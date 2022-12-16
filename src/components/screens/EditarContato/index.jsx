import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, View } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { Header } from "../../header";
import * as services from "../../../services/contact-services";
import { useState } from "react";

export function EditarContato({ navigation, route }) {

    const { idContato } = route.params;
    const [contato, setContato] = useState({})

    services.getContatoById(idContato)
        .then(
            result => {
                setContato(result)

                reset({
                    idContato: result.idContato,
                    nome: result.nome,
                    email: result.email,
                    telefone: result.telefone
                })
            }
        )
        .catch(
            e => {
                console.log(e);
            }
        )

    const {
        control,
        reset,       
        handleSubmit,
        formState: { errors },
    }
        = useForm()
        
    const onSubmit = (data) => {
        
        services.putContact(data)
        .then(

            result => {
                Alert.alert ('Sucesso', `O contato ${result.nome} foi atualizado.`)
                navigation.navigate('consulta-contatos')
            }



        )
        .catch(

            e=>{
                console.log(e);
                Alert.alert('Erro!', 'Não foi possível realizar a alteração')                
            }

        )

    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <Header navigation={navigation} />

            <Card>
                <Card.Title
                    title='Atualização de Contatos'                    
                />

                <Card.Content>
                    <View style={{ marginBottom: 10 }}>

                        <Controller
                            control={control}
                            name="nome"
                            rules={{
                                required: 'Por favor, preencha este campo',
                                minLength: {
                                    value: 3,
                                    message: 'Informe pelo menos 3 caracteres'
                                }
                            }}

                            render={({ field: { onChange, onBlur, onValue } }) => (

                                <TextInput
                                    label="Informe seu nome"
                                    mode="outlined"
                                    placeholder="Ex: João da Silva"
                                    keyboardType="default"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={onValue}
                                />)}
                        />

                        {
                            errors.nome && <HelperText type="error">
                                {errors.nome.message}
                            </HelperText>
                        }
                    </View>

                    <View style={{ marginBottom: 10 }}>

                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: 'Por favor, preencha este campo',
                                pattern: {
                                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                                    message: 'Informe um endereço de email válido'
                                }
                            }}

                            render={({ field: { onChange, onBlur, onValue } }) => (

                                <TextInput
                                    label="E-mail"
                                    mode="outlined"
                                    placeholder="Ex: joao@gmail.com"
                                    keyboardType="email-address"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={onValue}
                                />)}
                        />

                        {
                            errors.email && <HelperText type="error">
                                {errors.email.message}
                            </HelperText>
                        }

                    </View>


                    <View>
                        <Controller
                            control={control}
                            name="telefone"
                            rules={{
                                required: 'Por favor, preencha este campo',
                            }}

                            render={({ field: { onChange, onBlur, onValue } }) => (

                                <TextInput style={{ marginBottom: 10 }}
                                    label="21999999999"
                                    mode="outlined"
                                    placeholder="Seu telefone cadastrado"
                                    keyboardType="phone-pad"                                 
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={onValue}
                                />)}
                        />
                        {
                            errors.telefone && <HelperText type="error">
                                {errors.telefone.message}
                            </HelperText>
                        }

                    </View>
                    <View>
                        <Button mode="contained"
                        onPress={handleSubmit(onSubmit)}>
                            Atualizar Contato
                        </Button>
                    </View>


                </Card.Content>

            </Card>

        </ScrollView>

    )

}
