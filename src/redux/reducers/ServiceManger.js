/**
 @author wp
**/

//初始化状态
const initialState = {
    'allData':[],
    'dataSource':[],
    'isLoad':true,
    'total':0,
    chooseDatas:[],
    chooseIndex:[],
    'downDetails':[],
    'upDetail':[],
}
export default function PrintDialog(state = initialState, action){
    switch (action.type) {
        case 'INITDATA':
                return Object.assign({},state,{
                    'dataSource':action.dataSource,
                    'isLoad':false,
                    'total':action.total,
                });
            break;

        case 'DetailDATA':
                return Object.assign({},state,{
                    'downDetails':action.downDetails==""?[]:action.downDetails,
                    'upDetail':action.upDetail==""?[]:action.upDetail,
                    
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
