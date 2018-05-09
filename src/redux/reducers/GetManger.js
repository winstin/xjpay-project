/**
 @author wp
**/
import { INITGUNSDATA,GETDATA } from '../actions/BatchPageAction'

//初始化状态
const initialState = {
    'allData':[],
    'dataSource':[],
    'isLoad':true,
    'total':0,
    sumTotalFee:0,
    sumOrderNum:0,
    sumProfit:0,
    sumD0fee:0,
    sumTotalProfit:0,
}
export default function PrintDialog(state = initialState, action){
    switch (action.type) {
        case 'INITGUNSDATA':

                return Object.assign({},state,{
                    dataSource:action.dataSource,
                    total:action.total,
                    sumTotalFee:action.sumTotalFee,
                    sumOrderNum:action.sumOrderNum,
                    sumProfit:action.sumProfit,
                    sumD0fee:action.sumD0fee,
                    sumTotalProfit:action.sumTotalProfit,
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
