import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, View } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { Header } from "../../header";
import * as services from "../../../services/contact-services";

export function CadastroContatos({ navigation }) {

    const {
        control,
        reset,       
        handleSubmit,
        formState: { errors },
    }
        = useForm()
        
    const onSubmit = (data) => {
        
        services.postContact(data)
        .then(

            result => {
                Alert.alert ('Sucesso', `O contato ${result.nome} foi cadastrado.`)

                reset({
                    nome: '',
                    email: '',
                    telefone: ''
    
                })
            }



        )
        .catch(

            e=>{
                console.log(e);
                Alert.alert('Erro!', 'Não foi possível realizar o cadastro')
            }

        )

    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <Header navigation={navigation} />

            <Card>
                <Card.Title
                    title='Cadastro de Contatos'
                    subtitle='Inclua um contato na sua agenda'
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
                            Realizar Cadastro 
                        </Button>
                    </View>


                </Card.Content>

            </Card>

        </ScrollView>

    )

}
