import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Link from "next/link";

const SuccessPopup = ({ title, isSuccess, setIsSuccess }) => {
  return (
    <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
      <DialogContent
        className={
          "bg-white shadow-lg border-[0.5px] border-steel-blue w-full lg:max-w-1/2 py-20"
        }
      >
        {/* ================= ICON + TITLE ================ */}
        <div className="flex flex-col items-center justify-center gap-12">
          <img src={"/success-icon.png"} alt="icon" />

          <div className="text-center">
            <DialogTitle className={"text-2xl lg:text-[32px] font-medium"}>
              Notice Published Successfully
            </DialogTitle>
            <p className="text-center">
              Your notice “{title}” has been published and is now visible to all
              selected departments.
            </p>
          </div>
        </div>

        {/* ================= BUTTONS ================ */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* View Notice */}
          <DialogClose>
            <Link
              href={"/notices"}
              className="btn-rounded border-primary-blue text-primary-blue"
            >
              View Notice
            </Link>
          </DialogClose>

          {/* Create Another Notice */}
          <DialogClose>
            <div className="flex items-center justify-center btn-rounded border-danger text-danger">
              <Plus />
              <span>Create Another</span>
            </div>
          </DialogClose>

          {/* Close Popup */}
          <div className={"btn-rounded border-dark-navy text-dark-navy"}>
            <DialogClose>Close</DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessPopup;
