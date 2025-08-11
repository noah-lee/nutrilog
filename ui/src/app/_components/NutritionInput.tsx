import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import { useIngestNutrition } from "@/api/nutrition/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowUpIcon } from "lucide-react";

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
    <div className="grid w-full gap-2 relative">
      <Textarea
        id="user-input"
        rows={3}
        className="resize-none field-sizing-fixed pr-16"
        value={input}
        onChange={handleInputChange}
        disabled={isPending}
        placeholder="Tell me what you ate or how you moved today — e.g., 'protein shake' or '30 min walk'"
      />
      <Button
        onClick={handleAddClick}
        disabled={isPending || !input.trim()}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-3xl"
        size="icon"
      >
        <ArrowUpIcon />
      </Button>
    </div>
  );
};

export default NutritionInput;
