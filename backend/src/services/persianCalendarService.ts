// backend/src/services/persianCalendarService.ts

import moment from 'moment-jalaali'
moment.loadPersian({ usePersianDigits: true })

export function formatDate(date: Date): string {
    return moment(date).format('jYYYY/jMM/jDD')
}
