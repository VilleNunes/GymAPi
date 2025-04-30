
export class EmailExist extends Error{
    constructor(){
        super("Já existe um usuario com esse email cadastrado")
    }
}