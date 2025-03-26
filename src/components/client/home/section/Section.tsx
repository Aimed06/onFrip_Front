
import { ReactElement } from "react";

interface SectionProps {
  children: ReactElement
}
const Section = ({children}: SectionProps) => {
  return (
    <section className="container mx-auto py-8">
      {children}
    </section>
  )
}

export default Section