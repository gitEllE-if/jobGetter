export function descendingTimeCompare(a, b) {
    return (b.published_at < a.published_at) ? -1 : ((b.published_at > a.published_at) ? 1 : 0);
}

export function ascendingTimeCompare(a, b) {
    return (a.published_at < b.published_at) ? -1 : ((a.published_at > b.published_at) ? 1 : 0);
}

function salaryHandler(from, to, replace) {
    return from ? from : to ? to : replace;
}

export function descendingSalaryCompare(a, b) {
    let a_salary = salaryHandler(a.salary_from_rub, a.salary_to_rub, 0);
    let b_salary = salaryHandler(b.salary_from_rub, b.salary_to_rub, 0);
    return (b_salary - a_salary);
}

export function ascendingSalaryCompare(a, b) {
    let a_salary = salaryHandler(a.salary_from_rub, a.salary_to_rub, Infinity);
    let b_salary = salaryHandler(b.salary_from_rub, b.salary_to_rub, Infinity);
    return (a_salary - b_salary);
}

export const SORTER = {
    'descendingTime': descendingTimeCompare,
    'ascendingTime': ascendingTimeCompare,
    'descendingSalary': descendingSalaryCompare,
    'ascendingSalary': ascendingSalaryCompare
}