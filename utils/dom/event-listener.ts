import {
  useEffect, useState,
} from "react";

import lodashDebounce from "lodash/debounce";
import lodashThrottle from "lodash/throttle";
import {useDeepCompareEffect, useDeepCompareMemo} from "use-deep-compare";

export type EventListenerConfig<EventName extends (keyof WindowEventMap | keyof DocumentEventMap | keyof ElementEventMap)> = (
  EventName extends keyof WindowEventMap ? WindowEventListenerConfig<EventName> :
  EventName extends keyof DocumentEventMap ? DocumentEventListenerConfig<EventName> :
  EventName extends keyof ElementEventMap ? ElementEventListenerConfig<EventName> :
  any
);

type WindowEventListenerConfig<EventName extends keyof WindowEventMap> = CommonEventListenerConfig & {
  element?: Window | null | undefined;
  name: EventName;
  handler: (evt?: WindowEventMap[EventName] | Event) => void;
  options?: boolean | AddEventListenerOptions;
};

type DocumentEventListenerConfig<EventName extends keyof DocumentEventMap> = CommonEventListenerConfig & {
  element?: Document | null | undefined;
  name: EventName;
  handler: (evt?: DocumentEventMap[EventName] | Event) => void;
  options?: boolean | AddEventListenerOptions;
};

type ElementEventListenerConfig<EventName extends keyof ElementEventMap> = CommonEventListenerConfig & {
  element?: Element | null | undefined;
  name: EventName;
  handler: (evt?: ElementEventMap[EventName] | Event) => void;
  options?: boolean | AddEventListenerOptions;
};

type CommonEventListenerConfig = {
  init?: boolean;
  throttle?: ThrottleConfig;
  debounce?: DebounceConfig;
};

type ThrottleConfig = {
  wait: number;
  options?: Parameters<typeof lodashThrottle>[2];
};

type DebounceConfig = {
  wait: number;
  options?: Parameters<typeof lodashDebounce>[2];
};

/**
 * @param handler handler should have been memoized
 */

export const useEventListener = <EventName extends (keyof WindowEventMap | keyof DocumentEventMap | keyof ElementEventMap)>(
  {
    element,
    name,
    options,
    handler,
    init = false,
    throttle,
    debounce,
  }: EventListenerConfig<EventName>
) => {
  const [eventListener, setEventListener] = useState<EventListenerConfig<EventName>["handler"]>();

  useDeepCompareEffect(() => {
    if (throttle) {
      setEventListener(() => lodashThrottle(handler, throttle.wait, throttle.options));
    } else if (debounce) {
      setEventListener(() => lodashDebounce(handler, debounce.wait, debounce.options));
    } else {
      setEventListener(() => handler);
    }
  }, [throttle, debounce, handler]);

  const eventOptions = useDeepCompareMemo(() => {
    return options;
  }, [options]);

  useEffect(() => {
    const eventTarget = element ? element : window ? window : undefined;
    const isSupported = eventTarget && eventTarget.addEventListener;
    if (!isSupported) return;

    if (!eventListener) return;

    if (init) {
      eventListener();
    }
    eventTarget?.addEventListener(name, eventListener, eventOptions);
    return () => {
      eventTarget?.removeEventListener(name, eventListener, eventOptions);
    };
  }, [name, element, eventOptions, eventListener, init]);
};
