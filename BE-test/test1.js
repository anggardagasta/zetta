/**
 * Direction:
 * Return a formatted array of sessions with list of classes & students
 *
 * Expected Result:
 * [
 *  {
 *    session_id: 1,
 *    time: '09:00',
 *    classes: [
 *      {
 *        class_id: 1,
 *        name: 'A',
 *        students: [
 *          { student_id: 1, name: 'Adi' },
 *          { student_id: 1, name: 'Budi' },
 *        ],
 *      },
 *      {
 *        class_id: 2,
 *        name: 'B',
 *        students: [
 *          { student_id: 3, name: 'Bayu' },
 *          { student_id: 4, name: 'Dharma' },
 *        ],
 *      },
 *    ],
 *  },
 *  {
 *    session_id: 2,
 *    time: '10:00',
 *    classes: [
 *      {
 *        class_id: 3,
 *        name: 'C',
 *        students: [
 *          { student_id: 5, name: 'Surya' },
 *          { student_id: 6, name: 'Maha' },
 *        ],
 *      },
 *      {
 *        class_id: 4,
 *        name: 'D',
 *        students: [
 *          { student_id: 7, name: 'Dede' },
 *          { student_id: 8, name: 'Edi' },
 *        ],
 *      },
 *    ],
 *  },
 * ];
 */

const sessions = [
    {session_id: 1, time: '09:00', student: {student_id: 1, name: 'Adi'}, class: {class_id: 1, name: 'A'}},
    {session_id: 2, time: '10:00', student: {student_id: 5, name: 'Surya'}, class: {class_id: 3, name: 'C'}},
    {session_id: 2, time: '10:00', student: {student_id: 8, name: 'Edi'}, class: {class_id: 4, name: 'D'}},
    {session_id: 2, time: '10:00', student: {student_id: 7, name: 'Dede'}, class: {class_id: 4, name: 'D'}},
    {session_id: 1, time: '09:00', student: {student_id: 3, name: 'Bayu'}, class: {class_id: 2, name: 'B'}},
    {session_id: 1, time: '09:00', student: {student_id: 2, name: 'Budi'}, class: {class_id: 1, name: 'A'}},
    {session_id: 1, time: '09:00', student: {student_id: 4, name: 'Dharma'}, class: {class_id: 2, name: 'B'}},
    {session_id: 2, time: '10:00', student: {student_id: 3, name: 'Maha'}, class: {class_id: 3, name: 'C'}},
];

function result(sessions) {
    const sessionMap = new Map();

    for (const entry of sessions) {
        const {session_id, time, class: classData, student} = entry;
        if (!sessionMap.has(session_id)) {
            sessionMap.set(session_id, {
                session_id,
                time,
                classes: new Map(),
            });
        }

        const session = sessionMap.get(session_id);

        if (!session.classes.has(classData.class_id)) {
            session.classes.set(classData.class_id, {
                class_id: classData.class_id,
                name: classData.name,
                students: [],
            });
        }

        const classEntry = session.classes.get(classData.class_id);
        classEntry.students.push({
            student_id: student.student_id,
            name: student.name,
        });
    }

    return Array.from(sessionMap.values()).map((session) => ({
        session_id: session.session_id,
        time: session.time,
        classes: Array.from(session.classes.values()),
    }));
}

console.log(JSON.stringify(result(sessions), null, 2));
