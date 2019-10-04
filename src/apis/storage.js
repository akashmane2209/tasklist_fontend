const key = "taskList";

export const saveUser = (userId, token) => {
  localStorage.setItem(key, JSON.stringify({ userId, token }));
};

export const deleteUser = () => {
  localStorage.removeItem(key);
};

export const getUserId = () => {
  const userId = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)).userId
    : false;
  return userId;
};

export const getAuthToken = () => {
  const token = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)).token
    : null;
  return token;
};

export const getTaskList = () => {
  const taskList = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
  return taskList;
};
