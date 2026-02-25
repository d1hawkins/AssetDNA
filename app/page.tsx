export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-primary">AssetDNA</h1>
      <p className="mt-4 text-slate-400">
        Blockchain-based digital asset identity platform
      </p>
      <div className="mt-8 flex gap-4">
        <button className="btn-primary">Get Started</button>
        <button className="btn-secondary">Learn More</button>
      </div>
    </main>
  );
}
