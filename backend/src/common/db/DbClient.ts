import knex, {Knex} from "knex";

export class DbClient {
    querier: Knex;
    static querierInstance: Knex;
    constructor(dbURI: string, dbType: string = 'pg') {
        this.querier = knex({
            client: dbType,
            connection: dbURI,
        })
        DbClient.querierInstance = this.querier;
    }
}