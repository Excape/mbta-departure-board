export const bp = {
  abovePhone: mediaQuery(480),
  aboveTablet: mediaQuery(768),
  aboveLaptop: mediaQuery(1024),
  aboveDesktop: mediaQuery(1200),
};

function mediaQuery(minWidth: number) {
  return `@media (min-width: ${minWidth}px)`;
}
