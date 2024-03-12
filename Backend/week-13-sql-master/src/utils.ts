import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgres://gstwldag:yi0SAlsKVsOxyq_Go4OUNBVY55zh3L_F@john.db.elephantsql.com/gstwldag");
    await client.connect();
    return client;
}