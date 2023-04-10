
import DataTable, { TableColumn } from "react-data-table-component";
import { ExpandableRowsComponent } from "react-data-table-component/dist/src/DataTable/types";

interface ReactDataTableProps {
    data: Array<any>;
    columns: TableColumn<any>[];
    pagination?: boolean;
    striped?: boolean;
    responsive?: boolean;
    dense?: boolean;
    highlightOnHover?: boolean;
    expandableRows?: boolean;
    expandableRowsComponent?: ExpandableRowsComponent<any>;
}

const Table: React.FC<ReactDataTableProps> = ({ data, columns, pagination, striped, responsive, dense, highlightOnHover, expandableRows, expandableRowsComponent, }) => {
    return (
        <DataTable className="shadow-sm" columns={columns} data={data} pagination={pagination} striped={striped} responsive={responsive} dense={dense} highlightOnHover={highlightOnHover} expandableRows={expandableRows} expandableRowsComponent={expandableRowsComponent} />
    );
}

export default Table;