import {SORT_ASC, SORT_DESC} from "../../constants/uiConstants";

const compareFunction = (obj1, obj2, attribute, attType,  sortingMode) => {
    switch (attType) {
        case Number:
            obj1[attribute] = Number(obj1[attribute]);
            break;
        default:
            break;
    }
    switch (sortingMode) {
        case SORT_ASC:
            if(obj1[attribute] < obj2[attribute]){
                return -1;
            }else if(obj1[attribute] > obj2[attribute]){
                return 1
            }else{
                return 0
            }
        case SORT_DESC:
            if(obj1[attribute] < obj2[attribute]){
                return 1;
            }else if(obj1[attribute] > obj2[attribute]){
                return -1
            }else{
                return 0
            }
        default:
            return 0;
    }

};

export const basicSort= (collection, sortingAttribute, attType, sortingMode) =>
     collection.sort((a, b)=> compareFunction(a, b, sortingAttribute, attType, sortingMode));



