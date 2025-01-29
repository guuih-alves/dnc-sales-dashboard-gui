import styled from 'styled-components'
import { TypographiesProps } from '@/types'
import { pxToRem } from '@/utils'

export const StyledH1 = styled.h1<TypographiesProps>`
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) => pxToRem(props.size || 24)};
  font-weight: ${(props) => props.weight || 600};
  leter-spacing: ${pxToRem(-1)};
  line-height: ${(props) => pxToRem(props.weight || 36)};
`

export const StyledH2 = styled.h2<TypographiesProps>`
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) => pxToRem(props.size || 16)};
  font-weight: ${(props) => props.weight || 600};
  line-height: ${(props) => pxToRem(props.weight || 24)};
`

export const StyledH3 = styled.h3<TypographiesProps>`
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) => pxToRem(props.size || 16)};
  font-weight: ${(props) => props.weight || 600};
  line-height: ${(props) => pxToRem(props.weight || 24)};
`

export const Styledp = styled.p<TypographiesProps>`
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) => pxToRem(props.size || 16)};
  font-weight: ${(props) => props.weight || 600};
  line-height: ${(props) => pxToRem(props.weight || 24)};
`

export const StyledSpan = styled.span<TypographiesProps>`
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) => pxToRem(props.size || 16)};
  font-weight: ${(props) => props.weight || 400};
  line-height: ${(props) => pxToRem(props.weight || 24)};
`

export const StyledUl = styled.ul<TypographiesProps>`
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) => pxToRem(props.size || 12)};
  font-weight: ${(props) => props.weight || 400};
  line-height: ${(props) => pxToRem(props.weight || 24)};
  list-styled-position: inside;
  li {
    list-style-position: outside;
    margin-left: ${pxToRem(15)};
  }
`
