export default (base, { actionTypeConstants, store }) => (
  (event) => {
    const {  } = store.get();

    return {
      type: actionTypeConstants.unicorn.submitSignupForm,
      value: event.target.value,
    };
  }
);
