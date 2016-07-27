export default (base, { actionTypeConstants }) => (
  (state, action) => {
    switch (action.type) {
      default:
        return base(state, action);
    }
  }
);
