import { message } from "antd";
import { currentStep } from "../signals/form.signals";
import { formActions } from "./constants";

const helperService = {
  onFormsSubmit: async (form, type, action) => {
    try {
      await form.validateFields();
      localStorage.setItem(type, JSON.stringify(form.getFieldsValue()));

      if (action === formActions.SAVE_NEXT) {
        currentStep.value = currentStep.value + 1;
      }
    } catch (error) {
      message.error("Please complete the form as required to proceed.");
    }
  },
};

export default helperService;
