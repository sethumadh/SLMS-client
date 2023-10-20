import { Button } from "@/components/ui/button"

type ApplicationFooterSection = {
  showPrevBtn: boolean
  prevText: string
  prevOnClick: () => void
  nextText: string
  nextOnClick: () => void
  type: "button" | "submit" | "reset"
}

export function ApplicationFooterSection({
  showPrevBtn,
  prevText,
  prevOnClick,
  nextText,
  nextOnClick,
  type,
}: //   isSubmitting
ApplicationFooterSection) {
  return (
    <div className="fixed right-4 bottom-0 w-full bg-white">
      <hr className="border-t" />
      <div className="flex justify-between items-center p-3">
        <span className="font-space-grotesk font-normal text-sm ml-8 text-gray-600">
          Please Fill all the section. Once you complete, click Next Button. If
          you like to go back click prevous. Once you see submit button , click
          submit when you have give full information.
        </span>
        <div className="flex flex-row">
          {showPrevBtn && (
            <Button
              className="bg-slate-500"
              type="button"
              //   variant="contained"
              //   color="primary"
              //   mr="1"
              onClick={prevOnClick}
              //   disabled={isSubmitting}
            >
              {prevText}
            </Button>
          )}
          <Button
            type={type}
            className="bg-blue-800 text-white hover:bg-blue-800/80 hover:text-white"
            variant={"outline"}
            // variant="contained"
            // color="primary"
            // mr="1"
            onClick={nextOnClick}
            // disabled={isSubmitting}
          >
            {/* {isSubmitting ? "Submitting Data ..." : nextText} */}
            {nextText}
          </Button>
        </div>
      </div>
    </div>
  )
}
