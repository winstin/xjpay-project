/**
 @author wp
**/
import { INITGUNSDATA } from '../actions/BatchPageAction'

//初始化状态
const initialState = {
    userType:"",
}
export default function PrintDialog(state = initialState, action){
    switch (action.type) {
        case 'INITGUNSDATA':
                return Object.assign({},state,{
                    userType:action.userType,
                });
            break;
        default:
            return state;
    }
}
