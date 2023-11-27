export const PackageNotifations = () => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-8 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Notifications (Not available)
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {
            "We'll always let you know about important changes, but you pick what else you want to hear about."
          }
        </p>
      </div>

      <div className="max-w-2xl space-y-10 md:col-span-2">
        <fieldset disabled>
          <legend className="text-sm font-semibold leading-6 text-gray-900">
            Push Notifications
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            These are delivered via SMS to your mobile phone.
          </p>
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-x-3">
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="push-everything"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Everything
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="push-email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Same as email
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="push-nothing"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                No push notifications
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};
