export const phoneValidationPattern = /^[7-9][0-9]{9}$/;
export const emailValidationPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const checkValidDate = (bd: string | Date) => {
    const validyear: number = 2005;
    const applieddate: Date = new Date(bd);
    const appliedyear: number = applieddate.getFullYear();
    if (appliedyear > validyear) {
        return "Your Age must be greater then 18 years";
    } else {
        return true;
    }
}