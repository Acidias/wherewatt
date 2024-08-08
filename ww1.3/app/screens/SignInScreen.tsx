import { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

function SignInScreen() {
     const { user, signIn, signOut, signUp } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const handleLogin = async () => {
        signIn(username, password);
     };


    return (
        <View style={styles.container}>
                   <Text style={styles.title}>Customer App</Text>

            <TextInput 
                placeholder="Username" 
                value={username} 
                onChangeText={setUsername} 
                style={styles.input}
            />
            <TextInput 
                placeholder="Password" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
     fontSize: 24,
     fontWeight: 'bold',
     textAlign: 'center',
     marginBottom: 20,
 },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 12,
        borderRadius: 4,
    },
});

export default SignInScreen;
