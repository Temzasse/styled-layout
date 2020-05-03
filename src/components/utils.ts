export const getImportant = (i: boolean) => (i ? '!important' : '');

const transient = (x: string) => `$${x}`;

export function parseProps<T extends object>(props: T, ownProps: string[]) {
  return Object.entries(props).reduce(
    (acc, [propKey, propValue]) => {
      if (ownProps.includes(propKey)) {
        const transientPropKey = transient(propKey);

        if (typeof propValue === 'object' && propValue !== null) {
          Object.entries(propValue as Record<string, string>).forEach(
            ([key, value]) => {
              // `_` represents the prop default value in responsive obj format
              if (key === '_') {
                acc[transientPropKey] = value;
              } else if (!acc[key]) {
                acc.$media[key] = { [transientPropKey]: value };
              } else {
                acc.$media[key][transientPropKey] = value;
              }
            }
          );
        } else {
          acc[transientPropKey] = propValue;
        }
      } else {
        acc[propKey] = propValue;
      }
      return acc;
    },
    { $media: {} } as any // TODO: fix type
  );
}
