/// <reference types="react" />
import { SaveSessionProps, ListSessionsProps } from "./Interfaces";
import DBStore from "./DBStore";
import 'react-edit-text/dist/index.css';
declare function SaveSession<T>(props: SaveSessionProps<T>): import("react/jsx-runtime").JSX.Element | JSX.Element[];
declare function ListSessions<T>(props: ListSessionsProps<T>): import("react/jsx-runtime").JSX.Element;
export { SaveSession, ListSessions, DBStore };
