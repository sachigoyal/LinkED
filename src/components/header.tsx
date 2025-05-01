import ThemeToggler from "@/components/ModeToogle";

export function Header() {
  return (
    <div className="flex justify-between mt-24">
      <h1 className="text-2xl font-bold font-heading ">LinkED</h1>
      <ThemeToggler />
    </div>
  )
}