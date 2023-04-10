interface TimelineProps {
    children: React.ReactNode;
}

const Timeline: React.FC<TimelineProps> = ({ children }) => {
    return (
        <ol className="relative p-2 border-l border-gray-200">
            {children}
        </ol>
    );
}
export default Timeline;