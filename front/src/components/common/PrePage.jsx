import { Page } from "./Page";
import { useState } from "react";

export function PrePage() {

    const [pagination, setPagination] = useState({
        totalItems: 0,
        itemsPerPage: 4,
        range: 2,
        totalPage: this.totalItems/this
        currentPage: getCurrentPage(),
        rangeArr: getPageRange(this.currentPage, )
    });

    function getCurrentPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get("page")) || 1;
        return page;
    }

    function getPageRange(currentPage, totalPages, rangeSize = 4) {

        const half = Math.floor(rangeSize / 2);
        let start = Math.max(1, currentPage - Math.floor(half));
        let end = currentPage + half;

        if (currentPage + half > totalPages) {
            end = totalPages;
            const diff = currentPage + half - totalPages;
            start = Math.max(1, start - diff);
        } else if (currentPage - half < start) {
            const diff = half - currentPage;
            end = end + diff;
        }

        const rangeArr = [];

        for (let i = start; i < end + 1; i++) {
            rangeArr.push(i);
        }
        if (start !== 1) {
            // creation de : 1 ...
            rangeArr.unshift(1);
            if (start > 2) rangeArr.splice(1, 0, '...');
        }
        if (end !== totalPages) {
            // creation de : ... totalPages
            if (end < totalPages - 1) rangeArr.push('...');
            rangeArr.push(totalPages);
        }

        return rangeArr;

    }

    return (
        <>
            <Page />
        </>
    );
}