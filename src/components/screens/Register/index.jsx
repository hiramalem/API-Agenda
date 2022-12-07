import { Controller, useForm } from "react-hook-form";
import {Alert, ScrollView, View } from "react-native";
import { Button, Card, HelperText, TextInput } from "react-native-paper";
import * as services from '../../../services/register-services';


export function Register({ navigation }) {

    const onSubmit = (data) => {

        services.postRegister(data)
        .then(
            result => {
                Alert.alert('Sucesso', `Parabéns ${result.nome}, sua conta foi criada`)

                reset({
                    nome:'',
                    email:'',
                    senha:'',
                    confirmaSenha:''
                })
            }
        )
        .catch(
            e => {
                Alert.alert('Erro', e.response.data.message)
            }
        )

    }


    const {
        control,
        reset,
        watch,
        getValues,
        handleSubmit,
        formState: { errors },
    }
        = useForm()

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>

            <Card>

                <Card.Cover
                    source={require('../../../images/bg-home.jpg')}
                />

                <Card.Title
                    title="Crie sua conta"
                    subtitle="Informe seus dados"
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
                                    label="E-mail de acesso"
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
                            name="senha"
                            rules={{
                                required: 'Por favor, preencha este campo',
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                                    message: 'Informe pelo menos 6 caracteres sendo 1 maiúscula e 1 número'
                                }
                            }}

                            render={({ field: { onChange, onBlur, onValue } }) => (

                                <TextInput style={{ marginBottom: 10 }}
                                    label="Senha de acesso"
                                    mode="outlined"
                                    placeholder="Sua senha cadastrada"
                                    keyboardType="default"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={onValue}
                                />)}
                        />
                        {
                            errors.senha && <HelperText type="error">
                                {errors.senha.message}
                            </HelperText>
                        }

                    </View>


                    <View>
                        <Controller
                            control={control}
                            name="confirmaSenha"
                            rules={{
                                required: 'Por favor, preencha este campo'
                            }}

                            render={({ field: { onChange, onBlur, onValue } }) => (

                                <TextInput style={{ marginBottom: 10 }}
                                    label="Confirmar senha"
                                    mode="outlined"
                                    placeholder="Sua senha cadastrada"
                                    keyboardType="default"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={onValue}
                                />)}
                        />

                        {
                            watch('senha') !== watch('confirmaSenha') && getValues('confirmaSenha') ?
                            <HelperText type="error">
                             Senhas não conferem
                            </HelperText> : null
                        }


                    {
                        errors.confirmaSenha && <HelperText type="error">
                            {errors.confirmaSenha.message}
                        </HelperText>
                    }

                </View>


                <View>
                    <Button
                        mode="contained"
                        style={{ marginBottom: 10 }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Realizar Cadastro
                    </Button>

                    <Button
                        mode="outlined"
                        style={{ marginBottom: 10 }}
                        onPress={() => navigation.navigate('login')}>
                        Voltar para Login
                    </Button>
                </View>

            </Card.Content>

        </Card>

        </ScrollView >
    )

}