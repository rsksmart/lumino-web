import _ from 'lodash';

export const likeFilter= (collection, attributeList, value) =>
    collection.filter((elem)=> {
        let included = false;
        for(let attribute of attributeList){
              if(elem[attribute].toLowerCase().includes(value.toLowerCase())){
                  included = true;
                  break;
             }
       }
        return included;
    });

export const andLikeFilter= (collection, att1, att2, val1, val2) =>{
    if(!_.isEmpty(val1) && !_.isEmpty(val2) ){
        return collection.filter((elem)=> {
            let included = false;
            if(elem[att1].toLowerCase().includes(val1.toLowerCase()) && elem[att2].toLowerCase().includes(val2.toLowerCase())){
                included = true;
            }
            return included;
        });
    }else if(!_.isEmpty(val1)){
        return likeFilter(collection, [att1], val1)
    }else if(!_.isEmpty(val2)){
        return likeFilter(collection, [att2], val2)
    }else{
        return collection;
    }
};


