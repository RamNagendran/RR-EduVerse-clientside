import React from "react";
import { Button } from "react-bootstrap";

function TablePagination(props: any) {
    const { table } = props;

    return (
        <React.Fragment>
            <div className="pagination d-flex align-items-center justify-content-between w-100" >
                <div className="d-flex align-items-center">
                    <div className="go-to-label" >Go to Page: </div>
                    <input
                        type="number"
                        className="control-input"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                    />
                    <select className="control-select"
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex align-items-center">
                    <span className="d-flex align-items-center">
                        <div className="info-current" >{table.getState().pagination.pageIndex + 1}</div>
                        <div className="info-total" >of{' '}{table.getPageCount()}</div>
                    </span>
                    <Button
                        style={{
                            background: "none", border: "none", outline: "none",
                            color: !table.getCanPreviousPage() ? "lightgrey" : "#000"
                        }}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'◀︎'}
                    </Button>
                    <Button
                        style={{
                            padding: 0,
                            background: "none", border: "none", outline: "none",
                            color: !table.getCanNextPage() ? "lightgrey" : "#000"
                        }}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'►'}
                    </Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TablePagination;