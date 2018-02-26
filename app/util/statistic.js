
export function groupBy(arr, groupCb) {
    return arr.reduce((groups, trade) => {
        const key = groupCb(trade);
        groups[key] = groups[key] || [];
        groups[key].push(trade);
        return groups;
    }, {});
}

export function groupByWeek(entity) {
    const year = entity.createdAt.getFullYear();
    const firstDayInYear = new Date(year, 0, 1);
    // Calculate week by measuring difference in days since 01. Jan of given year
    const week = Math.ceil((entity.createdAt - firstDayInYear) / 86400000 / 7);
    return `${year} CW${week}`;
}

export function groupByDay(entity) {
    const year = entity.createdAt.getFullYear();
    const month = entity.createdAt.getMonth();
    const day = entity.createdAt.getDate();
    return `${year}${month}${day}`;
}

export function groupByHour(entity) {
    const year = entity.createdAt.getFullYear();
    const month = entity.createdAt.getMonth();
    const day = entity.createdAt.getDate();
    const hour = entity.createdAt.getHour();
    return `${year}${month}${day}${hour}`;
}

