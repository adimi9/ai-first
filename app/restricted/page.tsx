export default function accessDeniedPage() {
  return (
    <div className="flex size-full h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-4xl font-bold">Oops! Restricted Access</h1>
      <p className="text-lg">
        OKReator is only accessible within the government network.
      </p>
    </div>
  );
}
