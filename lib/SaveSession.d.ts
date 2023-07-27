import { SaveSessionProps, ListSessionsProps, SessRecord } from "./Interfaces";
import DBStore from "./DBStore";
import 'react-edit-text/dist/index.css';
declare function SaveSession<T>(props: SaveSessionProps<T>): import("react/jsx-runtime").JSX.Element;
declare function ListSessions<T>(props: ListSessionsProps<T>): import("react/jsx-runtime").JSX.Element;
declare function defaultSessFormat<T>(sessions: SessRecord<T>[], remove: (x: string) => void, enter: (x: SessRecord<T>) => void): import("react/jsx-runtime").JSX.Element[];
export { SaveSession, ListSessions, defaultSessFormat, DBStore };
