import { IonBadge } from "@ionic/react";

interface TimelineItemProps {
    title: string;
    date: string;
    time: string;
    text: string;
    latest?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, date, time, text, latest = false }) => {
    return (
        <li className="relative mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-11 top-1 ring-8 ring-white">
                <svg aria-hidden="true" className="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{title} {latest ? <IonBadge color="success" className="ml-2">Latest</IonBadge> : null}</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{title} on {date}</time>
            <p className="mb-4 text-base font-normal text-gray-500">{text}</p>
            <time className="block mt-2 text-xs font-normal leading-none text-opacity-80 text-slate-400">{time}</time>
        </li>
    );
}

export default TimelineItem;