export default function InvitePage() {
  return (
    <div className="flex flex-col space-y-4 lg:space-y-6">
      <div className="space-y-1.5">
        <h1 className="font-bold text-2xl lg:text-3xl">Invite Friends</h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          Share EmotiSync with your friends and family
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
        {/* Placeholder for invite options */}
        <div className="rounded-lg border p-3 lg:p-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm lg:text-base">Share Link</h3>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Coming soon...
            </p>
          </div>
        </div>
        <div className="rounded-lg border p-3 lg:p-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm lg:text-base">
              Referral Program
            </h3>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
