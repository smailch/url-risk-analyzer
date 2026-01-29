export function StatusIndicator() {
  return (
    <div className="w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground font-medium">
            Multi-Source Security Engine: <span className="text-accent font-semibold">ONLINE</span>
          </span>
        </div>
      </div>
    </div>
  );
}
