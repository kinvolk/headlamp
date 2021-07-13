import '../../../i18n/config';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Editor, { loader } from '@monaco-editor/react';
import * as yaml from 'js-yaml';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { KubeObjectInterface } from '../../../lib/k8s/cluster';
import { getThemeName } from '../../../lib/themes';
import ConfirmButton from '../ConfirmButton';
import Loader from '../Loader';
import Tabs from '../Tabs';
import DocsViewer from './DocsViewer';
import SimpleEditor from './SimpleEditor';

const useStyle = makeStyles(theme => ({
  dialogContent: {
    height: '80%',
    // minHeight: '600px',
    overflowY: 'hidden',
  },
  terminalCode: {
    color: theme.palette.common.white,
  },
  terminal: {
    backgroundColor: theme.palette.common.black,
    height: '500px',
    width: '100%',
    overflow: 'scroll',
    marginTop: theme.spacing(3),
  },
  containerFormControl: {
    minWidth: '11rem',
  },
  scrollable: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

type KubeObjectIsh = Partial<KubeObjectInterface>;

interface EditorDialogProps extends DialogProps {
  item: KubeObjectIsh | null;
  onClose: () => void;
  onSave: ((...args: any[]) => void) | null;
  onEditorChanged?: ((newValue: string) => void) | null;
  saveLabel?: string;
  errorMessage?: string;
  title?: string;
}

export default function EditorDialog(props: EditorDialogProps) {
  const { item, onClose, onSave, onEditorChanged, saveLabel, errorMessage, title, ...other } =
    props;
  const editorOptions = {
    selectOnLineNumbers: true,
    readOnly: isReadOnly(),
  };
  const classes = useStyle();
  const [originalCode, setOriginalCode] = React.useState('');
  const [code, setCode] = React.useState(originalCode);
  const [previousVersion, setPreviousVersion] = React.useState('');
  const [error, setError] = React.useState('');
  const [docSpecs, setDocSpecs] = React.useState({});
  const { t } = useTranslation('resource');

  const [useSimpleEditor, setUseSimpleEditorState] = React.useState(() => {
    const localData = localStorage.getItem('useSimpleEditor');
    return localData ? JSON.parse(localData) : false;
  });

  function setUseSimpleEditor(data: boolean) {
    localStorage.setItem('useSimpleEditor', JSON.stringify(data));
    setUseSimpleEditorState(data);
  }

  React.useEffect(() => {
    if (!item) {
      return;
    }

    const itemCode = yaml.dump(item);
    if (itemCode !== originalCode) {
      setOriginalCode(itemCode);
    }

    if (!item.metadata) {
      return;
    }

    // Only change if the code hasn't been touched.
    if (previousVersion !== item.metadata!.resourceVersion || code === originalCode) {
      setCode(itemCode);
      if (previousVersion !== item.metadata!.resourceVersion) {
        setPreviousVersion(item!.metadata!.resourceVersion);
      }
    }
  }, [item, previousVersion, originalCode, code]);

  function isReadOnly() {
    return onSave === null;
  }

  function onChange(value: string | undefined): void {
    setCode(value as string);

    if (error && getObjectFromCode(value as string)) {
      setError('');
    }

    if (onEditorChanged) {
      onEditorChanged(value as string);
    }
  }

  function getObjectFromCode(code: string): KubeObjectInterface | null {
    try {
      const codeObj = yaml.load(code);
      return codeObj as KubeObjectInterface;
    } catch (e) {
      return null;
    }
  }

  function handleTabChange(tabIndex: number) {
    // Check if the docs tab has been selected.
    if (tabIndex !== 1) {
      return;
    }

    const codeObj = getObjectFromCode(code);

    const { kind, apiVersion } = (codeObj || {}) as KubeObjectInterface;
    if (codeObj === null || (!!kind && !!apiVersion)) {
      setDocSpecs({
        error: codeObj === null,
        kind,
        apiVersion,
      });
    }
  }

  function onUndo() {
    setCode(originalCode);
  }

  function handleSave() {
    // Verify the YAML even means anything before trying to use it.
    if (!getObjectFromCode(code)) {
      setError(t("Error parsing the code. Please verify it's valid YAML!"));
      return;
    }

    onSave!(getObjectFromCode(code));
  }

  function makeEditor() {
    const { i18n } = useTranslation();
    const [lang, setLang] = React.useState(i18n.language);

    const themeName = getThemeName();

    React.useEffect(() => {
      i18n.on('languageChanged', setLang);
      return () => {
        i18n.off('languageChanged', setLang);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // @todo: monaco editor does not support pt, ta, hi amongst various other langs.
    if (['de', 'es', 'fr', 'it', 'ja', 'ko', 'ru', 'zh-cn', 'zh-tw'].includes(lang)) {
      loader.config({ 'vs/nls': { availableLanguages: { '*': lang } } });
    }

    return useSimpleEditor ? (
      <Box paddingTop={2} height="100%">
        <SimpleEditor language="yaml" value={code} onChange={onChange} />
      </Box>
    ) : (
      <Box paddingTop={2} height="100%">
        <Editor
          language="yaml"
          theme={themeName === 'dark' ? 'vs-dark' : 'light'}
          value={code}
          options={editorOptions}
          onChange={onChange}
          height="600px"
        />
      </Box>
    );
  }

  const errorLabel = error || errorMessage;
  let dialogTitle = title;
  if (!dialogTitle && item) {
    const itemName = item.metadata?.name || t('New Object');
    dialogTitle = isReadOnly()
      ? t('resource|View: {{ itemName }}', { itemName })
      : t('resource|Edit: {{ itemName }}', { itemName });
  }

  const focusedRef = React.useCallback(node => {
    if (node !== null) {
      node.setAttribute('tabindex', '-1');
      node.focus();
    }
  }, []);

  return (
    <Dialog
      aria-busy={!item}
      maxWidth="lg"
      scroll="paper"
      fullWidth
      onBackdropClick={onClose}
      {...other}
      aria-labelledby="editor-dialog-title"
    >
      {!item ? (
        <Loader title={t('Loading editor')} />
      ) : (
        <React.Fragment>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <DialogTitle id="editor-dialog-title" ref={focusedRef}>
                {dialogTitle}
              </DialogTitle>
            </Grid>
            <Grid xs={6} item>
              <Box display="flex" flexDirection="row-reverse">
                <Box p={1}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={useSimpleEditor}
                          onChange={() => setUseSimpleEditor(!useSimpleEditor)}
                          name="useSimpleEditor"
                        />
                      }
                      label="Use minimal editor"
                    />
                  </FormGroup>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <DialogContent className={classes.dialogContent}>
            {isReadOnly() ? (
              makeEditor()
            ) : (
              <Tabs
                onTabChanged={handleTabChange}
                tabProps={{
                  centered: true,
                }}
                tabs={[
                  {
                    label: t('frequent|Editor'),
                    component: makeEditor(),
                  },
                  {
                    label: t('frequent|Documentation'),
                    component: (
                      <Box p={2} className={classes.scrollable} height="600px">
                        <DocsViewer docSpecs={docSpecs} />
                      </Box>
                    ),
                  },
                ]}
              />
            )}
          </DialogContent>
          <DialogActions>
            {!isReadOnly() && (
              <ConfirmButton
                disabled={originalCode === code}
                color="secondary"
                aria-label={t('frequent|Undo')}
                onConfirm={onUndo}
                confirmTitle={t('frequent|Are you sure?')}
                confirmDescription={t(
                  'This will discard your changes in the editor. Do you want to proceed?'
                )}
                // @todo: aria-controls should point to the textarea id
              >
                {t('frequent|Undo Changes')}
              </ConfirmButton>
            )}
            <div style={{ flex: '1 0 0' }} />
            {errorLabel && <Typography color="error">{errorLabel}</Typography>}
            <div style={{ flex: '1 0 0' }} />
            <Button onClick={onClose} color="primary">
              {t('frequent|Close')}
            </Button>
            {!isReadOnly() && (
              <Button
                onClick={handleSave}
                color="primary"
                disabled={originalCode === code || !!error}
                // @todo: aria-controls should point to the textarea id
              >
                {saveLabel || t('frequent|Save & Apply')}
              </Button>
            )}
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
}

export function ViewDialog(props: Omit<EditorDialogProps, 'onSave'>) {
  return <EditorDialog {...props} onSave={null} />;
}
