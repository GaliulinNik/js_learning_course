// Реализация стора
const createStore = (reducer) => {
  let state = reducer(undefined, { type: "__INIT" });
  let subscribers = [];

  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      subscribers.forEach((callback) => callback());
    },
    subsribe: (callback) => subscribers.push(callback),
  };
};

const ACTIONS = {
  ADD_EVENT: "ADD_EVENT",
  REMOVE_EVENT: "REMOVE_EVENT",
  UPDATE_EVENT: "UPDATE_EVENT",
  SORT_EVENT: "SORT_EVENT",

  SUCCESS_LOGIN: "SUCCESS_LOGIN",
};

// actionCreator
const actionCreaterAddEvent = (eventInfo) => {
  // const eventInfoFull = fetch('запрос на получение данных')
  // prepare
  const eventInfoFull = eventInfo;

  return {
    type: ACTIONS.ADD_EVENT,
    payload: eventInfoFull,
  };
};

const initialStateEvents = {
  eventsWorld: ["Событие 1"],
};

// reducer - чистая функция
// 1. не должно быть side - эффектов, т.е. асинхронные запросы
// 2. при передачи одних и тех же данных при вызове редюсера получаем один и тот же результат
// immutable
const reducerEvents = (state = initialStateEvents, action) => {
  switch (action.type) {
    case ACTIONS.ADD_EVENT:
      return {
        ...state,
        eventsWorld: [...state.eventsWorld, action.payload.text],
      };

    case ACTIONS.REMOVE_EVENT:
      return {
        ...state,
        eventsWorld: state.eventsWorld.filter(
          (eventsWorld) => eventsWorld !== action.payload.text
        ),
      };

    case ACTIONS.UPDATE_EVENT:
      state.eventsWorld.forEach((element, index) => {
        if (element === action.payload.text) {
          state.eventsWorld[index] = element + " - update";
        }
      });
      return {
        ...state,
        eventsWorld: state.eventsWorld,
      };

    case ACTIONS.SORT_EVENT:
      return {
        ...state,
        eventsWorld: state.eventsWorld.sort(),
      };

    default:
      return {
        ...state,
      };
  }
};

const initialStateUsers = {
  users: ["Пользователь 1"],
};

const reducerLogin = (state = initialStateUsers, action) => {
  switch (action.type) {
    case ACTIONS.SUCCESS_LOGIN:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

const combineReducers = (reducersMap) => {
  return (state, action) => {
    const nextState = {};

    Object.entries(reducersMap).forEach(([key, reducer]) => {
      nextState[key] = reducer(state ? state[key] : state, action);
    });

    return nextState;
  };
};

const rootReducer = combineReducers({
  reducerEventsState: reducerEvents,
  reducerUsersState: reducerLogin,
});

const store = createStore(rootReducer);

store.subsribe(() => console.log("Изменились события..."));

console.log("store до", store.getState());

store.dispatch({ type: "ADD_EVENT", payload: { text: "Событие 4" } });
store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { text: "Событие 3" } });
store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { text: "Событие 2" } });
store.dispatch(actionCreaterAddEvent({ text: "Событие 88" }));

console.log("store после добавления", store.getState());

store.dispatch({ type: ACTIONS.REMOVE_EVENT, payload: { text: "Событие 88" } });

console.log("store после удаления", store.getState());

store.dispatch({ type: ACTIONS.SORT_EVENT });

console.log("store после сортировки", store.getState());

store.dispatch({ type: ACTIONS.UPDATE_EVENT, payload: { text: "Событие 2" } });

console.log("store после обновления", store.getState());
