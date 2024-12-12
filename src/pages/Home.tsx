import { AvatarList,  Header, CardComponent } from '@/components'
import { Container } from '@mui/material'
import { currencyConverter } from '@/utils'

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

    return (
      <>
         <Header />
         <Container maxWidth="lg">
          <CardComponent>Card</CardComponent>
          <CardComponent>
            <AvatarList listData={mockListData}></AvatarList>
          </CardComponent>
         </Container>
      </>
    )
  }

  export default Home