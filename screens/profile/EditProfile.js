        import React from 'react';
        import {View,StyleSheet,TouchableOpacity,Dimensions,Text}from 'react-native';

        import RegisterInput from '../../components/RegisterInput';
        import {Mutation} from 'react-apollo';

        import Errors from '../../components/Errors';
        import Loading from '../../components/Loading';
        import {EDIT_ACCOUNT} from '../../graphql/mutation';

        let {height,width}=Dimensions.get('window')

        export default class EditProfile extends React.Component{
            constructor(props) {
                super(props);

                    this.state = {
                    name=""
                };
            }



        render(){
            return(
            <View style={styles.container}>

        <Mutation mutation={EDIT_ACCOUNT}>{(editAccount,{loading,data,error})=>(
        <Fragment>

                <RegisterInput 
                placeholder="Edit name "
                onChangeText={(text) => this.setState({text})}
                />


            {loading? <Loading />: <Errors  error={error} /> }
            <TouchableOpacity  style={[styles.buttoncontainer,{width:width}]} onPress={async()=>{
                                      
                                 await editAccount({ 
                                    variables:{
                                    name:this.state.name,
                
                                      }
                                  });
                                    this.props.navigation.navigate('Home'); 

          }}>

          
            <Text style={styles.buttontext}>Change Name</Text>
            </TouchableOpacity>
            </Fragment> )}</Mutation>


            </View>

            );
           }
        }

        
        const styles = StyleSheet.create({
            container : {
            backgroundColor:'#fff',
            justifyContent:'center',
            alignItems:'center',
            paddingLeft:20,
            paddingRight:20
            },
            buttoncontainer:{
                height:50,
                borderRadius:50,
                backgroundColor:'#1abc9c',
                justifyContent:'center',
                alignItems:'center',
                
              
            },
            buttontext:{
        
                textAlign:'center',
                color:'#ecf0f1',
                fontSize:20
            
            }


        })