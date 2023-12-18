import { ADD_FAV, REMOVE_FAV, FILTER, ORDER,CREATE_USER_SUCCESS,CREATE_USER_FAILURE, CHECK_CREDENTIALS_SUCCESS, CHECK_CREDENTIALS_FAILURE } from "./action-types";


const initialState = {
    myFavorites: [],
    allCharacters: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAV:
  return { ...state, myFavorites: action.payload, allCharacters: action.payload };

    case REMOVE_FAV:
        return { ...state, myFavorites: action.payload };  
        case FILTER:
            if(action.payload === "All") return {
                ...state,
                myFavorites: state.allCharacters
            }
            const filteredCharacters = state.allCharacters.filter(
                char => char.gender === action.payload
                );
                return {
                    ...state,
                    myFavorites: filteredCharacters
                }
                case ORDER:
               
                let orderCopy = [ ...state.myFavorites ];
                if(action.payload === "A") {
                    orderCopy.sort(
                        (a, b) => {
                            if(a.name > b.name) return 1;
                            else return -1;
                        }
                    )
                } else if (action.payload === "D") {
                    orderCopy.sort(
                        (a, b) => {
                            if(a.name < b.name) return 1;
                            else return -1;
                        }
                    )
                }
                return {
                    ...state,
                    myFavorites: orderCopy
                }
                case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        createUserError: null,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        user: null,
        createUserError: action.payload,
      };

      case CHECK_CREDENTIALS_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userData: action.payload,
                error: null
            };
        case CHECK_CREDENTIALS_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                userData: null,
                error: 'Acceso denegado. Correo electrónico o contraseña incorrectos.'
            };

                


        default: 
            return { ...state }
    }
};


export default reducer;