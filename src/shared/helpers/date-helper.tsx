import * as dateFns from 'date-fns';

export const SecondInterval = 1000;
export const MinuteInterval = SecondInterval * 60;
export const HourInterval = MinuteInterval * 60;
export const DayInterval = HourInterval * 24;

export const setTimeZoneOffset = <T extends Date | null | undefined>(date: T, zoneOffset: number): T => {
    if (!date) return date;
    date.setTime(date.getTime() + zoneOffset * HourInterval);
    return date;
}

export const getUnixTimeWithoutTimezone = (date: Date): number => {
    if (!date) return 0;

    const dateWithoutTimezone = setTimeZoneOffset(date, 4)

    return Math.floor(dateWithoutTimezone.getTime() / 1000);
}

export const getDateWithTimezone = (date: number) => {
    if (!date) return date;

    const newDate = new Date(date * 1000);

    return setTimeZoneOffset(newDate, -4);
}

export const format = (
    strDate: number | string | undefined | Date,
    format: string,
    removeDots: boolean = false,
) => {
    if (!strDate)
        return strDate;

    const date = new Date(strDate);
    let dateResult = dateFns.format(date, format)
    if (removeDots)
        dateResult = dateResult.split('.').join('');

    return dateResult;
};