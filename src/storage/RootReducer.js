const initialState={
    data:{},
    user:{}
}

export function RootReducer(state=initialState,action){
    switch(action.type)
    {
        case 'ADD_USER':
            state.user[action.payload[0]]=action.payload[1]
            console.log(state.data)
            return {data: state.data, user: state.user}
        
        case 'ADD_PRODUCT':
            state.data[action.payload[0]]=action.payload[1]
            console.log(state.data)
            return {data: state.data, user: state.user}

        case 'EDIT_EMPLOYEE':
            state.data[action.payload[0]]=action.payload[1]
            console.log(state.data)
            return {data: state.data, user: state.user}

        case 'DELETE_PRODUCT':
            delete state.data[action.payload[0]]
            console.log(state.data)
            return {data: state.data, user: state.user}

        default:
            return {data: state.data, user: state.user}

    }
}

export default RootReducer;