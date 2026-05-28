import NotificationBar from "./NotificationBar";
import { useNotification } from "../../contexts/NotificationContext";

function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 9999,
        width: "320px",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <NotificationBar
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </div>
  );
}

export default NotificationContainer;
