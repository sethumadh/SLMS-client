import { Switch } from "@headlessui/react"
import { cn } from "@/lib/utils"

type Toggleprops = {
  enabled: boolean
  handleEnabled?: (bool: boolean) => void
  labelTrue?: string
  labelFalse?: string
}
export default function Toggle({
  enabled,
  handleEnabled,
  labelFalse,
  labelTrue,
}: Toggleprops) {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={handleEnabled}
        className={cn(
          enabled ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={cn(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      {enabled && labelTrue && labelFalse ? (
        <>
          <Switch.Label as="span" className="ml-3 text-sm">
            <span className="font-medium text-gray-900">{labelTrue}</span>{" "}
            {/* <span className="text-gray-500">(Save 10%)</span> */}
          </Switch.Label>
        </>
      ) : (
        <>
          <Switch.Label as="span" className="ml-3 text-sm">
            <span className="font-medium text-gray-900">{labelFalse}</span>{" "}
            {/* <span className="text-gray-500">(Save 10%)</span> */}
          </Switch.Label>
        </>
      )}
    </Switch.Group>
  )
}
