import menuDown from '@iconify/icons-mdi/menu-down';
import menuSwap from '@iconify/icons-mdi/menu-swap';
import menuUp from '@iconify/icons-mdi/menu-up';
import refreshIcon from '@iconify/icons-mdi/refresh';
import squareIcon from '@iconify/icons-mdi/square';
import { Icon, InlineIcon } from '@iconify/react';
import { Button, IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Empty from './EmptyContent';
import { ValueLabel } from './Label';
import Loader from './Loader';

const useTableStyle = makeStyles(theme => ({
  headerCell: {
    fontWeight: 'bold',
    paddingBottom: theme.spacing(0.5),
  },
  table: {
    '& .MuiTableCell-root': {
      paddingLeft: '0',
      fontSize: '1rem',
    },
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root:last-child': {
        '& .MuiTableCell-root': {
          borderBottom: 'none',
        },
      },
    },
    '& .MuiTableCell-head': {
      color: theme.palette.tables.headerText,
      fontSize: '1.1rem',
    },
  },
}));

type sortFunction = (arg1: any, arg2: any) => number;

interface SimpleTableColumn {
  label: string;
  cellProps?: {
    [propName: string]: any;
  };
  sort?: sortFunction | boolean;
}

interface SimpleTableDatumColumn extends SimpleTableColumn {
  datum: string;
}

interface SimpleTableGetterColumn extends SimpleTableColumn {
  getter: (...args: any[]) => void;
}

export interface SimpleTableProps {
  columns: (SimpleTableGetterColumn | SimpleTableDatumColumn)[];
  data: {
    [dataProp: string]: any;
    [dataProp: number]: any;
  } | null;
  filterFunction?: (...args: any[]) => boolean;
  rowsPerPage?: number[];
  emptyMessage?: string;
  errorMessage?: string | null;
  defaultSortingColumn?: number;
}

interface ColumnSortButtonProps {
  isDefaultSorted: boolean;
  isIncreasingOrder: boolean;
  clickHandler: (isIncreasingOrder: boolean) => void;
}

function ColumnSortButtons(props: ColumnSortButtonProps) {
  const { t } = useTranslation('frequent');
  const { isDefaultSorted, isIncreasingOrder, clickHandler } = props;
  return isDefaultSorted ? (
    <IconButton
      aria-label={isIncreasingOrder ? t('sort up') : t('sort down')}
      size="small"
      onClick={() => clickHandler(!isIncreasingOrder)}
    >
      <Icon icon={isIncreasingOrder ? menuUp : menuDown} />
    </IconButton>
  ) : (
    <IconButton aria-label={t('sort swap')} size="small" onClick={() => clickHandler(true)}>
      <Icon icon={menuSwap} />
    </IconButton>
  );
}

export default function SimpleTable(props: SimpleTableProps) {
  const {
    columns,
    data,
    filterFunction = null,
    emptyMessage = null,
    errorMessage = null,
    defaultSortingColumn,
  } = props;
  const [page, setPage] = React.useState(0);
  const [currentData, setCurrentData] = React.useState(data);
  const [displayData, setDisplayData] = React.useState(data);
  const rowsPerPageOptions = props.rowsPerPage || [5, 10, 50];
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  const classes = useTableStyle();
  const [isIncreasingOrder, setIsIncreasingOrder] = React.useState(
    !defaultSortingColumn || defaultSortingColumn > 0
  );
  // We use a -1 value here if no sorting should be done by default.
  const [sortColIndex, setSortColIndex] = React.useState(
    defaultSortingColumn ? Math.abs(defaultSortingColumn) - 1 : -1
  );
  const { t } = useTranslation('resource');

  function handleChangePage(_event: any, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>
  ) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  React.useEffect(
    () => {
      if (currentData === data) {
        if (page !== 0) {
          setPage(0);
        }
        return;
      }

      // If the currentData is not up to date and we are in the first page, then update
      // it directly. Otherwise it will require user's intervention.
      if (!currentData || currentData.length === 0 || page === 0) {
        setCurrentData(data);
        setDisplayData(getSortData() || data);
      }
    },
    // eslint-disable-next-line
    [data, currentData]
  );

  function defaultSortingFunction(column: SimpleTableGetterColumn) {
    function defaultSortingReal(item1: any, item2: any) {
      const value1 = column.getter(item1);
      const value2 = column.getter(item2);

      let compareValue = 0;
      if (value1 < value2) {
        compareValue = -1;
      } else if (value1 > value2) {
        compareValue = 1;
      }

      return compareValue * (isIncreasingOrder ? 1 : -1);
    }

    return defaultSortingReal;
  }

  function getSortData() {
    if (!data || sortColIndex < 0) {
      return null;
    }
    let applySort = undefined;
    const columnAskingForSort = columns[sortColIndex];
    const sortFunction = columnAskingForSort?.sort;

    if (typeof sortFunction === 'boolean' && sortFunction) {
      setDisplayData(
        data.slice().sort(defaultSortingFunction(columnAskingForSort as SimpleTableGetterColumn))
      );
      return;
    }

    if (typeof sortFunction === 'function') {
      applySort = (arg1: any, arg2: any) => {
        const orderChanger = isIncreasingOrder ? 1 : -1;
        return (sortFunction(arg1, arg2) as number) * orderChanger;
      };
      const sortedData = data.slice().sort(applySort);
      return sortedData;
    }
  }

  React.useEffect(
    () => {
      const sortedData = getSortData();
      if (!sortedData) {
        return;
      }
      setDisplayData(sortedData);
    },
    // eslint-disable-next-line
    [sortColIndex, isIncreasingOrder, currentData]
  );

  function getPagedRows() {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }

  if (displayData === null) {
    if (!!errorMessage) {
      return <Empty color="error">{errorMessage}</Empty>;
    }

    return <Loader title={t('Loading table data')} />;
  }

  let filteredData = displayData;

  if (filterFunction) {
    filteredData = displayData.filter(filterFunction);
  }

  function sortClickHandler(isIncreasingOrder: boolean, index: number) {
    setIsIncreasingOrder(isIncreasingOrder);
    setSortColIndex(index);
  }

  return !currentData || currentData.length === 0 ? (
    <Empty>{emptyMessage || t('No data to be shown.')}</Empty>
  ) : (
    <React.Fragment>
      {
        // Show a refresh button if the data is not up to date, so we allow the user to keep
        // reading the current data without "losing" it or being sent to the first page
        currentData !== data && (
          <Box textAlign="center" p={2}>
            <Button
              variant="contained"
              startIcon={<Icon icon={refreshIcon} />}
              onClick={() => {
                setCurrentData(data);
              }}
            >
              {t('frequent|Refresh')}
            </Button>
          </Box>
        )
      }
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map(({ label, cellProps = {}, sort }, i) => {
              const { className = '', ...otherProps } = cellProps;
              return (
                <TableCell
                  key={`tabletitle_${i}`}
                  className={classes.headerCell + ' ' + className}
                  {...otherProps}
                >
                  {label}
                  {sort && (
                    <ColumnSortButtons
                      isIncreasingOrder={Boolean(isIncreasingOrder)}
                      isDefaultSorted={sortColIndex === i}
                      clickHandler={(isIncreasingOrder: boolean) =>
                        sortClickHandler(isIncreasingOrder, i)
                      }
                    />
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.length > 0 ? (
            getPagedRows().map((row: any, i: number) => (
              <TableRow key={i}>
                {columns.map((col, i) => (
                  <TableCell key={`cell_${i}`}>
                    {i === 0 && row.color && (
                      <React.Fragment>
                        <InlineIcon icon={squareIcon} color={row.color} height="15" width="15" />
                        &nbsp;
                      </React.Fragment>
                    )}
                    {'datum' in col ? row[col.datum] : col.getter(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Empty>{t('No data matching the filter criteria.')}</Empty>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {filteredData.length > rowsPerPageOptions[0] && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  metadataCell: {
    width: '100%',
    verticalAlign: 'top',
    fontSize: '1rem',
  },
  metadataNameCell: {
    fontSize: '1rem',
    textAlign: 'left',
    maxWidth: '50%',
    minWidth: '10rem',
    verticalAlign: 'top',
    paddingLeft: '0',
    paddingRight: '0',
    color: theme.palette.text.secondary,
  },
  table: {
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root:last-child': {
        '& .MuiTableCell-root': {
          borderBottom: 'none',
        },
      },
    },
  },
}));

export interface NameValueTableRow {
  name: string | JSX.Element;
  value?: string | JSX.Element | JSX.Element[];
  hide?: boolean;
}

interface NameValueTableProps {
  rows: NameValueTableRow[];
}

function Value({
  value,
}: {
  value: string | JSX.Element | JSX.Element[] | undefined;
}): JSX.Element | null {
  if (typeof value === 'undefined') {
    return null;
  } else if (typeof value === 'string') {
    return <ValueLabel>{value}</ValueLabel>;
  } else if (Array.isArray(value)) {
    return (
      <>
        {value.map((val, i) => (
          <Value value={val} key={i} />
        ))}
      </>
    );
  } else {
    return value;
  }
}

export function NameValueTable(props: NameValueTableProps) {
  const classes = useStyles();
  const { rows } = props;

  return (
    <Table className={classes.table}>
      <TableBody>
        {rows.map(({ name, value, hide = false }, i) => {
          if (hide) return null;
          return (
            <TableRow key={i}>
              <TableCell className={classes.metadataNameCell}>{name}</TableCell>
              <TableCell scope="row" className={classes.metadataCell}>
                <Value value={value} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
