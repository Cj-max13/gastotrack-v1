export function formatCurrency(amount) {
    const value = Number(amount);

    return `₱${value.toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}