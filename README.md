# React-save-session

React components to manage session saving in browser's local storage using IndexedDB. 

This package contains two components: `<SaveSession/>` to manage session saving and `<ListSessions />` to display and retrieve saved sessions.

## Install
```shell
npm i react-save-session
```
This repo is created using create-react-app. After downloading and install dependancies with `npm install`, run `npm start` to start an example on how to use this package.

## Usage
```TypeScript
import {SaveSession,ListSessions} from 'react-save-session'
```
A real example using this package can be found here:

https://frlender.github.io/comut-viz-app/

### SaveSession
In its basic form, the `<SaveSession />` component consits of a save button and an editable textarea displaying the session name. The interface of the `<SaveSession />` component is:

```TypeScript
interface SaveSessionProps<T>{
    dbName: string,
    getData: ()=>T
    sessName?: string,
    editTextWidth?: number
    editTextHeight?: number
    buttonClass?: string
    editTextStyle?: {},
    notification?: boolean
    notificationDelay?: number
    download?:(x:SessRecord<T>)=>void
    uid?:string,
    gc?: number
    setGc?: (x:React.SetStateAction<number>)=>void
    format?: ...
}
```
`<T>`: TypeScript interface for the saved session data. It is the users' responsibilty to make sure the session data are savable in IndexedDB or be able converted into a JSON string. 

`dbName`： The database name of the underlying IndexedDB into which the session will be saved. It is normally the name of your website or any uniquely identifiable string.

`getData`: A function that returns the session data.

`sessName`: The default session name to be dispalyed in the editable textarea. Defaults to "Session".

`editTextWidth`: the width of the editable textarea.

`editTextHeight`: the height of the editable textarea.

`buttonClass`: the class names passed to the button(s) in the component.

`editTextStyle`: the styles applied to the editable textarea.

`notification`: whether to show a notification flag that will disappear after a short delay to notify that a session has been saved.

`notificationDelay`: defaults to 800ms.

`download`: If true, show also the download button. Clicking on the button will download the session data as a `SessionRecord` in a JSON file. If a function is passed, the function will be given a `SessionRecord` and handles how to save the `SessionRecord` into a file. The interface of `SessionRecord` is showed below. `time` is the local time when the session is saved.

```TypeScript
interface SessRecord<T>{
    uid: string,
    time: Date,
    sessName: string,
    data: T,
}
```

`uid`: The UUID of a session. If `uid` is passed and a session with this uid was previously saved in the IndexedDB, the old record will be overwritten after clicking the save button. If `uid` is not passed, a new one is created for the session.

`gc`: A global counter. With the `setGC` function, it controls update of the `<ListSessions />` component after a session is saved. `gc` should be a state variable created in a parent component common to `<SaveSession />` and  `<ListSessions />`. Usually, users do not need to set this variable as the two components are commonly placed in different pages (views) of an app. Navigating between pages (views) should automatically update `<ListSessions />`. 


### ListSessions
The interface of the `<SaveSession />` component is
```TypeScript
interface ListSessionsProps<T>{
    dbName: string,
    enter: (x:SessRecord<T>)=>void,
    gc?: number,
    format?: ...
}
```
`dbName`: The same database name as in `<SaveSession />`.

`enter`: A function to be executed after a session link is clicked and the session is retrived from the database. The function is given a `SessionRecord` as input and manages to reconstruct the session from the recored.

`gc`: A global counter. It should be a state variable the change of which updates the component.

### CSS
The elements in  the `<SaveSession />` component have the following CSS class names set:

`.rss-save-session`: on the `span` element wrapping all other elements.

`.rss-save-session-saved`: on the `span` element serving as the notification flag.

The buttons and editable textarea can be styled using the `buttonClass` and `editTextStyle` properties of the component.

\
The elements in  the `<ListSessions />` component have the following CSS class names set:

`.rss-list-sessions`: on the `div` element wrapping all other elements.

`.rss-list-sessions-item`: on the `div` element representing a saved session in the list that displays names and saved time of saved sessions.

`.rss-list-sessions-item-name-time`: on the `a` element displaying the name and time of a saved session. 

`.rss-list-sessions-item-name`: on the `span` element displaying the name of a saved session. 

`.rss-list-sessions-item-time`: on the `span` element displaying the time of a saved session. 

`.rss-list-sessions-item-remove`: on the `a` element that deletes a saved session..


## Customization
React-save-session allows full customization of the displayed JSX. Both components have a format property that accepts a function that takes internal variables and functions as input and returns JSX. The interfaces are:

```TypeScript
interface SaveSessionProps<T>{
    ...
    format?: (
            getRecord: ()=>SessRecord<T>,
            download:(x:SessRecord<T>)=>void,
            save:()=>void,
            notification: boolean,
            saved: boolean,
            sessName: string,
            setSessName:(x:React.SetStateAction<string>)=>void,
            buttonClass: string,
            editTextStyle: {}) => JSX.Element[],
}
```

```TypeScript
interface SaveSessionProps<T>{
    ...
    format?: (sessions:SessRecord<T>[],
                remove:(x:string)=>void,
                enter:(x:SessRecord<T>)=>void
            ) => JSX.Element[],
}
```
The default JSX formatters can be found at `src/comps/SaveSession.tsx`.
