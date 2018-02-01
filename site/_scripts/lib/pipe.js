
export const pipe = (initialValue, ...projects) => projects.reduce(
  (value, project) => project(value),
  initialValue,
);
