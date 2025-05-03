export class CredentialInvalid extends Error{
    constructor(){
        super("Email ou senha inválido")
    }
}