import { ScrollView, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

export function Password({navigation}) {

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>

            <Card>

                <Card.Cover
                    source={require('../../../images/bg-home.jpg')}
                />

                <Card.Title
                    title="Recuperar senha"
                    subtitle="Informe seu e-mail cadastrado"
                />

                <Card.Content>
                    <View>
                        <TextInput style={{ marginBottom: 10 }}
                            label="E-mail de acesso"
                            mode="outlined"
                            placeholder="Ex: joao@gmail.com"
                            keyboardType="email-address"
                        />
                    </View>

                    <View>
                        <Button mode="contained" 
                            style={{ marginBottom: 10 }}>
                            Recuperar senha
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

        </ScrollView>
    )

}