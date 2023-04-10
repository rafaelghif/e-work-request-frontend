import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

/**
 * Formats a string date as "yyyy-MM-dd HH:mm" format in Indonesian locale.
 * 
 * @param stringDate - The string representation of the date to format.
 * 
 * @returns The formatted date string.
 */
export const formatDateTime = (stringDate: string) => {
    return format(parseISO(stringDate), "yyyy-MM-dd HH:mm", { locale: id });
}

/**
 * Formats a string date as "yyyy-MM-dd" format in Indonesian locale.
 * 
 * @param stringDate - The string representation of the date to format.
 * 
 * @returns The formatted date string.
 */
export const formatDate = (stringDate: string) => {
    return format(parseISO(stringDate), "yyyy-MM-dd", { locale: id });
}

/**
 * Formats a string date as "yyyy-MM-dd" format in Indonesian locale.
 * 
 * @param stringDate - The string representation of the date to format.
 * 
 * @returns The formatted date string.
 */
export const formatMonthYearFull = (stringDate: string) => {
    return format(parseISO(stringDate), "LLLL wo, yyyy");
}

export const formatDayTimeFull = (stringDate: string) => {
    return format(parseISO(stringDate), "EEEE, hh:mm a");
}