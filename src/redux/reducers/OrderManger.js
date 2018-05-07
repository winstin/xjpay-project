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
    chooseIndex:[]
}
export default function PrintDialog(state = initialState, action){

    console.log(action)
    switch (action.type) {
        case 'INITGUNSDATA':
                return Object.assign({},state,{
                    'dataSource':action.dataSource,
                    'isLoad':false,
                    'total':action.total,
                    chooseDatas:[]
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
