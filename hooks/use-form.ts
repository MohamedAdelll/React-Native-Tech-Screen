import {
  useCallback,
  useMemo,
  useState,
} from "react";

type ValidatorFn = (
  value: string,
  values: Record<string, string>
) => string | undefined;

type FieldConfig = {
  validate?: ValidatorFn | ValidatorFn[];
};

type FormConfig<Fields extends string> = Record<Fields, FieldConfig>;

export interface UseFormOptions<Fields extends string> {
  initialValues: Record<Fields, string>;
  config?: FormConfig<Fields>;
  onSubmit: (values: Record<Fields, string>) => void | Promise<void>;
}

export function useForm<Fields extends string>({
  initialValues,
  config,
  onSubmit,
}: UseFormOptions<Fields>) {
  const cfg = useMemo(() => (config ?? {}) as FormConfig<Fields>, [config]);
  const [values, setValues] = useState<Record<Fields, string>>(initialValues);
  const [touched, setTouched] = useState<Record<Fields, boolean>>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as Fields] = false;
      return acc;
    }, {} as Record<Fields, boolean>)
  );
  const [errors, setErrors] = useState<Record<Fields, string>>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as Fields] = "";
      return acc;
    }, {} as Record<Fields, string>)
  );
  const [submitting, setSubmitting] = useState(false);

  const runValidators = useCallback(
    (
      field: Fields,
      value: string,
      allValues: Record<Fields, string>
    ): string => {
      const cfgField = cfg[field];
      if (!cfgField?.validate) return "";
      const validators = Array.isArray(cfgField.validate)
        ? cfgField.validate
        : [cfgField.validate];
      for (const v of validators) {
        const msg = v(value, allValues);
        if (msg) return msg;
      }
      return "";
    },
    [cfg]
  );

  const validateAll = useCallback(
    (nextValues: Record<Fields, string>): Record<Fields, string> => {
      const newErrors: Record<Fields, string> = { ...errors };
      (Object.keys(nextValues) as Fields[]).forEach((field) => {
        newErrors[field] = runValidators(field, nextValues[field], nextValues);
      });
      return newErrors;
    },
    [errors, runValidators]
  );

  const setFieldValue = useCallback(
    (field: Fields, value: string) => {
      setValues((prev) => {
        const next = { ...prev, [field]: value };
        return next;
      });
      setErrors((prev) => ({
        ...prev,
        // Only re-validate if there was an error
        [field]: prev[field]
          ? runValidators(field, value, values)
          : prev[field],
      }));
    },
    [values, runValidators]
  );

  const setFieldTouched = useCallback((field: Fields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(async () => {
    // mark all touched
    setTouched((prev) => {
      const allTouched = { ...prev };
      (Object.keys(values) as Fields[]).forEach((f) => (allTouched[f] = true));
      return allTouched;
    });
    const newErrors = validateAll(values);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((e) => e);
    if (hasErrors) return;
    try {
      setSubmitting(true);
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  }, [values, validateAll, onSubmit]);

  function getTextInputProps(field: Fields) {
    return {
      value: values[field],
      onChangeText: (v: string) => setFieldValue(field, v),
      onBlur: () => setFieldTouched(field),
    };
  }

  return {
    values,
    errors,
    touched,
    submitting,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    getTextInputProps,
  };
}

// Common simple validators
export const required =
  (label: string): ValidatorFn =>
  (value) =>
    value.trim() ? undefined : `${label} is required`;
