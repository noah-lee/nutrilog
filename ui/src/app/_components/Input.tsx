import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import { useIngestNutrition } from "@/api/nutrition/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowUpIcon } from "lucide-react";
import { formatISODateTime, getEndDate, getStartDate } from "@/utils/dates";

const Input = () => {
  const client = useQueryClient();

  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const { mutate, isPending } = useIngestNutrition(client, {
    onSuccess: (data) => {
      setInput("");
      setFeedback(data.feedback);
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleAddClick = () => {
    if (!input.trim()) return;
    mutate({
      data: {
        prompt: input,
        biometrics: { sex: "male", age: 33, weight: 65, height: 165 },
        start: formatISODateTime(getStartDate()),
        end: formatISODateTime(getEndDate()),
      },
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAddClick();
    }
  };

  return (
    <div className="flex flex-col gap-2 flex-1 min-w-[280px]">
      <div className="flex flex-col flex-1 gap-2 relative">
        <Textarea
          id="user-input"
          rows={3}
          className="grow resize-none field-sizing-fixed pr-16"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isPending}
          placeholder="Tell me what you ate or how you moved today — e.g., 'protein shake' or '30 min walk'"
        />
        <Button
          onClick={handleAddClick}
          disabled={isPending || !input.trim()}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-3xl cursor-pointer"
          size="icon"
        >
          <ArrowUpIcon />
        </Button>
      </div>
      {feedback && <p className="p-2 text-sm font-semibold">{feedback}</p>}
    </div>
  );
};

export default Input;
