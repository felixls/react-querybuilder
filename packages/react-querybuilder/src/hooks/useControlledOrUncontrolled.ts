import { useEffect } from 'react';
import {
  errorBothQueryDefaultQuery,
  errorControlledToUncontrolled,
  errorUncontrolledToControlled,
} from '../messages';
import type { RuleGroupTypeAny } from '../types';
import { usePrevious } from './usePrevious';

export interface UseControlledOrUncontrolledParams {
  defaultQuery?: RuleGroupTypeAny;
  queryProp?: RuleGroupTypeAny;
}

let didWarnBothQueryDefaultQuery = false;
let didWarnUncontrolledToControlled = false;
let didWarnControlledToUncontrolled = false;

/**
 * Logs a warning when the component changes from controlled to uncontrolled,
 * vice versa, or both `query` and `defaultQuery` are provided.
 */
export const useControlledOrUncontrolled = ({
  defaultQuery,
  queryProp,
}: UseControlledOrUncontrolledParams) => {
  const prevQueryPresent = usePrevious(!!queryProp);

  useEffect(() => {
    // istanbul ignore else
    if (process.env.NODE_ENV !== 'production') {
      if (!!queryProp && !!defaultQuery && !didWarnBothQueryDefaultQuery) {
        console.error(errorBothQueryDefaultQuery);
        didWarnBothQueryDefaultQuery = true;
      } else if (
        prevQueryPresent === true &&
        !queryProp &&
        !!defaultQuery &&
        !didWarnControlledToUncontrolled
      ) {
        console.error(errorControlledToUncontrolled);
        didWarnControlledToUncontrolled = true;
      } else if (
        prevQueryPresent === false &&
        !!queryProp &&
        !defaultQuery &&
        !didWarnUncontrolledToControlled
      ) {
        console.error(errorUncontrolledToControlled);
        didWarnUncontrolledToControlled = true;
      }
    }
  }, [defaultQuery, prevQueryPresent, queryProp]);
};
