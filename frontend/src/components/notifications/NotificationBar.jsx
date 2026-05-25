import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

function NotificationBar({ notifications, removeNotification }) {
  return (
    <>
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
    </>
  );
}
NotificationBar.propTypes = {
  notifications: PropTypes.array.isRequired,
  removeNotification: PropTypes.func.isRequired,
};
export default NotificationBar;
