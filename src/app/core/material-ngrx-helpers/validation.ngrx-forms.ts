import { minLength, required } from "ngrx-forms/validation";

import { ValidationErrors } from "@angular/forms";
import { ValidationFn } from "ngrx-forms";

const ALL_NUMERIC = /^\d+$/;

function makeUnique(str: string) {
  return str
    .split("")
    .filter(function(item: any, i: any, ar: any) {
      return ar.indexOf(item) === i;
    })
    .join("");
}

const hasUniqueChars = (value: string | null): ValidationErrors => {
  const uniqueRequired = 5;

  if (value === null || value.length === 0) {
    return {};
  }

  if (makeUnique(value).length <= uniqueRequired) {
    return {
      hasUniqueChars: {
        unique: uniqueRequired,
        actual: value
      }
    };
  }

  return {};
};

const notNumeric = (value: string | null): ValidationErrors => {
  if (value === null || value.length === 0) {
    return {};
  }

  if (ALL_NUMERIC.test(value)) {
    return {
      notNumeric: {
        pattern: ALL_NUMERIC.toString(),
        actual: value
      }
    };
  }

  return {};
};

export function notEqualTo<T>(comparand: T) {
  return (value: T): ValidationErrors => {
    if (value !== comparand) {
      return {};
    }

    return {
      notEqualTo: {
        comparand,
        actual: value
      }
    };
  };
}


export const passwordValidators: ValidationFn<string>[] = [
  required,
  minLength(10),
  hasUniqueChars,
  notNumeric
];

