
interface SaveSessionProps<T>{
    dbName: string,
    getData: ()=>T
    download?: boolean | (()=>void)
    sessName?: string,
    uid?:string,
    editTextWidth?: number
    editTextHeight?: number
    gc?: number
    setGc?: (x:React.SetStateAction<number>)=>void
    buttonClass?: string
    editTextStyle?: {}
}

interface SessRecord<T>{
    uid: string,
    time: Date,
    sessName: string,
    data: T
}

interface ListSessionsProps<T>{
    dbName: string,
    enter: (x:SessRecord<T>)=>void,
    format?: (sessions:SessRecord<T>[],
                remove:(x:string)=>void,
                enter:(x:SessRecord<T>)=>void
            )=>JSX.Element[],
    gc?: number
}


export type {SaveSessionProps, ListSessionsProps, SessRecord}