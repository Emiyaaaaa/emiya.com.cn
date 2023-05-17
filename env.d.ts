declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      DATABASE_URL: string
      COS_SECRET_KEY: string
      COS_SECRET_ID: string
    }
  }
}

export {}
