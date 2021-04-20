import React,{createContext, useContext, useReducer} from 'react';

type Action = {type: 'setFalse'} | {type : 'setTrue'};
type Dispatch = (action : Action) => void;
type State = {status :  boolean};
type PostProviderProps = {children : React.ReactNode}


const PostsStatusContext = createContext<{state: State; dispatch : Dispatch}| undefined>(undefined);


function statusReducer (state: State, action : Action){
    switch (action.type) {
        case 'setTrue':{
            if(!state.status){
                return {status: true}
            }else{
                return {status: false}
            }
        }
        case 'setFalse':{
            if(state.status){
                return {status: false}
            }else{
                return {status: true}
            }
        }
        default:
            throw new Error(`Unhandled action type`);
    }
}



function PostStateProvider ({children} : PostProviderProps) : JSX.Element{
    const [state, dispatch ] = useReducer(statusReducer,{status:false});

    const value = {state,dispatch};

    return (
        <PostsStatusContext.Provider value={value}>
            {children}
        </PostsStatusContext.Provider>
    )
}

function useChangePostStatus(){
    const context = useContext(PostsStatusContext);
    if(context === undefined){
        throw new Error('useChangePostStatus must be used within a PostStateProvider');
    }
    return context;
}

export {PostStateProvider,useChangePostStatus};