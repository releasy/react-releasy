export enum ComponentType {
  CONTEXT_PROVIDER = 'React.Provider',
  CONTEXT_CONSUMER = 'React.Consumer',
  CLASS_COMPONENT = 'React.ComponentClass',
  STATELESS_COMPONENT = 'React.SFC',
  DOM_ELEMENT = 'React.DOMElement',
}

const isContextProvider = (element: React.ReactNode): element is React.Provider<any> => {
  const type = (element as any).type;
  return !!type && !!type._context;
};

const isContextConsumer = (element: React.ReactNode): element is React.Consumer<any> => {
  const type = (element as any).type;
  return !!type && !!type.Consumer;
};

const isClassComponent = (element: React.ReactNode): element is React.ComponentClass<any> => {
  const type = (element as any).type;
  return !!type && type.prototype &&
    (type.prototype.isReactComponent ||
      type.prototype.isPureReactComponent);
};

const isStatelessComponent = (element: React.ReactNode): element is React.SFC<any> => {
  const type = (element as any).type;
  return !!type && typeof type === 'function';
};

const isDOMElement = (element: React.ReactNode): element is React.DOMElement<any, any> => {
  return !isContextProvider(element) &&
    !isContextConsumer(element) &&
    !isClassComponent(element) &&
    !isStatelessComponent(element);
};

export const identifyComponentType = (element: React.ReactNode): ComponentType => {
  const rules = {
    [ComponentType.CONTEXT_PROVIDER]: isContextProvider,
    [ComponentType.CONTEXT_CONSUMER]: isContextConsumer,
    [ComponentType.CLASS_COMPONENT]: isClassComponent,
    [ComponentType.STATELESS_COMPONENT]: isStatelessComponent,
    [ComponentType.DOM_ELEMENT]: isDOMElement,
  };

  return Object.keys(ComponentType).reduce(
    (accumulator, key) => {
      const value = ComponentType[key];
      const rule = rules[value];

      if (accumulator || !rule(element)) {
        return accumulator;
      }

      return value;
    },
    null,
  );
};

const handleContextProvider = async (
  element: React.Provider<any>,
  context: any,
  visitor: (element: React.ReactNode, instance: React.Component<any>) => void,
) => {
  const type = (element as any).type;
  const props = (element as any).props;

  const currentValue = props.value || {};
  type._context.currentValue = currentValue;

  await visitor(element, null);

  return walkTree(
    props.children,
    context,
    visitor,
  );
};

const handleContextConsumer = async (
  element: React.Consumer<any>,
  context: any,
  visitor: (element: React.ReactNode, instance: React.Component<any>) => void,
) => {
  const type = (element as any).type;
  const props = (element as any).props;

  await visitor(element, null);

  return walkTree(
    props.children(type.currentValue),
    context,
    visitor,
  );
};

const handleClassComponent = async (
  element: React.ComponentClass<any>,
  context: any,
  visitor: (element: React.ReactNode, instance: React.Component<any>) => void,
) => {
  const type = (element as any).type;

  const props = {
    ...type.defaultProps,
    ...(element as any).props,
  };

  const instance = new type(props, context);

  instance.context = instance.context || context;
  instance.state = instance.state || null;

  instance.setState = (state) => {
    const newState = typeof state === 'function' ? state(instance.state, instance.props) : state;
    instance.state = { ...instance.state, ...newState };
  };

  if (type.getDerivedStateFromProps) {
    const newState = type.getDerivedStateFromProps(instance.props, instance.state);
    instance.state = { ...instance.state, ...newState };
  } else if (instance.UNSAFE_componentWillMount) {
    instance.UNSAFE_componentWillMount();
  } else if (instance.componentWillMount) {
    instance.componentWillMount();
  }

  const newContext =  instance.getChildContext ? {
    ...context,
    ...instance.getChildContext(),
  } : context;

  await visitor(element, instance);

  return walkTree(
    instance.render(),
    newContext,
    visitor,
  );
};

const handleStatelessComponent = async (
  element: React.SFC<any>,
  context: any,
  visitor: (element: React.ReactNode, instance: React.Component<any>) => void,
) => {
  const type = (element as any).type;

  const props = {
    ...type.defaultProps,
    ...(element as any).props,
  };

  await visitor(element, null);

  return walkTree(
    type(props),
    context,
    visitor,
  );
};

const handleDOMElement = async (
  element: React.DOMElement<any, any>,
  context: any,
  visitor: (element: React.ReactNode, instance: React.Component<any>) => void,
) => {
  const props = (element as any).props || {};

  await visitor(element, null);

  return walkTree(
    props.children,
    context,
    visitor,
  );
};

export const walkTree = (
  element: React.ReactNode,
  context: any = {},
  visitor: (element: React.ReactNode, instance: React.Component<any>) => void,
) => {
  if (!element) {
    return;
  }

  if (Array.isArray(element)) {
    return Promise.all(element.map(item => walkTree(item, context, visitor)));
  }

  const handlers = {
    [ComponentType.CONTEXT_PROVIDER]: handleContextProvider,
    [ComponentType.CONTEXT_CONSUMER]: handleContextConsumer,
    [ComponentType.CLASS_COMPONENT]: handleClassComponent,
    [ComponentType.STATELESS_COMPONENT]: handleStatelessComponent,
    [ComponentType.DOM_ELEMENT]: handleDOMElement,
  };

  const componentType = identifyComponentType(element);
  const handler: any = handlers[componentType];

  return handler(element, context, visitor);
};

// @TODO - improve this later
const resolveRelayQueryRenderer = (instance: React.Component<any>) => {
  const { environment, query, variables } = instance.props;
  const { getRequest } = environment.unstable_internal;
  const request = getRequest(query);

  return new Promise((resolve) => {
    const interval = setInterval(
      () => {
        const { _snapshot } = (instance.state as any).queryFetcher;
        if (!_snapshot) {
          return;
        }

        const { data } = _snapshot;

        clearInterval(interval);
        resolve({ request, variables, data });
      },
      0,
    );
  });
};

const getDataFromTree = async (
  rootElement: React.ReactNode,
  rootContext: any = {},
): Promise<any> => {
  const promises = [];

  await walkTree(
    rootElement,
    rootContext,
    async (element: React.ReactNode, instance: React.Component<any>) => {
      const { type } = (element as any);

      if (!type || type.name !== 'ReactRelayQueryRenderer') {
        return;
      }

      const promise = resolveRelayQueryRenderer(instance);
      promises.push(promise);
    },
  );

  return Promise.all(promises);
};

export default getDataFromTree;
