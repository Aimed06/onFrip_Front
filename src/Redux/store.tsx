import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./UserSlice/UserSlice";
import modalsReducer from "./ModalSlice/ModalSlice";
 import NotificationsReducer from "./NotificationSlice/NotificationSlice";
import productReducer from "./ProductSlice/ProductSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalsReducer,
    Notifications: NotificationsReducer,
    product: productReducer,

   
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
