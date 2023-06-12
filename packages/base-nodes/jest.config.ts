import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ["@web-noise/core/.jest/setupAudio.js"],
}

export default config
