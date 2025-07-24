# OKReator

OKReator is built with [Next.js](https://nextjs.org/).

## Development

The recommended database is [DBSlicer](https://dbslicer.app.tc1.airbase.sg/slices), an experimental project by Airbase. However, any postgres database will work.

Create a `.env` file to store database credentials:

```
PGHOST=<Name of host to connect to>
PGPORT=<Port number to connect to at the server host>
PGUSER=<PostgreSQL user name to connect as>
PGPASSWORD=<Password to be used if the server demands password authentication>
PGDATABASE=<The database name>
```

Connect to the database and run `init_db.sql`:

```bash
export $(cat .env | xargs)
psql -f init_db.sql
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the file.

## Deploying on Airbase

If using GitLab CI / CD Integration, save set environment variables as CI / CD variables.

Read the [Airbase documentation](https://go.gov.sg/airbase) for more details.
# ai-first
