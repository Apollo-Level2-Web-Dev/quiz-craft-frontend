/* eslint-disable @typescript-eslint/no-explicit-any */
import { Option, Select, Spinner } from "@material-tailwind/react";
import { setSelectedModule } from "../redux/features/module/moduleSlice";
import { setActiveStepper } from "../redux/features/stepper/stepperSlice";
import { useAppDispatch } from "../redux/hooks";
import { useGetAllModulesQuery } from "../redux/features/module/moduleApi";

export function SelectModule() {
  const dispatch = useAppDispatch();
  const { data: modules, isLoading } = useGetAllModulesQuery("");

  if (isLoading)
    return (
      <div className="flex justify-center h-full">
        <Spinner />
      </div>
    );

  return (
    <div className="w-72">
      <Select
        onChange={(value) => {
          console.log(value);
          const moduleTitle = modules.data.find(
            (module: any) => module._id === value
          ).title;
          dispatch(
            setSelectedModule({
              moduleTitle,
              moduleId: value,
            })
          );
          dispatch(setActiveStepper(1));
        }}
        placeholder={""}
        label="Select Module"
      >
        {/* <Option value="module">Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option> */}
        {modules?.data.map((module: any) => (
          <Option value={module._id}>{module.title}</Option>
        ))}
      </Select>
    </div>
  );
}
