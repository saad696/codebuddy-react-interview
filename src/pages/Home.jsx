import { Icon } from "@iconify/react";
import { Steps } from "antd";
import { currentStep } from "../signals/form.signals";
import { AdditionalDetails, Auth, BasicDetails } from "../components";
import { Link } from "react-router-dom";

const formSteps = [
  {
    title: "Step 1",
    content: <Auth />,
  },
  {
    title: "Step 2",
    content: <BasicDetails />,
  },
  {
    title: "Step 3",
    content: <AdditionalDetails />,
  },
];

const Home = () => {
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-4 flex items-center text-4xl font-bold">
        <Icon icon="mdi:home" className="mr-2" />
        Home
      </h1>

      <h2 className="mb-3 text-2xl">Welcome to the home page!</h2>

      {/* stepper */}
      <Steps current={currentStep.value} items={formSteps} />
      <div>{formSteps[currentStep.value].content}</div>
      {/* stepper */}

      <Link to="/posts" className="flex items-center justify-end text-blue-600 hover:underline">
        View Posts
        <Icon icon="mdi:arrow-right" className="ml-2" />
      </Link>
    </div>
  );
};

export default Home;
