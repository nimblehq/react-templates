const useMock = {
  t: (k: string): string => {
    return k;
  },
  i18n: {},
};

export const useTranslation = (): { t: (k: string) => string; i18n: Record<string, never> } => useMock;
