import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";

export interface AsyncDataState<T> {
  value: T;
  status: "idle" | "loading" | "failed";
}

export const initialFetchState = <T>(initialValue: T): AsyncDataState<T> => ({
  value: initialValue,
  status: "idle",
});

export const fetchReducers = <T>(
  builder: ActionReducerMapBuilder<AsyncDataState<T>>,
  asyncAction: AsyncThunk<any, number, any>
) => {
  builder
    .addCase(asyncAction.pending, (state) => {
      state.status = "loading";
    })
    .addCase(asyncAction.fulfilled, (state, action) => {
      state.status = "idle";
      state.value += action.payload;
    })
    .addCase(asyncAction.rejected, (state) => {
      state.status = "failed";
    });
};
