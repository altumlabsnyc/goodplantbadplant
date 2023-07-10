import Header from "@/components/Header";

export default function Learn() {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <p className="font-bold tracking-widest text-3xl">Learn</p>
          <p className="text-xl lg:text-2xl !leading-tight mx-auto max-w-xl text-center my-12 tracking-wide font-medium">
            What, why, and how
          </p>
        </div>
      </div>
    </div>
  );
}
