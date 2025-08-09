import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import { useIngestNutrition } from "@/api/nutrition/hooks";
import { useQueryClient } from "@tanstack/react-query";

const NutritionInput = () => {
  const client = useQueryClient();

  const [input, setInput] = useState("");

  const { mutate, isPending } = useIngestNutrition(client, {
    onSuccess: () => {
      setInput("");
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleAddClick = () => {
    mutate({ data: { input } });
  };

  return (
    <div className="grid w-full gap-2">
      <Textarea
        id="user-input"
        rows={3}
        className="resize-none field-sizing-fixed"
        value={input}
        onChange={handleInputChange}
        disabled={isPending}
        placeholder="Enter your food or activity input here..."
      />
      <Button onClick={handleAddClick} disabled={isPending}>
        Add
      </Button>
    </div>
  );
};

export default NutritionInput;
