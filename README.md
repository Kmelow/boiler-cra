## React

- Install React with CRA

```
npx create-react-app <app-name>
```

- In `src`, leave files: `App.(css/js/test.js)` `index.js` and `setupTests.js`
- In `public`, leave files: `favicon`, `index` and `manifest`

- Edit `src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

- Edit `src/App.js`

```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return <div className="App">Let the games begin</div>;
  }
}

export default App;
```

## Enzyme and Jest

### Installation

- Install and setup [Enzyme](https://enzymejs.github.io/enzyme/) and [Jest for Enzyme](https://www.npmjs.com/package/jest-enzyme)

`npm i -D enzyme jest-enzyme enzyme-adapter-react-16`

- Install a [babel plugin](https://www.npmjs.com/package/babel-plugin-react-remove-properties) that removes react component properties

`$ npm install --save-dev babel-plugin-react-remove-properties`

- Install util to check prop types

`$ npm install --save-dev check-prop-types`

### Configure testing

- Eject :rocket: after commiting :octocat: to be able to configure [babel plugin](https://www.npmjs.com/package/babel-plugin-react-remove-properties)

`$ npm run eject`

- Edit `package.json: {babel}` so that `data-test` can be removed from the react component properties before production

```js
"babel": {
    "env": {
      "production": {
        "plugins": [
          ["react-remove-properties", {"properties": ["data-test"]}]
        ]
      }
    },
    "presets": [
      "react-app"
    ]
  }
```

- Configure Enzyme adapter (`setupTests.js`)

```js
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

- Add `data-test` attribute to components we want to test (`App.js`)

```js
<div data-test="component-congrats" className="App">
```

- Create test utilis under `~/test/testUtils.js`

```js
import checkPropTypes from 'check-prop-types';

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );

  expect(propError).toBeUndefined();
};
```

- Add tests (`App.test.js`)

```js
import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';

import Congrats from './Congrats';

const defaultProps = {
  success: false
};

/**
 * Factory function to create a shallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this component
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});

test('should render non-empty congrats message when `success` props is true', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().lenght).not.toBe(0);
});

test('should not throw warning with expected prop', () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
});
```

## Eslint with Airbnb Config

### Installation

- install all basic eslint and prettier dependencies

`$ npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node`

- Install [Airbnb config for eslint](https://www.npmjs.com/package/eslint-config-airbnb)

`$ npx install-peerdeps --dev eslint-config-airbnb`

- Launch init for eslint

`$ eslint --init`

- Create `.eslintrc` and `.prettierrc`

```json
// .eslintrc
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ]
  }
}
```

```json
// .prettierrc
{
  "singleQuote": true
}
```

## Redux

### Installation
