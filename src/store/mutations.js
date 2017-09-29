
export const updateLoadingStatus = (state, payload) => {
  state.isLoading = payload.isLoading
}

export const updateRouterState = (state, payload) => {
  state.router = payload
}
