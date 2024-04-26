export const getStatusColor = (statusInput: string): string => {
  switch (statusInput) {
    case "Waiting Approve":
      return "danger";
    case "Approve":
      return "medium";
    case "Progress":
      return "warning";
    case "Send to the Requestor":
      return "light";
    case "Complete":
      return "success";
    case "Reject":
      return "danger";
    default:
      return "danger";
  }
};
