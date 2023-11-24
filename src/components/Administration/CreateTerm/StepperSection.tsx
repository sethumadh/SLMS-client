import { Button } from "@/components/ui/button"

type StepperSection = {
  showPrevBtn: boolean
  prevText: string
  prevOnClick: () => void
  nextText: string
  nextOnClick: () => void
  type: "button" | "submit" | "reset"
  isSubmitting: boolean
}

export function StepperSection({
  showPrevBtn,
  prevText,
  prevOnClick,
  nextText,
  nextOnClick,
  type,
  isSubmitting,
}: //   isSubmitting
StepperSection) {
  return (
    <div className="fixed right-4 bottom-0 w-full bg-white">
      <hr className="border-t" />
      <div className="flex justify-center gap-10 items-center p-3">
        <span className="font-space-grotesk font-normal text-sm ml-8 text-gray-600">
          Please Fill all the sections. You can review details in the next
          section.
          {/* Once you complete, click Next Button. If
          you like to go back click prevous. Once you see submit button , click
          submit when you have give full information. */}
        </span>
        <div className="flex flex-row gap-10">
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
            className="bg-blue-800 text-white hover:bg-blue-800/80 hover:text-white w-[150px]"
            variant={"outline"}
            // variant="contained"
            // color="primary"
            // mr="1"
            onClick={nextOnClick}
            // disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                  opacity=".25"
                />
                <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="0.75s"
                    values="0 12 12;360 12 12"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            ) : (
              nextText
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
