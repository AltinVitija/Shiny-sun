import gql from 'graphql-tag';

export const SIGNUP = gql`
  mutation Signup($email:String!,$password:String!,$confirmPassword:String!,$name: String!){
      signup(email:$email,password:$password,confirmPassword:$confirmPassword,name:$name){
          token
          user{
            id
          }
      }
  }
`;

export const LOGIN = gql`
  mutation Login($email:String!,$password:String!){
      login(email:$email,password:$password){
        payload{
          user{
              id
            }
          token
        }
        error{
          field
          msg
        }
      }
  }
`;

export const EDIT_PASSWORD = gql`
mutation changePassword($password: String!,$newPassword: String!,$confirmPassword: String){
  changePassword(password:$password,newPassword:$newPassword,confirmPassword:$confirmPassword){
      id
    
    
  }
} `

export const EDIT_ACCOUNT = gql `
  mutation editAccount($name: String!){
    editAccount(name:$name){
      id
      name
    }
  }
  `

export const SETPUNISHMENT = gql`
 mutation SetPunishment($ToBePunished:Boolean!,$Date_:String!,$price:Int!){
   SetPunishment(ToBePunished:$ToBePunished,Date_:$Date_,price:$price){
     id,
     ToBePunished,
     Date_,
     price
   }
 }
`