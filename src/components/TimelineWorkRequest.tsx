import { IonSpinner } from "@ionic/react";
import useQueryWorkRequestComment from "../hooks/useQueryWorkRequestComment";
import { formatDayTimeFull, formatMonthYearFull } from "../libs/date-fns";
import { CommentInterface } from "../types/comment-type";
import Timeline from "./Timeline";
import TimelineItem from "./TimelineItem";

interface TimelineWorkRequestProps {
    ticketId: string;
}

const TimelineWorkRequest: React.FC<TimelineWorkRequestProps> = ({ ticketId }) => {
    const { isLoading, data, isError } = useQueryWorkRequestComment(ticketId);
    return (
        <Timeline>
            {isLoading ? (
                <IonSpinner name="crescent" />
            ) : (
                data && data?.data && data?.data?.length > 0 && !isError ? (
                    data.data.map((item: CommentInterface, index: number) => (
                        <TimelineItem key={`comment-${item.id}`} title={item.title} text={item.text} date={formatMonthYearFull(item.createdAt)} time={formatDayTimeFull(item.createdAt)} latest={index === 0} />
                    ))
                ) : null
            )}
        </Timeline>
    );
}

export default TimelineWorkRequest;