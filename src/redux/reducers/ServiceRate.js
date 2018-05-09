/**
 @author wp
**/
import { INITDATA,GETDATA,SERVICEDATA } from '../actions/ServiceRate'

//初始化状态
const initialState = {
    'allData':[],
    'dataSource':[],
    'isLoad':true,
    'total':0,
    serviceData:[]
}
export default function PrintDialog(state = initialState, action){
    switch (action.type) {
        case INITDATA:
                return Object.assign({},state,{
                    'dataSource':action.dataSource,
                    'isLoad':false,
                    'allData':action.dataSource,
                    'total':action.total,
                });
            break;

        case GETDATA:
                return Object.assign({},state,{
                    'dataSource':state.allData.slice((action.pageno-1)*20,(action.pageno-1)*20+20),
                });
            break;
        case SERVICEDATA:
                return Object.assign({},state,{
                    serviceData:action.dataSource
                });
            break;
            
        default:
            return state;
    }
}
