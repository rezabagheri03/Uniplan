// Persian number conversion
const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const toPersianNumbers = (str: string): string => {
    return str.replace(/[0-9]/g, (match) => persianDigits[parseInt(match)]);
};

export const toEnglishNumbers = (str: string): string => {
    return str.replace(/[۰-۹]/g, (match) => englishDigits[persianDigits.indexOf(match)]);
};

// Persian day names
export const persianDays = [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه‌شنبه',
    'چهارشنبه',
    'پنج‌شنبه',
    'جمعه'
];

export const persianMonths = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند'
];

// Date formatting
export const formatPersianDate = (date: Date): string => {
    const persianDate = new Intl.DateTimeFormat('fa-IR').format(date);
    return toPersianNumbers(persianDate);
};

export const formatPersianTime = (date: Date): string => {
    const timeString = date.toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return toPersianNumbers(timeString);
};

export const formatPersianDateTime = (date: Date): string => {
    const dateTime = date.toLocaleString('fa-IR');
    return toPersianNumbers(dateTime);
};

// Text utilities
export const addCommasToNumber = (num: number | string): string => {
    const numStr = num.toString();
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '،');
};

export const formatPrice = (price: number, currency = 'تومان'): string => {
    const formattedPrice = addCommasToNumber(price);
    return `${toPersianNumbers(formattedPrice)} ${currency}`;
};

// Text direction utilities
export const isRTL = (text: string): boolean => {
    const rtlChars = /[\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    return rtlChars.test(text);
};

export const getTextDirection = (text: string): 'rtl' | 'ltr' => {
    return isRTL(text) ? 'rtl' : 'ltr';
};

// URL slug utilities
export const createPersianSlug = (text: string): string => {
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\u0600-\u06FF\u0750-\u077Fa-zA-Z0-9-]/g, '');
};

// Search utilities
export const normalizeSearchTerm = (term: string): string => {
    return toEnglishNumbers(term.toLowerCase().trim());
};

export const matchesPersianSearch = (text: string, searchTerm: string): boolean => {
    const normalizedText = normalizeSearchTerm(text);
    const normalizedSearch = normalizeSearchTerm(searchTerm);
    return normalizedText.includes(normalizedSearch);
};

// Validation utilities
export const isPersianText = (text: string): boolean => {
    const persianPattern = /^[\u0600-\u06FF\u0750-\u077F\s]+$/;
    return persianPattern.test(text);
};

export const isValidPersianName = (name: string): boolean => {
    const namePattern = /^[\u0600-\u06FF\s]{2,50}$/;
    return namePattern.test(name.trim());
};

// Helper functions for forms
export const persianizeFormData = (data: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string') {
            result[key] = toPersianNumbers(value);
        } else {
            result[key] = value;
        }
    });

    return result;
};

export const depersianizeFormData = (data: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string') {
            result[key] = toEnglishNumbers(value);
        } else {
            result[key] = value;
        }
    });

    return result;
};

// Export default object
export default {
    toPersianNumbers,
    toEnglishNumbers,
    persianDays,
    persianMonths,
    formatPersianDate,
    formatPersianTime,
    formatPersianDateTime,
    addCommasToNumber,
    formatPrice,
    isRTL,
    getTextDirection,
    createPersianSlug,
    normalizeSearchTerm,
    matchesPersianSearch,
    isPersianText,
    isValidPersianName,
    persianizeFormData,
    depersianizeFormData,
};
