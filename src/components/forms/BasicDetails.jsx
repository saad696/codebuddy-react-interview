import { Col, Form, Input, Row } from "antd";
import StepperActions from "../common/StepperActions";
import helperService from "../../utils/helpers";
import { useEffect } from "react";
import { formTypes } from "../../utils/constants";

const BasicDetails = () => {
  const [basicDetailsForm] = Form.useForm();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(formTypes.STEP_TWO));
    if (data) {
      basicDetailsForm.setFieldsValue({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
      });
    }
  }, []);

  return (
    <>
      <Form className="p-8" name="basicDetails" form={basicDetailsForm} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Firstname"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your firstname!",
                },
                {
                  pattern: /^[A-Za-z]{3,50}$/,
                  message: "Please enter a valid alphabet string (3-50 characters)",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Lastname"
              name="lastName"
              rules={[
                {
                  pattern: /^[A-Za-z]{3,50}$/,
                  message: "Please enter a valid alphabet string (3-50 characters)",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 10,

              message: "Minimum 10 characters required",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <StepperActions
          onSubmit={helperService.onFormsSubmit}
          submitProps={{ form: basicDetailsForm, type: formTypes.STEP_TWO }}
        />
      </Form>
    </>
  );
};

export default BasicDetails;
