export function withComma(num) {
    let numWithComma = '';
    `${num}`.split('').reverse().map((n, i) => {
        if (i % 3 == 0 && i != 0) {
            numWithComma = ',' + numWithComma;
        }
        numWithComma = n + numWithComma;
    });
    return numWithComma;
}