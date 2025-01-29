import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CreateProfileData } from '@/types'

const initialState: Omit<CreateProfileData, 'name' | 'phone' | 'password'> = {
  email: '',
  message: null,
}

//Utilizamos Omit para excluir campos que não queremos armazenar no Redux
//Criamos dois reducers: setProfileData para salvar o e-mail e setMessage para armazenar mensagens de sucesso ou erro.

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (
      state,
      action: PayloadAction<
        Omit<CreateProfileData, 'name' | 'phone' | 'password'>
      >
    ) => {
      state.email = action.payload.email
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
  },
})

export const { setProfileData, setMessage } = profileSlice.actions
export default profileSlice.reducer
