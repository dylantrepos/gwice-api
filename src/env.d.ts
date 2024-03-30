declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    OPEN_AGENDA_API_KEY: string;
    DATABASE_URL: string;
    PGHOST: string;
    PGDATABASE: string;
    PGUSER: string;
    PGPASSWORD: string;
    ENDPOINT_ID: string;
  }
}
