export const getImportant = (i: boolean) => (i ? '!important' : '');

export function makeTransientProps<T>(ownProps: any[], props: any) {
  return Object.entries(props).reduce((acc, [prop, val]) => {
    if (ownProps.includes(prop)) {
      acc[`$${prop}`] = val;
    } else {
      acc[prop] = val;
    }
    return acc;
  }, {} as any) as T;
}

const transient = (x: string) => `$${x}`;

export function parseProps<T extends object>(props: T, ownProps: string[]) {
  return Object.entries(props)
    .filter(([k]) => ownProps.includes(k))
    .reduce(
      (acc, [propKey, propValue]) => {
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

        return acc;
      },
      { $media: {} } as any // TODO: fix type
    );
}
