import isEmpty from "./isEmpty";

export default function removeEmpty(value: any): any {
    if (Array.isArray(value)) {
        return value.filter(item => !isEmpty(item)).map(removeEmpty);
    } else if (value instanceof Date) {
        return value; // Return Date objects as-is
    } else if (typeof value === 'object' && value !== null) {
        return Object.fromEntries(
            Object.entries(value)
                .filter(([_, v]) => !isEmpty(v))
                .map(([k, v]) => [k, removeEmpty(v)])
        );
    }
    return value;
}