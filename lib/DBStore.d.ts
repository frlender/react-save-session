export default class DBStore<T> {
    dbName: string;
    constructor(dbName: string);
    save(sess_id: string, obj: T): Promise<void>;
    get(sess_id: string): Promise<T>;
    remove(sess_id: string): Promise<void>;
    getList(): Promise<Awaited<T>[]>;
}
