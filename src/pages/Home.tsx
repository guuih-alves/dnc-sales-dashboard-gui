import {
  AvatarList,
  Header,
  CustomTable,
  CardComponent,
  StyledH2,
  StyledH3,
  StyledSpan,
} from '@/components'
import { Container, Grid } from '@mui/material'
import { currencyConverter, highlightTextConverter } from '@/utils'
import CustomChart from '@/components/CustomChart'

import { Link } from 'react-router-dom'

//Hooks
import { useGet } from '@/hooks'

//Types
import { HighlightsData, StartsData, NewsData, CustomChartProps } from '@/types'

function Home() {
  const {
    data: highlightsData,
    loading: highlightsLoading,
    error: highlightsError,
  } = useGet<HighlightsData[]>('sales/highlights')

  const {
    data: salesMonthData,
    loading: salesMonthLoading,
    error: salesMonthError,
  } = useGet<CustomChartProps>('sales/month')

  const {
    data: salesStarData,
    loading: salesStartLoading,
    error: salesStarError,
  } = useGet<StartsData[]>('sales/stars')

  const {
    data: newsData,
    loading: newsLoading,
    error: NewsError,
  } = useGet<NewsData[]>('news')

  const {
    data: salesYearsData,
    loading: salesYearsLoading,
    error: salesYearsError,
  } = useGet<CustomChartProps>('sales/year')

  return (
    <>
      <Header />
      <Container maxWidth="lg" className="mb-2">
        <Grid container spacing={4}>
          {!highlightsError && (
            <>
              <Grid item xs={12} md={4}>
                <CardComponent
                  id="total-sales"
                  className={
                    highlightsLoading
                      ? 'skeleton-loading skeleton-loading-mh-1'
                      : ''
                  }
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <StyledH2 className="mb-1">
                        {' '}
                        Total de vendas no mes
                      </StyledH2>
                      <StyledH3 className="mb-1" size={40} lineHeight={40}>
                        {currencyConverter(highlightsData[0].value)}
                      </StyledH3>
                      <StyledSpan>{highlightsData[0].subtitle}</StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>

              <Grid item xs={12} md={4}>
                <CardComponent
                  id="month-goals"
                  className={
                    highlightsData
                      ? highlightsData[1].subtitle
                      : 'skeleton-loading skeleton-loading-mh-1'
                  }
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <StyledH2 className="mb-1"> Meta do mes</StyledH2>
                      <StyledH3 className="mb-1" size={40} lineHeight={40}>
                        {currencyConverter(highlightsData[1].value)}
                      </StyledH3>
                      <StyledSpan>
                        {highlightTextConverter(highlightsData[1].subtitle)}
                      </StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>

              <Grid item xs={12} md={4}>
                <CardComponent
                  id="total-leads"
                  className={
                    highlightsLoading
                      ? 'skeleton-loading skeleton-loading-mh-1'
                      : ''
                  }
                >
                  {!highlightsLoading && highlightsData && (
                    <Link to="/leads">
                      <StyledH2 className="mb-1"> Leads contactados</StyledH2>
                      <StyledH3 className="mb-1" size={40} lineHeight={40}>
                        {highlightsData[2].value}
                      </StyledH3>
                      <StyledSpan>{highlightsData[2].subtitle}</StyledSpan>
                    </Link>
                  )}
                </CardComponent>
              </Grid>
            </>
          )}

          <Grid item xs={12} md={7}>
            {!salesMonthError && (
              <CardComponent
                id="month-sales-chart"
                className={
                  salesMonthLoading
                    ? 'skeleton-loading skeleton-loading-mh-2'
                    : ''
                }
              >
                {!salesMonthLoading && salesMonthData && (
                  <>
                    <StyledH2 className="mb-1">
                      {' '}
                      Valor de vendas no mes
                    </StyledH2>
                    <CustomChart
                      labels={salesMonthData.labels.map((label) => label)}
                      data={salesMonthData.data.map((data) => data)}
                      type={salesMonthData.type}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            {!salesStarError && (
              <CardComponent
                id="sales-stars"
                className={
                  salesMonthLoading
                    ? 'skeleton-loading skeleton-loading-mh-2'
                    : ''
                }
              >
                {!salesStartLoading && salesStarData && (
                  <>
                    <StyledH2 className="mb-1">
                      {' '}
                      Maiores vendedores no mes
                    </StyledH2>
                    <AvatarList
                      listData={salesStarData.map((star) => ({
                        avatar: '/avatar.jpg',
                        name: star.name,
                        subtitle: currencyConverter(star.value),
                      }))}
                    ></AvatarList>
                  </>
                )}
              </CardComponent>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            {!NewsError && (
              <CardComponent
                id="news"
                className={
                  newsLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''
                }
              >
                {!newsLoading && newsData && (
                  <>
                    <StyledH2 className="mb-1"> Noticias relevantes</StyledH2>
                    <CustomTable
                      headers={['Titulo', 'Horario']}
                      rows={newsData.map((news) => [
                        <a
                          className="ellipsis ellipsis-sm"
                          href={news.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                          {news.title}
                        </a>,
                        <a href={news.link} target="_blank" rel="noreferrer">
                          {news.date}
                        </a>,
                      ])}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>

          <Grid item xs={12} md={7}>
            {!salesYearsError && (
              <CardComponent
                id="years-sales-chart"
                className={
                  salesYearsLoading
                    ? 'skeleton-loading skeleton-loading-mh-2'
                    : ''
                }
              >
                {!salesYearsLoading && salesYearsData && (
                  <>
                    <StyledH2 className="mb-1">
                      {' '}
                      Valor de vendas por mes
                    </StyledH2>
                    <CustomChart
                      labels={salesYearsData.labels.map((label) => label)}
                      data={salesYearsData.data.map((data) => data)}
                      type={salesYearsData.type}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home

//listData={mockListData}  Renderizamos o componente://
