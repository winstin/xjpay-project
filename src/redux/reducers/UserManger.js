/**
 @author wp
**/
import { INITGUNSDATA,GETDATA } from '../actions/BatchPageAction'

//初始化状态
const initialState = {
    'allData':[],
    'dataSource':[],
    'isLoad':true,
    'total':0
}
export default function PrintDialog(state = initialState, action){
    switch (action.type) {
        case 'INITGUNSDATA':

                return Object.assign({},state,{
                    'dataSource':action.dataSource,
                    'allData':action.dataSource,
                    total:action.total,
                });
            break;

        case 'CHOOSEDATA':
                return Object.assign({},state,{
                    chooseDatas:action.chooseDatas,
                    chooseIndex:action.chooseIndex,
                });
            break;

        case 'GETDATA':
                return Object.assign({},state,{
                    'dataSource':state.allData.slice((action.pageno-1)*20,(action.pageno-1)*20+20),
                });
            break;
        default:
            return state;
    }
}
