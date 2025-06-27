export default {
  "*.{js,jsx,ts,tsx}": ["eslint --fix --max-warnings 0", "prettier --write"],
  "!(*.{js,jsx,ts,tsx})": ["prettier --write --ignore-unknown"],
};
