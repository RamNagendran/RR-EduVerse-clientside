const PERMISSIONS: { [key: string]: number } = {
    'READ': 1,
    'CREATE': 2,
    'UPDATE': 4,
    'DELETE': 8
}

const ROLE: { [key: number]: string } = {
    101: 'ADMIN',
    102: 'TRAINER',
    103: 'COUNSELOR',
    104: 'PLACEMENT'
}

const MENUS: {[key: number]: string} = {
    201: 'COURSE',
    202: 'TASKS',
    203: 'BATCH',
    204: 'DASHBOARD',
    205: 'STUDENTS',
    206: 'PERSONNEL',
    207: 'AUTHORIZATION'
}
const MENU_DESCRIPTIONS: {[key: number]: string} = {
    201: 'Manage course content, curriculum design, and learning resources. Enables creation, updating, and tracking of educational programs.',
    202: 'Task management system for tracking assignments, project progress, and individual/team responsibilities. Facilitates workflow optimization.',
    203: 'Batch management and tracking, including student grouping, scheduling, and performance monitoring across different learning cohorts.',
    204: 'Comprehensive analytics dashboard providing insights into system performance, user activities, and key organizational metrics.',
    205: 'Student profile management, tracking academic progress, personal information, and comprehensive student lifecycle management.',
    206: 'Personnel management system for handling employee records, roles, performance tracking, and organizational workforce insights.',
    207: 'Role-based access control and permission management. Configures user roles, defines access levels, and ensures system security.'
};

const getRoleDescription = (role: string): string => {
    switch (role) {
        case 'ADMIN':
            return 'Comprehensive system oversight with unrestricted access to manage users, permissions, and platform configurations. Supports system health monitoring and facilitates organizational development.';
        case 'TRAINER':
            return 'Dedicated to course management, student progress tracking, and content creation. Enables comprehensive learning experience design and student performance optimization.';
        case 'COUNSELOR':
            return 'Focused on student counseling, providing comprehensive support through detailed progress reports and personalized guidance. Ensures holistic student well-being and academic success.';
        case 'STUDENT':
            return 'Access to learning materials, assignments, and personal progress tracking';
        case 'PLACEMENT':
            return 'Manages job market interactions, monitors candidate progression, and analyzes placement outcomes. Enables targeted career guidance and successful student-industry integration.';
        default:
            return `${role} Role`;
    }
};

export { PERMISSIONS, ROLE, MENUS, MENU_DESCRIPTIONS, getRoleDescription }