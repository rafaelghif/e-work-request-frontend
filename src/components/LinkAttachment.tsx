import { Link } from "react-router-dom";

interface LinkAttachmentProps {
    attachmentFile: string;
}

const LinkAttachment: React.FC<LinkAttachmentProps> = ({ attachmentFile }) => {
    const fileName = attachmentFile ? attachmentFile.split("/").pop() : "";
    const filePath = `${process.env.REACT_APP_PUBLIC}/files/${attachmentFile}`;
    return (
        <Link to={{ pathname: filePath }} rel="noreferrer" target="_blank" className="text-blue-500">
            {fileName}
        </Link>
    );
}

export default LinkAttachment;