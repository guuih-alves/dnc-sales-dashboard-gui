import styled from 'styled-components'
import { InputProps } from '@/types'
import { pxToRem } from '@/utils'

/* pxtoRem : faz  aconversao de PX para REM */

export const StyledInput = styled.input<InputProps>`
background-color: ${(props) => props.theme.textInput.active};
color: ${(props) => props.theme.textInput.activeColor};
border: ${pxToRem(1)} solid ${(props) => props.theme.textInput.borderColor};
border-radius: ${pxToRem(8)};
cursor: pointer;
height: ${pxToRem(40)};
font-size: ${pxToRem(14)};
font-weight: 500;
padding: ${pxToRem(8)} ${pxToRem(16)};
transition: background-color 0.3s;
width: 100%



$:disable{
background-color: ${(props) => props.theme.textInput.disable};
border: ${pxToRem(1)} solid ${(props) => props.theme.textInput.disableBorderColor };
color: ${(props) => props.theme.textInput.disableColor};
cursor: not-allowed;
}

 &::placeholder{
 color: ${(props) => props.theme.textInput.placeHolderColor};
  }

`