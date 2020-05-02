
function turnPage(list: any[], current: number, step: number) {
    return list.slice(
        (current - 1) * step,
        current * step
    );
}

export {
    turnPage
}