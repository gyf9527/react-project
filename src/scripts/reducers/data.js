
const defaultState = {
    data:"",
}
export default (state = defaultState, action) => {
    // console.log(action);

    switch (action.type) {
        case "getSong":
            return{...state,data:action.data};
            break;



        default:
            return state;
            break;
    }
}