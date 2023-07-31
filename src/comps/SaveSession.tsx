import { SaveSessionProps, ListSessionsProps, SessRecord} from "./Interfaces";
import DBStore from "./DBStore";
import { v4 as uuidv4 } from 'uuid';
import { EditText, EditTextProps, onSaveProps } from 'react-edit-text'
import { useState, useEffect, ChangeEvent, useRef, FormEvent } from 'react'
import 'react-edit-text/dist/index.css';
import * as _ from 'lodash'

function SaveSession<T>(props:SaveSessionProps<T>){
    const db = new DBStore<SessRecord<T>>(props.dbName)
    const uid = useRef(props.uid ? props.uid : uuidv4())
    const [sessName, setSessName] = useState(props.sessName ? props.sessName:'Session')
    const editTextStyle = props.editTextStyle? props.editTextStyle : {}
    const buttonClass = props.buttonClass? props.buttonClass : ''
    const format = props.format? props.format: defaultSaveSessFormat
    const [saved, setSaved] = useState(false)
    const notificationDelay = props.notificationDelay ? props.notificationDelay : 800
    const notification = props.notification ? true : false

    const getRecord = ()=>{
        const time = new Date()
        return {
            uid:uid.current,
            time: time,
            sessName: sessName,
            data: props.getData()
        }
    }
    
    const save = ()=>{
        db.save(uid.current,getRecord()).then(()=>{
            setSaved(true)
            setTimeout(()=>setSaved(false),notificationDelay)
        })
    }

    const defaultDownload = (record:SessRecord<T>)=>{
        const strx = JSON.stringify(getRecord())
        const blob = new Blob([strx]);
        let element = document.createElement("a");
        element.download = `${sessName}.json`;
        element.href = window.URL.createObjectURL(blob);
        element.click();
        element.remove();
    }

    let download:((record:SessRecord<T>)=>void) | undefined = undefined
    if(props.download){
        if(_.isBoolean(props.download))
            download = defaultDownload
        else
            download = props.download as ()=>void
    }
    
    // console.log(download)
    return format<T>(getRecord,download!,save,saved,notification,sessName,setSessName,buttonClass,editTextStyle)
}

function defaultSaveSessFormat<T>(
    getRecord: ()=>SessRecord<T>,
    download:(x:SessRecord<T>)=>void,
    save:()=>void,
    notification: boolean,
    saved:boolean,
    sessName:string,
    setSessName:(x:React.SetStateAction<string>)=>void,
    buttonClass: string,
    editTextStyle: {}){

    return <span className="rss-save-session">
    {download && <button className={buttonClass} onClick={()=>download!(getRecord())}>Download</button>}
        <button className={buttonClass} onClick={()=>save()}>Save</button>
        <EditText  style={editTextStyle} defaultValue={sessName} 
            inline={true} onSave={(e:any)=>setSessName(e.value as string)}></EditText>
        {/* <span className="rss-save-session-saved">Saved!</span> */}
        {notification && saved && <span className="rss-save-session-saved">Saved!</span>}
    </span>
}

function ListSessions<T>(props:ListSessionsProps<T>){
    const db = new DBStore<SessRecord<T>>(props.dbName)
    const [sessions, setSessions] = useState<SessRecord<T>[]>([])
    const [removeCount,setRemoveCount] = useState(0)
    const format = props.format? props.format: defaultSessFormat

    const remove = (sess_id:string)=>{
        db.remove(sess_id).then(x=>setRemoveCount(removeCount+1))
    }
    // console.log(sessions)
    
    useEffect(()=>{
        db.getList().then(x=>{setSessions(x)})
    },[props.gc,removeCount])

    return <div className='rss-list-sessions'>
        {format(sessions,remove,props.enter)}
    </div>
}

function get_date_string(d: Date){
    // keep only minutes
    return d.toLocaleString().split(':').slice(0,2).join(':')
}

function defaultSessFormat<T>(
    sessions:SessRecord<T>[],
    remove:(x:string)=>void,
    enter:(x:SessRecord<T>)=>void
){  
    const sortedSessions = _.sortBy(sessions,x=>-x.time)
    return sortedSessions.map((x)=><div key={x.uid} className="rss-list-sessions-item">
            <a className='rss-list-sessions-item-name-time' onClick={e=>enter(x)}>
                <span className='rss-list-sessions-item-name'>{x.sessName}</span>
                <span className="rss-list-sessions-item-time">{get_date_string(x.time)}</span>
            </a>
            <a className='rss-list-sessions-item-remove' onClick={e=>remove(x.uid)}>remove</a>
    </div>)
}



export {SaveSession, ListSessions, DBStore}