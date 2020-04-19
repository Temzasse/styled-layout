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
