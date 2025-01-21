

export default {
    testEnvironment: 'jsdom',
    transform: {
    '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transform-svg',
    '^@/(.*)$': '<rootDir>/src/$1'
    },

    globals: { TextEncoder: TextEncoder, TextDecoder: TextDecoder },

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    }

