import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";

const NutritionInput = () => {
  return (
    <div className="grid w-full gap-2">
      <Textarea id="user-input" rows={3} className="resize-none field-sizing-fixed" />
      <Button>Add</Button>
    </div>
  );
};

export default NutritionInput;
