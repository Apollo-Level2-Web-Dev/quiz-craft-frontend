import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addQuiz,
  resetQuizForm,
  resetQuizPublish,
  setCorrectOption,
  setDescription,
  setOption,
  setQuestion,
} from "../redux/features/quiz/quizSlice";
import toast from "react-hot-toast";
import { useAddQuizMutation } from "../redux/features/quiz/quizApi";

export function AddQuizForm() {
  const { moduleTitle, moduleId } = useAppSelector((state) => state.module);
  const [publishQuiz, { data, isLoading }] = useAddQuizMutation();
  console.log(data, isLoading);
  const { options, question, description, quiz } = useAppSelector(
    (state) => state.quiz
  );
  const dispatch = useAppDispatch();

  const handleAddQuiz = () => {
    dispatch(addQuiz(moduleId));
    //clear form
    dispatch(resetQuizForm());
  };

  const handlePublish = async () => {
    await publishQuiz(quiz);
    dispatch(resetQuizPublish());
    toast.success("Quiz Published Successfully");
  };

  return (
    <Card placeholder={""} color="transparent" shadow={false}>
      <Typography placeholder={""} variant="h4" color="blue-gray">
        {moduleTitle}
      </Typography>
      <Typography placeholder={""} color="gray" className="mt-1 font-normal">
        Please Add Your Quiz Below
      </Typography>
      <form className="mt-8 mb-2 w-full">
        <div className="mb-1 grid grid-cols-2 gap-4">
          <div>
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="mb-3"
            >
              Question
            </Typography>
            <Input
              value={question}
              onChange={(e) => {
                dispatch(setQuestion(e.target.value));
              }}
              crossOrigin={""}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div>
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="mb-3"
            >
              Description
            </Typography>
            <Input
              value={description}
              onChange={(e) => {
                dispatch(setDescription(e.target.value));
              }}
              crossOrigin={""}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div>
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="mb-3"
            >
              Option 1
            </Typography>
            <Input
              value={options[0]}
              crossOrigin={""}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onBlur={(e) => {
                dispatch(setOption(e.target.value));
              }}
            />
          </div>
          <div>
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="mb-3"
            >
              Option 2
            </Typography>
            <Input
              value={options[1]}
              crossOrigin={""}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onBlur={(e) => {
                dispatch(setOption(e.target.value));
              }}
            />
          </div>
          <div>
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="mb-3"
            >
              Option 3
            </Typography>
            <Input
              value={options[2]}
              onBlur={(e) => {
                dispatch(setOption(e.target.value));
              }}
              crossOrigin={""}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div>
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="mb-3"
            >
              Option 4
            </Typography>
            <Input
              value={options[3]}
              onBlur={(e) => {
                dispatch(setOption(e.target.value));
              }}
              crossOrigin={""}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div>
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="mb-3"
            >
              Correct Option
            </Typography>

            <Select
              //   value={correctOption}
              //   selected={(value) => {

              //   }}
              placeholder={""}
              onChange={(value) => {
                dispatch(setCorrectOption(value));
              }}
            >
              {options.map((option) => {
                return <Option value={option}>{option}</Option>;
              })}
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleAddQuiz} size="sm" placeholder={""}>
            Add Quiz
          </Button>
          <Button
            onClick={handlePublish}
            size="sm"
            placeholder={""}
            className="ml-4"
          >
            Publish
          </Button>
        </div>
      </form>
    </Card>
  );
}
