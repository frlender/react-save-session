/// <reference types="react" />
interface SessRecord<T> {
    uid: string;
    time: Date;
    sessName: string;
    data: T;
}
interface SaveSessionProps<T> {
    dbName: string;
    getData: () => T;
    download?: boolean | ((x: SessRecord<T>) => void);
    sessName?: string;
    uid?: string;
    editTextWidth?: number;
    editTextHeight?: number;
    buttonClass?: string;
    editTextStyle?: {};
    notification?: boolean;
    notificationDelay?: number;
    gc?: number;
    setGc?: (x: React.SetStateAction<number>) => void;
    format?: (getRecord: () => SessRecord<T>, download: (x: SessRecord<T>) => void, save: () => void, notification: boolean, saved: boolean, sessName: string, setSessName: (x: React.SetStateAction<string>) => void, buttonClass: string, editTextStyle: {}) => JSX.Element[];
}
interface ListSessionsProps<T> {
    dbName: string;
    enter: (x: SessRecord<T>) => void;
    gc?: number;
    format?: (sessions: SessRecord<T>[], remove: (x: string) => void, enter: (x: SessRecord<T>) => void) => JSX.Element[];
}
export type { SaveSessionProps, ListSessionsProps, SessRecord };
