import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import { AllCategoryReducer, FrontPageCategoryReducer } from "./reducers/categoryReducers";
import { userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
import { adminReducer } from "./reducers/adminReducer";

const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    AllCategories:AllCategoryReducer,
    frontPageCategories:FrontPageCategoryReducer,
    user:userReducer,
    cart:cartReducer,
    order:orderReducer,
    admin:adminReducer
});

function getTotal(e) {
    let total = 0
    if(typeof(e)==='object'){
        e.forEach((elem) => {
            total += (elem.price * elem.quantity)
        })
    }
    return total
}

let initialState ={
    cart:{
        cartItems:localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        total:getTotal(localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem('cartItems')):0)
    }
};
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;