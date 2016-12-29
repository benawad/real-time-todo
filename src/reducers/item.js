function handleItems(state = {
  all: [],
}, action) {
  switch (action.type) {
    case 'FIND_ALL_ITEMS_DONE':
      return {
        all: action.result.data
      }

    case 'CREATED_ITEM':
      return {
        all: [action.item, ...state.all]
      }

    case 'UPDATED_ITEM':
      let newAll = [];
      for (const item of state.all) {
        if (item.id === action.item.id) {
          newAll.push(action.item);
        } else {
          newAll.push(item);
        }
      }
      return {
        all: newAll
      }

    case 'REMOVED_ITEM':
      return {
        all: state.all.filter((item) => item.id !== action.item.id)
      }

    default:
      return state;
  }
}

export default handleItems;
