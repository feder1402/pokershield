import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import { RotateCcw } from "lucide-react";
import { Eye } from "lucide-react";

const ActionBar = ({ isModerator }: { isModerator: boolean }) => {
  return (
    <div>
      {isModerator && (
        <div className="flex items-center gap-4 w-full justify-end">
          <TooltipProvider>
            <ButtonGroup>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="secondary" size="sm">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset values</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="secondary" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reveal values</p>
                </TooltipContent>
              </Tooltip>
            </ButtonGroup>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default ActionBar;
