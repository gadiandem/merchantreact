export default function isEmpty(value: any) {
    return (
        value === undefined ||
        value === null ||
        value === '' ||
        (typeof value === 'object' && !(value instanceof Date) && Object.keys(value).length === 0)
    );
}