import React, { createContext } from "react";

const TableContext = createContext(undefined);

interface TableProps {
  className?: string;
  children: React.ReactNode;
}

interface TableBodyProps<T> {
  data: T[] | null | undefined;
  render: (item: T, index: number) => React.ReactNode;
}

interface CommonProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className = "" }: TableProps) {
  return (
    <TableContext.Provider value={undefined}>
        <div
          className={`rounded-lg border border-gray-200 overflow-x-auto ${className}`}
        >
          <table className="min-w-full divide-y divide-gray-200">
            {children}
          </table>
        </div>
    </TableContext.Provider>
  );
}

function Header({ children, className = "" }: CommonProps) {
  return (
    <thead className={`bg-gray-50  ${className}`}>
      <tr>{children}</tr>
    </thead>
  );
}

function Heading({ children, className = "" }: CommonProps) {
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}

function Body<T>({ data, render }: TableBodyProps<T>) {
  if (!data || data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            className="px-6 py-4 text-center text-sm text-gray-500"
            colSpan={10}
          >
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="bg-white  divide-y divide-gray-200">
      {data.map(render)}
    </tbody>
  );
}

function Footer({ children, className = "" }: CommonProps) {
  return (
    <tfoot className={`bg-gray-50 ${className}`}>
      <tr>
        <td colSpan={100} className="px-6 py-3">
          {children}
        </td>
      </tr>
    </tfoot>
  );
}

Table.Header = Header;
Table.Heading = Heading;
Table.Body = Body;
Table.Footer = Footer;
