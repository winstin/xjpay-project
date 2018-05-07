/**
 @author wp
**/
import { INITGUNSDATA,GETDATA } from '../actions/GunsIndex'

//初始化状态
const initialState = {
    dataSources:[],
    total:0,
}
export default function PrintDialog(state = initialState, action){
    switch (action.type) {
        case 'INITGUNSDATA':
                return Object.assign({},state,{
                    dataSources:action.dataSource,
                    total:action.total,
                });
            break;

        case 'CHOOSEDATA':
                return Object.assign({},state,{
                    chooseDatas:action.chooseDatas,
                    chooseIndex:action.chooseIndex,
                });
            break;
        default:
            return state;
    }
}
