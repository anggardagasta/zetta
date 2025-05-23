/**
 * Direction:
 * Remove key that have null or undefined value
 *
 * Expected Result:
 * [
 *   { session_name: 'first test', classes: [{ students: [{ student_name: 'budi' }] }] },
 *   { classes: [{ class_name: 'second class', students: [{ student_name: 'adi' }] }] },
 * ]
 */
const data = [
    {session_name: 'first test', classes: [{class_name: undefined, students: [{student_name: 'budi'}]}]},
    {session_name: null, classes: [{class_name: 'second class', students: [{student_name: 'adi'}]}]},
];

function cleanObject(obj) {
    if (Array.isArray(obj)) {
        return obj.map(cleanObject);
    } else if (typeof obj === 'object' && obj !== null) {
        const cleaned = {};
        for (const [key, value] of Object.entries(obj)) {
            if (value !== null && value !== undefined) {
                cleaned[key] = cleanObject(value);
            }
        }

        return cleaned;
    }

    return obj;
}

function result(data) {
    return cleanObject(data);
}

console.log(JSON.stringify(result(data), null, 2));
