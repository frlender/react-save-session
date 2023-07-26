import {openDB} from 'idb'
import * as _ from 'lodash'


// function get_date_string(d){
//     // keep only minutes
//     return d.toLocaleString().split(':').slice(0,2).join(':')
//   }

export default class DBStore<T>{
    dbName:string
    constructor(dbName:string){
        this.dbName = dbName
    }

    async save(sess_id:string,obj:T){
        const db = await openDB(this.dbName,1,{
            upgrade(db){
                db.createObjectStore('sessions')
            }
        })
        await db.put('sessions',obj,sess_id)
    }

    async get(sess_id:string){
        const db = await openDB(this.dbName,1,{
            upgrade(db){
                db.createObjectStore('sessions')
            }
          })
          const val = await db.get('sessions',sess_id)
          return val as T
    }

    async remove(sess_id:string){
        const db = await openDB(this.dbName,1,{
            upgrade(db){
                db.createObjectStore('sessions')
            }
          })
          db.delete('sessions',sess_id)
          // todo update getlist
    }

    async getList(){
        const db = await openDB(this.dbName,1,{
            upgrade(db){
                db.createObjectStore('sessions')
            }
          })

          const keys = await db.getAllKeys('sessions')
        //   async function get_formatted(sess_id:string){
        //     const val = await db.get('sessions',sess_id)
        //     return {'name': val.sess.name,
        //       'time': get_date_string(val.sess.time),
        //       '_time': val.sess.time,
        //     'key': sess_id}
        //   }
          async function get(sess_id:IDBValidKey){
            const val = await db.get('sessions',sess_id)
            return val as T
          }
          const items = await Promise.all(keys.map(get))
          return items
    }
}