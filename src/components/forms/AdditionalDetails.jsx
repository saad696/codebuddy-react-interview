import { Checkbox, Form, Input, Select, message } from "antd";
import StepperActions from "../common/StepperActions";
import { formTypes } from "../../utils/constants";
import { currentStep } from "../../signals/form.signals";
import { useState } from "react";

const POST_URL = "https://codebuddy.review/submit";

const AdditionalDetails = () => {
  const [additionalDetailsForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const prefixSelector = (
    <Form.Item name="countryCode" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Select.Option value="91">+91</Select.Option>
        <Select.Option value="1">+1</Select.Option>
      </Select>
    </Form.Item>
  );

  const onSubmit = async () => {
    // setLoading(true);
    try {
      // checking first if additional details form is valid or not
      await additionalDetailsForm.validateFields();

      // getting step one data and checking if it exists
      const stepOneData = JSON.parse(localStorage.getItem(formTypes.STEP_ONE));

      if (!stepOneData) {
        currentStep.value = 0;
        message.error("Please complete step one to submit the form");
      }

      // getting step two data and checking if it exists
      const stepTwoData = JSON.parse(localStorage.getItem(formTypes.STEP_TWO));

      if (!stepTwoData) {
        currentStep.value = 1;
        message.error("Please complete step two to submit the form");
      }

      const res = await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify({
          ...stepOneData,
          ...stepTwoData,
          ...additionalDetailsForm.getFieldsValue(),
        }),
      });

      const response = await res.json();

      if (response.message === "Success") {
        localStorage.removeItem(formTypes.STEP_ONE);
        localStorage.removeItem(formTypes.STEP_TWO);
        currentStep.value = 0;
        message.success("Details submitted successfully");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Please fill the form fields or please try again later.");
    }
  };

  return (
    <>
      <Form
        initialValues={{ countryCode: "91" }}
        className="p-8"
        name="additionalDetails"
        form={additionalDetailsForm}
        layout="vertical"
      >
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              pattern: /^\d{10,12}$/,
              message: "Please enter valid phone number!",
            },
          ]}
        >
          <Input addonBefore={prefixSelector} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>

        <StepperActions loading={loading} onSubmit={onSubmit} />
      </Form>
    </>
  );
};

export default AdditionalDetails;
