import '@testing-library/jest-dom'
import 'jest-styled-components'

import { TextEncoder } from 'node:util'

global.TextEncoder = TextEncoder
