const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full mx-auto max-w-3xl h-screen flex flex-col bg-gradient-to-b from-background/95 to-background transition-colors duration-300">
      {children}
    </section>
  )
}

export default Container