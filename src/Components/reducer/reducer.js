export const actionTypes = {
     inputValue: 'inputValue',
     method: 'method',
     textArea: 'textArea',
     textAreaValue: 'textAreaValue',
     data: 'data',
     loading: 'loading',
     page : 'page'
}
   
export const initialValue = {
     inputValue: '',
     method: '',
     textArea: '',
     textAreaValue: null,
     data: {},
     loading: true,
     page : ''
   }
   
export  const reducer = (state, action) => {
     switch (action.type) {
       case actionTypes.inputValue:
         return {
           ...state,
           inputValue :action.payload.value
         }
       case actionTypes.method:
         return {
           ...state,
           method :action.payload.value
         }
       case actionTypes.textArea:
         return {
           ...state,
           textArea :action.payload
         }
       case actionTypes.textAreaValue:
         return {
           ...state,
           textAreaValue :action.payload.value
         }
       case actionTypes.data:
         return {
           ...state,
           data :action.payload.value
         }
       case actionTypes.loading:
          return {
               ...state,
               loading : action.payload.value
          }
          
       default:
         return state
     }
   }