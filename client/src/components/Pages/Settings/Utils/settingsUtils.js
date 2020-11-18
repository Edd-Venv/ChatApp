/* eslint-disable implicit-arrow-linebreak */
export const changeUserName = (url, username, oldusername) =>
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      new_name: username,
      old_name: oldusername,
    }),
  });

export const changePassword = (url, password, oldPassword) =>
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      new_password: password,
      old_password: oldPassword,
    }),
  });

export const changePhoto = (url, formData) =>
  fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: formData,
  });

export const deleteAccount = (url) => {
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      _id: localStorage.getItem("_id"),
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.status === "ok") return null;
      return result;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};
