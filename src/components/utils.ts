export const getImportant = (i: boolean) => (i ? '!important' : '');

const transient = (x: string) => `$${x}`;

// TODO: fix types for helper functions
// These things are so dynamic that typing them might be close to impossible...

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
              } else if (!acc.$media[key]) {
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
    { $media: {} } as any
  );
}

// Sort responsive props so that they are applied in correct order for CSS specificity
function getSortedMedia(parsedProps: any) {
  const up: any[] = [];
  const down: any[] = [];
  const between: any[] = [];

  Object.entries(parsedProps.$media).forEach(entry => {
    const { min, max } = parsedProps.theme.breakpoints[entry[0]];

    if (typeof min === 'number' && typeof max === 'number') {
      between.push({ entry, min, max });
    } else if (typeof min === 'number' && typeof max !== 'number') {
      up.push({ entry, min });
    } else {
      down.push({ entry, max });
    }
  });

  up.sort((a, b) => b.min - a.min);
  down.sort((a, b) => a.max - b.max);
  between.sort((a, b) => b.min - a.min);

  return [...up, ...down, ...between].map(x => x.entry);
}

export function getResponsiveCSS(
  parsedProps: any,
  getCSS: (p: any, b?: boolean) => any
) {
  if (!parsedProps.$media || !parsedProps.theme.media) return '';
  return getSortedMedia(parsedProps).map(([breakpoint, props]: any) => {
    const breakpointCSS = getCSS({ ...parsedProps, ...props }, true); // true for adding !important
    return parsedProps.theme.media[breakpoint]`${breakpointCSS}`;
  });
}
