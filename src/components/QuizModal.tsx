/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useGetAllQuizByModuleIdQuery } from "../redux/features/quiz/quizApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentQuestionIndex } from "../redux/features/quiz/quizSlice";

export function QuizModal({ moduleId }: { moduleId: string }) {
  const dispatch = useAppDispatch();
  const { currentQuestionIndex } = useAppSelector((state) => state.quiz);
  const { data: quizes, isLoading } = useGetAllQuizByModuleIdQuery(moduleId);
  console.log(quizes, isLoading);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Button
        size={"sm"}
        placeholder={""}
        onClick={handleOpen}
        variant="gradient"
      >
        Start Quiz
      </Button>
      <Dialog placeholder={""} open={open} handler={handleOpen}>
        <DialogBody placeholder={""}>
          {quizes?.data.map(
            (quiz: any, index: number) =>
              currentQuestionIndex === index && (
                <div className="">
                  <Typography placeholder={""} variant="h5">
                    {" "}
                    {quiz.question}
                  </Typography>
                </div>
              )
          )}

          <div className="grid grid-cols-2 gap-4 mt-4">
            {quizes?.data[currentQuestionIndex]?.options.map((option: any) => (
              <Button
                size={"sm"}
                placeholder={""}
                variant={
                  (quizes?.data[currentQuestionIndex]?.correctOption ===
                    option &&
                    "filled") ||
                  "outlined"
                }
                color={
                  (quizes?.data[currentQuestionIndex]?.correctOption ===
                    option &&
                    "green") ||
                  "gray"
                }
              >
                {option}
              </Button>
            ))}
          </div>
        </DialogBody>

        <DialogFooter placeholder={""}>
          <div className=" flex justify-end space-x-4">
            {currentQuestionIndex > 0 && (
              <Button
                onClick={() => {
                  dispatch(setCurrentQuestionIndex(currentQuestionIndex - 1));
                }}
                size={"sm"}
                placeholder={""}
                variant="gradient"
              >
                Previous
              </Button>
            )}

            {(currentQuestionIndex < quizes.data.length - 1 && (
              <Button
                onClick={() => {
                  dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
                }}
                size={"sm"}
                placeholder={""}
                variant="gradient"
              >
                Next
              </Button>
            )) || (
              <Button size={"sm"} placeholder={""} variant="gradient">
                Submit
              </Button>
            )}
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
