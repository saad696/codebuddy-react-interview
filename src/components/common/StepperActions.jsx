import { currentStep } from "../../signals/form.signals";
import { Button } from "antd";
import { formActions } from "../../utils/constants";

const prev = () => {
  currentStep.value = currentStep.value - 1;
};

const StepperActions = ({ onSubmit, submitProps = null, loading = false }) => {
  return (
    <>
      <Button
        loading={loading}
        htmlType="submit"
        type="primary"
        onClick={() => onSubmit(submitProps?.form, submitProps?.type, formActions.SAVE)}
      >
        Save
      </Button>

      <Button
        loading={loading}
        className="mx-4"
        type="primary"
        disabled={currentStep.value === 2}
        onClick={() => onSubmit(submitProps?.form, submitProps?.type, formActions.SAVE_NEXT)}
      >
        Save Next
      </Button>

      {currentStep.value > 0 && (
        <Button loading={loading} onClick={prev}>
          Previous
        </Button>
      )}
    </>
  );
};

export default StepperActions;
