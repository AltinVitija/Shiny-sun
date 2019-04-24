import React ,{Component,Fragment}from 'react';
import {
    Text,
    TextInput,
    Button,
    View,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import { Mutation } from 'react-apollo';
import { LOGIN } from '../graphql/mutation';

import Errors from '../components/Errors';

export default class SigninScreen  extends Component{
    
    state ={
     email:'',
     password:''
    };

    render(){
        return(<View style={styles.container}>
                <View style={styles.textfields}>

                  <TextInput style={styles.input}
                        placeholder="Email"
                        returnKeyType="next"
                        onSubmitEditing={()=>this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalze="none"
                        autoCorrect={false}
                        value={this.state.email}
                        onChangeText={email=>this.setState({email})}    
                   />

                 <TextInput style={styles.input}
                        placeholder="Password"
                        returnKeyType="go"
                        secureTextEntry
                        ref={(input)=> this.passwordInput=input}
                        value={this.state.password}
                        onChangeText={password=>this.setState({password})}
                  />

                  <Mutation mutation={LOGIN}>{(logIn,{loading,data,error})=>(
                      <Fragment>
                        <Errors errors={error} />
                        <TouchableOpacity style={styles.buttoncontainer} onPress={async()=>{
                               let { data }= await login({
                                    variables:{
                                            email:this.state.email,
                                            password:this.state.password
                                    }
                                });
                                let token = data.login.token;
                                await AsyncStorage.setItem('@toka-dhe-dielli:token',token);
                                this.props.navigation.navigate('Home');
                        }}>
                               <Text style={styles.buttontext}>
                                  Login
                               </Text>
                        </TouchableOpacity>
                     </Fragment>
                  )}</Mutation>
           
                <Button 
                    title="Register Here"
                    color="#1abc9c"
                    onPress={()=>this.props.navigation.navigate('Signup')}
                />
            </View>
        </View>);
    }
}


const styles = StyleSheet.create({
    container:{
        padding:30,
        flex:4,
        justifyContent:'center',
        alignItems:'center',
    },
    input:{
        
        width: 200,
        paddingLeft:20,
        borderRadius:60,
        height:50,
        fontSize:25,
        backgroundColor:'white',
        borderWidth:1,
        marginBottom:30,
        color:'#34495e'
        
    },
    buttoncontainer:{
        height:50,
        borderRadius:50,
        backgroundColor:'#1abc9c',
        justifyContent:'center'
      
    },
    buttontext:{

        textAlign:'center',
        color:'#ecf0f1',
        fontSize:20
    
    }
});
