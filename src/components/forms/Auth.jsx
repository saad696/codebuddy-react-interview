import { Form, Input } from "antd";

import { StepperActions } from "../";
import helperService from "../../utils/helpers";
import { useEffect } from "react";
import { formTypes } from "../../utils/constants";

const Auth = () => {
  const [authForm] = Form.useForm();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(formTypes.STEP_ONE));
    if (data) {
      authForm.setFieldsValue({ emailId: data.emailId, password: data.password });
    }
  }, []);

  return (
    <>
      <Form className="p-8" name="auth" form={authForm} layout="vertical">
        <Form.Item
          label="Email"
          name="emailId"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern:
                /^(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})(?=(?:.*[0-9]){2})(?=(?:.*\W){2})(?!.* ).{8,16}$/,

              message:
                "Password must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <StepperActions
          onSubmit={helperService.onFormsSubmit}
          submitProps={{ form: authForm, type: formTypes.STEP_ONE }}
        />
      </Form>
    </>
  );
};

export default Auth;
