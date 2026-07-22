const API = {
  AUTH: {
    LOGIN: "/auth/login",

    REGISTER: "/auth/register",
  },

  COMPANY: {
    GET_ALL: "/companies",

    CREATE: "/companies",

    UPDATE: (id) => `/companies/${id}`,

    DELETE: (id) => `/companies/${id}`,
  },

  CAMPAIGN: {
    GET_ALL: "/campaigns",

    CREATE: "/campaigns",
  },

  CONTENT: {
    GET_ALL: "/content",

    CREATE: "/content",
  },
};

export default API;
