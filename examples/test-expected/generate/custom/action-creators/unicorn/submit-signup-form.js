export default (base, { actionTypeConstants, store }) => (
  (event) => {
    const formValues = store.getState().unicorn;

    return {
      type: actionTypeConstants.unicorn.submitSignupForm,
      value: event.target.value,
    };
  }
);
