import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

                            //para encapsular a lógica de requisições HTTP usando Axio//

const axiosInstance = axios.create({
baseURL: `${import.meta.env.VITE_API_BASE_URL}/`
 });


                        //vamos implementar a função que realizará a requisição POST:
 export const usePost = <T, P>(endpoint: string) => {               // tipagem ajuda especificar tipos de variaveis (T dados de resposta, P dados a ser enviados )
             const [data, setData] = useState<T | null>(null);     // data vai enviar os dados de resposta do post
             const [loading, setLoading] = useState<boolean>(false);
            const [error, setError] = useState<number | null>(null);

    const postData = async (postData: P, config?: AxiosRequestConfig) => {
        setData(null);
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance({
            url: endpoint,
            method: 'POST',
            data: postData,
            headers: {
            'Content-Type':'application/json',
            ...config?.headers
            },
            ...config
            });
            
            setData(response.data);
            } catch (e: any) {
            setError(e.response?.status || 500);
            } finally {
            setLoading(false);
            }
            };
            
            return { data, loading, error, postData };
}