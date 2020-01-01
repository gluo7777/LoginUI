# Load Data into Multiple Tables

1. Single CSV with data for all columns A...Z
2. Load A...Z into single temporary table
3. Select...Join...Insert... into respective tables

# Running Postgres via Docker

```bash
docker build -t postgres:11.5 . \
&& docker run --name postgres -p 5432:5432 -d postgres:11.5
```