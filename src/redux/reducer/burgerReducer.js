const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 1000,
    purchasing: false,
    ingredientNames: {
        bacon: 'Гахайн Mах',
        cheese: 'Бяслаг',
        meat: 'Үхрийн Mах',
        salad: 'Салад'
      }
}
const ingredientsPrices = { salad: 150, cheese: 250, bacon: 800, meat: 1500}

const reducer = (state = initialState, action) => {
   if (action.type === "ADD_INGREDIENT"){
       return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ortsNer]: state.ingredients[action.ortsNer] + 1
        },
       purchasing: true,
        totalPrice: state.totalPrice + ingredientsPrices[action.ortsNer],
       }
   }
   else if (action.type === "REMOVE_INGREDIENT"){
       const newPrice = state.totalPrice - ingredientsPrices[action.ortsNer];
    return {
    ...state,
     ingredients: {
         ...state.ingredients,
         [action.ortsNer]: state.ingredients[action.ortsNer] - 1
     },
     totalPrice: newPrice,
     purchasing: newPrice > 1000
    }
}
    return state;
}

export default reducer;