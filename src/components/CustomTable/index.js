import * as React from "react";
import "./styles.scss";

const CustomTable = ({ columns, data }) => {
  return (
    <div className="data-table">
      <table>
        <tbody>
          <tr className="table-header">{columns && columns.map((column) => <th key={column.id}>{column.name}</th>)}</tr>
          {data &&
            data.map((item) => (
              <tr className="table-data-row" key={Math.random() * 1000}>
                {columns && columns.map((column) => <td key={column.id}>{item[column.index]}</td>)}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
