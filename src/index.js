function getReadableDigit(digit) {
    switch (digit) {
        case 1:
            return 'one';
        case 2:
            return 'two';
        case 3:
            return 'three';
        case 4:
            return 'four';
        case 5:
            return 'five';
        case 6:
            return 'six';
        case 7:
            return 'seven';
        case 8:
            return 'eight';
        case 9:
            return 'nine';
        default:
            return '';
    }
}

function getReadableRankedDigit(digit, rank) {
    if (digit === 0 && rank > 0) {
        return '';
    }
    switch (rank) {
        case 0:
            return getReadableDigit(digit);
        case 1:
            switch (digit) {
                case 2:
                    return 'twenty';
                case 3:
                    return 'thirty';
                case 4:
                    return 'forty';
                case 5:
                    return 'fifty';
                case 8:
                    return 'eighty';
                default:
                    return `${getReadableDigit(digit)}ty`;
            }
        case 2:
            return `${getReadableDigit(digit)} hundred`;
        case 3:
            return `${getReadableDigit(digit)} thousand`;
    }
}

function getReadableTeen(num) {
    switch (num) {
        case 10:
            return 'ten';
        case 11:
            return 'eleven';
        case 12:
            return 'twelve';
        case 13:
            return 'thirteen';
        case 15:
            return 'fifteen';
        case 18:
            return 'eighteen';
        default:
            return `${getReadableDigit(num % 10)}teen`;
    }
}

module.exports = function toReadable(number) {
    if (number === 0) {
        return 'zero';
    }
    let result = '';
    let rank = 0;
    let current = number;
    const lastTwoDigits = number % 100;
    if (lastTwoDigits >= 10 && lastTwoDigits <= 19) {
        result = getReadableTeen(lastTwoDigits);
        rank += 2;
        current = Math.floor(current / 100);
    }
    while (current !== 0) {
        const digit = current % 10;
        const readableDigit = getReadableRankedDigit(digit, rank);
        result =
            readableDigit === ''
                ? result
                : result === ''
                ? readableDigit
                : `${readableDigit} ${result}`;
        current = Math.floor(current / 10);
        rank += 1;
    }
    return result;
};
