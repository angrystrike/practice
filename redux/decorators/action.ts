import { fork, take } from "redux-saga/effects";
import Entity from "redux/models/Entity";
import { action as act } from 'redux/action';

const action = () => {
    return (target: any, propertyKey: string) => {
        const entityName = target.constructor.name;
        const entityItem = entityName in Entity.actions ? Entity.actions[entityName] : {};
        if (!(propertyKey in entityItem)) {
            entityItem[propertyKey] = {
                trigger: (data) => act(propertyKey.toUpperCase(), data),
            };
        }
        Entity.actions[entityName] = entityItem;
    };
};

export default action;

// const action = () => {
//     return (target: any, propertyKey: string) => {
//         console.log('ACTION = 2');
        
//         // const instanceOnly = Object
//         //     .getOwnPropertyNames(Object.getPrototypeOf(this))
//         //     .filter(prop => prop != "constructor");

//         // console.log(instanceOnly);
//         target[propertyKey] = target[propertyKey].bind(target);
//         const func = target[propertyKey];
//         const sagaFunc = function* () {
//             while (true) {
//                 const data = yield take(propertyKey.toUpperCase());
//                 delete (data.type);
//                 yield fork(func, data);
//             }
//         };
//         Entity.setAction(propertyKey, sagaFunc);

//         // Entity.actions[functionName] = {
//         //     saga: sagaFunc,
//         //     trigger: (data: any) => action(functionName.toUpperCase(), data)
//         // };

//         // instanceOnly.forEach((functionName, i) => {
//         //     this[functionName] = this[functionName].bind(this);

//         //     const func = this[functionName];

//         //     const sagaFunc = function* () {
//         //         while (true) {
//         //             const data = yield take(functionName.toUpperCase());
//         //             delete (data.type);
//         //             yield fork(func, data);
//         //         }
//         //     };

//         //     Entity.actions[functionName] = {
//         //         saga: sagaFunc,
//         //         trigger: (data: any) => action(functionName.toUpperCase(), data)
//         //     };

//         //     console.log('actions', Entity.actions);
//         // });



//         const entityName = target.constructor.name;
//         console.log('propertyKey', propertyKey);

//     };
// };