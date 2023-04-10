interface ItemWorkRequestDetailProps {
    title: string;
    content: string;
}

const ItemWorkRequestDetail: React.FC<ItemWorkRequestDetailProps> = ({ title, content = "" }) => {
    return (
        <div className="flex flex-col">
            <span className="text-base text-black">{title}</span>
            <span className="text-sm text-slate-400">{content}</span>
        </div>
    );
}

export default ItemWorkRequestDetail;