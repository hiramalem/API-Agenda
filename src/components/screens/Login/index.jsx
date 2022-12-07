import { ScrollView, View } from "react-native";
import { Button, Card, TextInput, HelperText } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import * as services from '../../../services/login-services';


export function Login({ navigation }) {

    const onSubmit = (data) => {
        services.postLogin(data)
        .then(
            result => {
               reset(
                {
                email: '', 
                senha:''
                }
            )
            
            //navigation.navigate('')
            
        }
        )
        .catch(
            e=>{
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
                    title="Acessar Conta"
                    subtitle="Informe seus dados"
                />

                <Card.Content>

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
                        <Button mode="contained" style={{ marginBottom: 10 }}
                            onPress={handleSubmit(onSubmit)}
                        >
                            Acessar conta
                        </Button>

                        <Button
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                            onPress={() => navigation.navigate('register')}>
                            Crie sua conta
                        </Button>

                        <Button
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                            onPress={() => navigation.navigate('password')}>
                            Esqueci minha senha
                        </Button>
                    </View>

                </Card.Content>

            </Card>

        </ScrollView>
    )

}