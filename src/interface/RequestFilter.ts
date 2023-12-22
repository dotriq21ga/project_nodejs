export interface IFilter {
    sort?: string,
    sortDirection?: number,
    filterItems: IFilterItem[],
    searchText: string,
    skipCount: number,
    maxResultCount: number
}

export interface IFilterItem {
    propertyName: string,
    value: number,
    comparison: number
}