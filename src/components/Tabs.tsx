/* eslint-disable @typescript-eslint/no-explicit-any */
import { Square3Stack3DIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
    Typography
} from "@material-tailwind/react";
import React from "react";
import { useGetAllModulesQuery } from "../redux/features/module/moduleApi";
import { AddQuizForm } from "./AddQuizForm";
import { QuizCard } from "./QuizCard";
import { QuizModal } from "./QuizModal";
import { SelectModule } from "./SelectModule";
import { DefaultStepper } from "./Stepper";

export function TabsWithIcon() {
  const { data: modules, isLoading } = useGetAllModulesQuery("");
  const steps = [
    {
      value: 0,
      name: "Select Module",
      component: (
        <div className="flex justify-center m-12">
          <SelectModule />
        </div>
      ),
    },
    {
      value: 1,
      name: "Add Quiz",
      component: (
        <div className="p-4">
          <AddQuizForm />
        </div>
      ),
    },
  ];

  const data = [
    {
      label: "Quiz List",
      value: "quiz-list",
      icon: Square3Stack3DIcon,
      desc: (
        <>
          {modules?.data.map((module: any) => (
            <QuizCard>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                {module.title}
              </Typography>

              <div className="flex justify-end">
                <QuizModal moduleId={module._id} />
              </div>
            </QuizCard>
          ))}
        </>
      ),
    },
    {
      label: "Add Quiz",
      value: "add-quiz",
      icon: UserCircleIcon,
      desc: (
        <QuizCard>
          <DefaultStepper steps={steps} />
        </QuizCard>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <Tabs value="quiz-list">
      <TabsHeader placeholder={""}>
        {data.map(({ label, value, icon }) => (
          <Tab placeholder={""} key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody placeholder={""}>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
