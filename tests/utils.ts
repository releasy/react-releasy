export const delay = (value: number): Promise<any> => new Promise(resolve =>
  setTimeout(() => resolve(), value),
);
