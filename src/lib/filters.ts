export const simpleFilter = <T extends Record<string, string>>(data: T[], query: string): T[] => {
    if (!query) {
        return data;
    }

    const lowercaseQuery = query.toLowerCase();

    const filteredData = data?.filter((item) => {
        for (const key in item) {
            if (typeof item[key] === 'string' && item[key].toLowerCase().includes(lowercaseQuery)) {
                return true;
            }
        }
        return false;
    });

    return filteredData;
};
