import { useState, useEffect } from "react";
import { InputProps } from "@/types";

//responsável por validar os campos do formulário//

//formValues: Armazena os valores dos inputs//
//formValid: Indica se o formulário está válido ou não//


export const useFormValidation = (inputs: InputProps[]) => {
    const [formValues, setFormValues] = useState(inputs.map((input) => input.value || ''))
    const [formValid, setFormValid] = useState(false)
   

    useEffect(() =>{
        const allFieldsValid = inputs.every((input, index) => {    //campos para validação de email e senha
            const value = formValues[index]
            if(input.required && !value){
                return false
            }

            if (input.type === 'email'){
                return /\S+@\S+\.\S+/.test(String(formValues[index]))
            }
            if (input.type === 'password'){
                return String(formValues[index]).length > 7
            }
            return true
        })
        setFormValid(allFieldsValid)    //Setar o valor que esta vindo de Allfields Value... //
    }, [formValues, inputs])     // Chamado para apenas rodar quando tiver algum valor


    //handleChange é responsável por atualizar os valores dos campos://
    const handleChange = (index: number, value: string) => {
        setFormValues((prevValues) => {
        const newValues = [...prevValues]
        newValues[index] = value
        return newValues
    })

}

    return { formValues, formValid, handleChange}
}