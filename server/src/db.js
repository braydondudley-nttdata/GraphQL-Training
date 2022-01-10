import { Pool } from 'pg';
import humps from 'humps';

const pool = new Pool({
  host: 'localhost',
  database: 'hackerbook',
});

function logQuery (sql, params) {
  console.log('BEGIN-------------------------------------');
  console.log('SQL:', sql);
  console.log('PARAMS:', JSON.stringify(params));
  console.log('END---------------------------------------');
};

async function query(sql, params) {
  
  console.log("query ----1");
  const client = await pool.connect();
  console.log("query ----2");
  logQuery(sql, params);
  try {
    const result = await client.query(sql, params);
    const rows = humps.camelizeKeys(result.rows);
    return { ...result, rows };
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

export default query;