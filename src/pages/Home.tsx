import { AvatarList,  Header, CustomTable, CardComponent } from '@/components'
import { Container } from '@mui/material'
import { currencyConverter } from '@/utils'
import CustomChart from '@/components/CustomChart'

function Home() {
  const mockListData = [
    {
      avatar: '/avatar.jpg',
      name: 'Nome Sobrenome 1',
      subtitle: currencyConverter(1234.54)
    },

    {
      avatar: '/avatar.jpg',
      name: 'Nome Sobrenome 2',
      subtitle: currencyConverter(3334.14)
    },

    {
      avatar: '/avatar.jpg',
      name: 'Nome Sobrenome 3',
      subtitle: currencyConverter(2264.74)
    },
  ]

    const mockTableData = {
      headers: ['Name', 'Email', 'Actions'],
      rows: [
        [
          <span>Nome 1</span>,
          <span>nome1@email.com</span>,
          <button>Action</button>,
        ],

        [
          <span>Nome 2</span>,
          <span>nome2@email.com</span>,
          <button>Action</button>,
        ],

        [
          <span>Nome 3</span>,
          <span>nome3@email.com</span>,
          <button>Action</button>,
        ],
      ],
    }
    return (
      <>
         <Header />
         <Container maxWidth="lg">
          <CardComponent>Card</CardComponent>
          <CardComponent>
            <AvatarList listData={mockListData}></AvatarList>        
          </CardComponent>
          <CardComponent>
            <CustomTable headers={mockTableData.headers} rows={mockTableData.rows} />       
          </CardComponent>
          <CardComponent>
            <CustomChart labels={['Jan', 'Fev', 'Mar', 'Abr']} data={[1000.12, 2456.54, 986.32, 654.89 , 754.89]} type='bar' />
          </CardComponent>
         </Container>
      </>
    )
  }

  export default Home



  //listData={mockListData}  Renderizamos o componente:// 