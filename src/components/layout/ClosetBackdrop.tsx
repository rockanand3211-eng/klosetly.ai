const LEFT_SCENE =
  'https://images.unsplash.com/photo-1616046229475-cef1ffbee74a?auto=format&fit=crop&w=1200&h=1600&q=80'
const RIGHT_SCENE =
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&h=1600&q=80'

export function ClosetBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="grid h-full min-h-screen grid-cols-1 md:grid-cols-2">
          <div
            className="h-full min-h-[50vh] bg-cover bg-center bg-no-repeat md:min-h-screen"
            style={{ backgroundImage: `url(${LEFT_SCENE})` }}
          />
          <div
            className="h-full min-h-[50vh] bg-cover bg-center bg-no-repeat md:min-h-screen"
            style={{ backgroundImage: `url(${RIGHT_SCENE})` }}
          />
        </div>
      </div>
    </div>
  )
}
