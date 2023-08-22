
import { ComponentProps } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { ConditionalStyles, ExpandableRowsComponent } from "react-data-table-component/dist/src/DataTable/types";

interface ReactDataTableProps {
    data: Array<any>;
    columns: TableColumn<any>[];
    pagination?: boolean;
    striped?: boolean;
    responsive?: boolean;
    dense?: boolean;
    highlightOnHover?: boolean;
    expandableRows?: boolean;
    conditionalRowStyles?: ConditionalStyles<any>[];
    expandableRowsComponent?: ExpandableRowsComponent<any>;
    expandableRowsComponentProps?: ComponentProps<any>;
}

const Table: React.FC<ReactDataTableProps> = ({ data, columns, pagination, striped, responsive, dense, highlightOnHover, expandableRows, conditionalRowStyles, expandableRowsComponent, expandableRowsComponentProps }) => {
    return (
        <DataTable className="shadow-sm" columns={columns} conditionalRowStyles={conditionalRowStyles} data={data} pagination={pagination} striped={striped} responsive={responsive} dense={dense} highlightOnHover={highlightOnHover} expandableRows={expandableRows} expandableRowsComponent={expandableRowsComponent} expandableRowsComponentProps={expandableRowsComponentProps} />
    );
}

export default Table;