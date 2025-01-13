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
                const password = String(value)
                const hasCorrectLength = password.length >= 8 && password.length <= 16;
                const hasUppercaseLetter = /[A-Z]/.test(password);
                const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                const hasNumber = /\d/.test(password);
                return (
                    hasCorrectLength && hasUppercaseLetter && hasSpecialCharacter && hasNumber
                )
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