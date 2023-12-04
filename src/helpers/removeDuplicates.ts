/* eslint-disable @typescript-eslint/no-explicit-any */
/* trunk-ignore-all(prettier) */
export const removeDuplicates = (array:any) => {
    const seen = new Set();
    return array.filter((item: { value: string; }) => {
        const lowercasedValue = item.value.toLowerCase();
        if (seen.has(lowercasedValue)) {
            return false;
        }
        seen.add(lowercasedValue);
        return true;
    });
};