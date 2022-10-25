import { useMemo, useState } from 'react';
import { useLocation } from 'react-router';

interface HandleRoute {
  from: string;
  to: string;
}

export const withHandleRoute = (Component: React.ComponentType) => () => {
  const location = useLocation();

  const pathname = useMemo((): string => {
    const { pathname } = location;

    return pathname;
  }, [location]);

  const defaultValue = useMemo((): HandleRoute => {
    return {
      from: pathname,
      to: pathname
    };
  }, [pathname]);

  const [route, setRoute] = useState<HandleRoute>(defaultValue);

  return <Component />;
};
