import React, { useState } from "react";
import {
    getCoreRowModel,
    flexRender,
    useReactTable,
    createColumnHelper,
    SortingState,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import './scss/usr-table.scss';
import moment from "moment";

import AsceIcon from '../../../../assets/images/SVGs/asce-icon.svg';
import DescIcon from '../../../../assets/images/SVGs/desc-icon.svg';
import { Iuser } from "../types/personnel.type";
import { ROLE } from "../../../../common/constants";
import TablePagination from "./table-pagination";

interface ITableData {
    users: Iuser[];
}

const UsersTable: React.FC<ITableData> = (props) => {

    const { users } = props;
    const columnHelper = createColumnHelper<any>();
    const [sorting, setSorting] = useState<SortingState>([]);


    const handleNameWithId = (info: any): JSX.Element => {
        const overflowClass = { width: "250px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", marginBottom: "4px" }
        const { original = {} } = info?.cell?.row || {}
        return <>
            <div className="d-flex flex-column" >
                <div title={original.firstname + original.lastname} style={{ ...overflowClass }}>{original.firstname + " " + original.lastname}</div>
                <div style={{ color: "#a5a5a5", fontSize: "10px" }} >{original.user_id}</div>
            </div>
        </>
    }


    const handleUserRoles = (info: any): JSX.Element => {
        return (
            <div className="role" data-role={ROLE[info.getValue()]}>{ROLE[info.getValue()]}</div>
        )
    }

    const renderSortIcon = (isSorted: 'asc' | 'desc'): JSX.Element | null => {
        const sortIcons = {
            asc: <img alt="Ascending" src={AsceIcon} />,
            desc: <img alt="Descending" src={DescIcon} />
        };
        return sortIcons[isSorted] ?? null;
    };

    const columns: any = [
        columnHelper.accessor('fullName', {
            header: 'Full Name',
            cell: handleNameWithId
        }),
        columnHelper.accessor('username', {
            header: 'User Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('email', {
            header: 'Email Id',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('phone', {
            header: 'Phone Number',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('added_at', {
            header: 'Joined On',
            cell: (info: any) => moment(info.getValue(), 'DD-MM-YYYY HH:mm:ss').format('DD-MMM-YYYY')
        }),
        columnHelper.accessor('role_id', {
            header: 'Role',
            cell: handleUserRoles
        })
    ]

    const table = useReactTable({
        data: users,
        columns,
        state: {
            sorting,
        },
        initialState: {
            pagination: {
                pageSize: 20
            }
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return <div className="slideIn users-table " style={{ height: (window.innerHeight - 150) }}>
        <div className="table-wrapper" >
            <table className="w-100">
                <thead >
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const isSorted = header.column.getIsSorted() as 'asc' | 'desc';
                                return (
                                    <th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
                                        <div className={`${header.column.getCanSort() ? "d-flex align-items-center justify-content-between" : ""}`}
                                            style={{ cursor: header.column.getCanSort() ? "pointer" : "none" }}
                                            {...{ onClick: header.column.getToggleSortingHandler() }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {isSorted && (
                                                <div style={{ padding: "0px 4.5px 2px 4.5px" }}>
                                                    {renderSortIcon(isSorted)}
                                                </div>
                                            )}
                                        </div>
                                        {header.column.getCanResize() && (
                                            <div
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                                className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                                            ></div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => {
                        return (
                            <tr key={row.id} className={`table-row  ${(((index + 1) % 2 === 0)) ? "even-row" : "odd-row"}`}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id} style={{ width: cell.column.getSize(), padding: "0px 10px", height: "48px" }}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        {users && users.length > 0 && <TablePagination table={table} />}
    </div>
};

export default UsersTable;