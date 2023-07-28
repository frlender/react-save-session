
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
    editTextStyle?: {},
    format?: (download:()=>void,
            save:()=>void,
            sessName: string,
            setSessName:(x:React.SetStateAction<string>)=>void,
            buttonClass: string,
            editTextStyle: {})=>JSX.Element[],
}

interface SessRecord<T>{
    uid: string,
    time: Date,
    sessName: string,
    data: T,
}

interface ListSessionsProps<T>{
    dbName: string,
    enter: (x:SessRecord<T>)=>void,
    gc?: number,
    format?: (sessions:SessRecord<T>[],
                remove:(x:string)=>void,
                enter:(x:SessRecord<T>)=>void
            )=>JSX.Element[],
}


export type {SaveSessionProps, ListSessionsProps, SessRecord}