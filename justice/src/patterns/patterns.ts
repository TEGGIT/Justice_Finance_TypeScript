import * as yup from "yup";

export const patterns = {
  birthday: {
    pattern: {
      value: /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/,
      message: "Введено некорректное значение"
    }
  },
  name: {
    pattern: {
      value: /^[а-яА-ЯЁ ё]+$/,
      message: 'Введено некорректное значение'
    },
    minLength: {
      value: 5,
      message: 'Введено некорректное значение'
    }
  },
  email: {
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Введено некорректное значение"
    }
  },
  city: {
    pattern: {
      value: /^[а-яА-ЯЁ ё]+$/,
      message: "Введено некорректное значение"
    },
    minLength: {
      value: 3,
      message: "Введено некорректное значение"
    }
  },
  phoneNumber: {
    pattern: {
      value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{5})(?: *x(\d+))?\s*$/,
      message: 'Введено некорректное значение'
    }
  },
  password: {
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      message: 'Неправильный формат пароля'
    }
  },
  sum: {
    maxLength: {
      value: 6,
      message: 'Лимит пополнения суммы 100000'
    },
    required: {
      value: true,
      message: "Обязательно"
    }
  },
  cardNumber: {
    minLength: {
      value: 16,
      message: 'Номер банковской карты введен неверно'
    },
    required: {
      value: true,
      message: "Обязательно"
    },
    maxLength: {
      value: 16,
      message: "Ошибка в вводе данных"
    }
  },
  date: {
    pattern: {
      value: /^(0[1-9]|1[0-2])\/\d{2}$/,
      message: "Ошибка в вводе данных"
    },
    required: {
      value: true,
      message: "Обязательно"
    },

  },
  cvc: {
    minLength: {
      value: 3,
      message: "Минимум 3 символа"
    },
    maxLength: {
      value: 3,
      message: 'Максимум 3 символа'
    },
    required: {
      value: true,
      message: "Обязательно"
    }
  },
  cardOrder: {
    pattern: {
      value: /(?<! )[a-zA-Z' ]{4,26}$/g,
      message: 'Введено некорректное значение'
    },
    required: {
      value: true,
      message: "Обязательно"
    },
    maxLength: {
      value : 25,
      message: 'Введено некорректное значение'
    },
  }

}

export const validationSchemaLogin = {
  password: yup
      .string()
      .typeError("Должно быть паролем")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/, "Введено некорректное значение")
      .required("Обязательно"),
  email: yup
      .string()
      .typeError("Ошибка email")
      .required("Обязательно")
      .email(`Введено некорректное значение`)
}

export const validationSchemaRegistration = {
  name: yup.string()
      .required("Обязательно")
      // .typeError("Должно быть строкой")
      .matches(/^[а-яА-ЯЁ ё]+$/, 'Введено некорректное значение')
      // .min(6, "Символ")
      .max(20, "Введено некорректное значение"),

  password: yup
      .string()
      .typeError("Должно быть паролем")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/, "Введено некорректное значение")
      .required("Обязательно"),

  confirmPassword: yup
      .string()
      .oneOf([yup.ref(`password`)], "Нет совпадений")
      .required("Обязательно"),
  email: yup.string().typeError("Введено некорректное значение").required("Обязательно").email(`Введено некорректное значение`)
}