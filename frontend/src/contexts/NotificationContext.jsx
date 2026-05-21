import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, message) => {
    const id = crypto.randomUUID();

    const newNotification = {
      id,
      type,
      message,
    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useNotification = () => useContext(NotificationContext);
