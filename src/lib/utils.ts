import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateRandomId() {
    return Math.random().toString(36).slice(2, 9);
}

export function dateTimeAgo(date: Date) {
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime()) / 1000;

    const intervals = {
        year: diff / (60 * 60 * 24 * 365),
        month: diff / (60 * 60 * 24 * 30),
        week: diff / (60 * 60 * 24 * 7),
        day: diff / (60 * 60 * 24),
        hour: diff / (60 * 60),
        minute: diff / 60,
        second: diff,
    };

    switch (true) {
        case intervals.year >= 1: {
            const value = Math.floor(intervals.year);
            return `${value} year${value > 1 ? "s" : ""} ago`;
        }
        case intervals.month >= 1: {
            const value = Math.floor(intervals.month);
            return `${value} month${value > 1 ? "s" : ""} ago`;
        }
        case intervals.week >= 1: {
            const value = Math.floor(intervals.week);
            return `${value} week${value > 1 ? "s" : ""} ago`;
        }
        case intervals.day >= 1: {
            const value = Math.floor(intervals.day);
            return `${value} day${value > 1 ? "s" : ""} ago`;
        }
        case intervals.hour >= 1: {
            const value = Math.floor(intervals.hour);
            return `${value} hour${value > 1 ? "s" : ""} ago`;
        }
        case intervals.minute >= 1: {
            const value = Math.floor(intervals.minute);
            return `${value} minute${value > 1 ? "s" : ""} ago`;
        }
        case intervals.second >= 30:
            return Math.floor(intervals.second) + " seconds ago";
        default:
            return "just now";
    }
}
