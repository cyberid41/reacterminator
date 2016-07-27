const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

module.exports = function reducers() {
  return `\
export default (base, { actionTypeConstants }) => (
  (state, action) => {
    switch (action.type) {
      default:
        return base(state, action);
    }
  }
);
`;
};
