import Alert from "react-bootstrap/Alert";
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
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          variant={notification.type === "error" ? "danger" : notification.type}
          dismissible
          onClose={() => removeNotification(notification.id)}
        >
          {notification.message}
        </Alert>
      ))}
    </div>
  );
}

export default NotificationContainer;
