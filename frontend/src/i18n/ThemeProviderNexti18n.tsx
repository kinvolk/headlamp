import { deDE, enUS, esES, hiIN, ptPT } from '@material-ui/core/locale';
import { createTheme, Theme, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function getLocale(locale: string): typeof enUS {
  const LOCALES = {
    en: enUS,
    pt: ptPT,
    es: esES,
    de: deDE,
    ta: enUS, // @todo: material ui needs a translation for this.
    hi: hiIN,
  };
  type LocalesType = 'en' | 'pt' | 'es' | 'ta' | 'de' | 'hi';
  return locale in LOCALES ? LOCALES[locale as LocalesType] : LOCALES['en'];
}

/** Like a ThemeProvider but uses reacti18next for the language selection
 *  Because Material UI is localized as well.
 */
const ThemeProviderNexti18n: React.FunctionComponent<{ theme: Theme }> = props => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    i18n.on('languageChanged', setLang);
    return () => {
      i18n.off('languageChanged', setLang);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = createTheme(props.theme, getLocale(lang));

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default ThemeProviderNexti18n;
