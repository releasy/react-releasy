import * as React from 'react';

import { MeQuery } from '../../../tests/components';
import { createConfig } from '../../../tests/fixtures/core';
import { createQueryResponse } from '../../../tests/fixtures/relay';

import ReleasyProvider from '../../components/ReleasyProvider';
import getDataFromTree, {
  ComponentType,
  identifyComponentType,
  walkTree,
} from '../getDataFromTree';

it('should identify context', () => {
  const initialValue = { name: 'John' };

  const MyContext = React.createContext(initialValue);

  expect(identifyComponentType(
    <MyContext.Provider value={initialValue}>
      <div />
    </MyContext.Provider>,
  )).toBe(ComponentType.CONTEXT_PROVIDER);

  expect(identifyComponentType(
    <MyContext.Consumer>
      {() => <div />}
    </MyContext.Consumer>,
  )).toBe(ComponentType.CONTEXT_CONSUMER);
});

it('should identify class component', () => {
  class MyComponent extends React.Component {
    render() {
      return this.props.children;
    }
  }

  expect(identifyComponentType(
    <MyComponent>
      <div />
    </MyComponent>,
  )).toBe(ComponentType.CLASS_COMPONENT);
});

it('should identify stateless component', () => {
  const MyComponent = props => props.children;

  expect(identifyComponentType(
    <MyComponent>
      <div />
    </MyComponent>,
  )).toBe(ComponentType.STATELESS_COMPONENT);
});

it('should identify dom elements', () => {
  expect(identifyComponentType(
    <div />,
  )).toBe(ComponentType.DOM_ELEMENT);

  expect(identifyComponentType(
    <span />,
  )).toBe(ComponentType.DOM_ELEMENT);

  expect(identifyComponentType(
    <p />,
  )).toBe(ComponentType.DOM_ELEMENT);
});

it('should walk context', async () => {
  const initialValue = { name: 'John' };
  const realValue = { name: 'Doe' };

  const MyContext = React.createContext(initialValue);

  const components = [];

  await walkTree(
    <MyContext.Provider value={realValue}>
      <MyContext.Consumer>
        {(anotherValue: object) => {
          expect(anotherValue).toBe(realValue);

          return [<div />, <div />];
        }}
      </MyContext.Consumer>
    </MyContext.Provider>,
    {},
    (element: React.ReactNode) => {
      const componentType = identifyComponentType(element);
      components.push(componentType);
    },
  );

  expect(components).toMatchSnapshot();
});

it('should walk class component', async () => {
  class MyComponent extends React.Component {
    render() {
      return (
        <div />
      );
    }
  }

  const components = [];

  await walkTree(
    <MyComponent />,
    {},
    (element: React.ReactNode) => {
      const componentType = identifyComponentType(element);
      components.push(componentType);
    },
  );

  expect(components).toMatchSnapshot();
});

it('should walk class component with getDerivedStateFromProps', async () => {
  class MyComponent extends React.Component {
    static getDerivedStateFromProps() {
      return { name: 'John' };
    }

    render() {
      return (
        <div />
      );
    }
  }

  const components = [];

  await walkTree(
    <MyComponent />,
    {},
    (element: React.ReactNode) => {
      const componentType = identifyComponentType(element);
      components.push(componentType);
    },
  );

  expect(components).toMatchSnapshot();
});

it('should walk class component with UNSAFE_componentWillMount', async () => {
  class MyComponent extends React.Component {
    UNSAFE_componentWillMount() {
      this.setState({ name: 'John' });
    }

    render() {
      return (
        <div />
      );
    }
  }

  const components = [];

  await walkTree(
    <MyComponent />,
    {},
    (element: React.ReactNode) => {
      const componentType = identifyComponentType(element);
      components.push(componentType);
    },
  );

  expect(components).toMatchSnapshot();
});

it('should walk class component with componentWillMount', async () => {
  class MyComponent extends React.Component {
    componentWillMount() {
      this.setState(() => ({ name: 'John' }));
    }

    render() {
      return (
        <div />
      );
    }
  }

  const components = [];

  await walkTree(
    <MyComponent />,
    {},
    (element: React.ReactNode) => {
      const componentType = identifyComponentType(element);
      components.push(componentType);
    },
  );

  expect(components).toMatchSnapshot();
});

it('should walk stateless component', async () => {
  const MyComponent = () => <div />;

  const components = [];

  await walkTree(
    <MyComponent />,
    {},
    (element: React.ReactNode) => {
      const componentType = identifyComponentType(element);
      components.push(componentType);
    },
  );

  expect(components).toMatchSnapshot();
});

it('should get data from tree', async () => {
  global.fetch.mockResponse(
    JSON.stringify(createQueryResponse()),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const config = createConfig();

  const result = await getDataFromTree(
    <ReleasyProvider config={config}>
      <MeQuery />
    </ReleasyProvider>,
  );

  expect(result).toMatchSnapshot();
});
