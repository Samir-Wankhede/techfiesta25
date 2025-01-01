import { NavBar } from "@/components/NavBar";


export default function MarketingLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}