/* Refactored Blank component to be more reusable. Can be used as:
    <Blank>
        <Content/>
    </Blank>
*/

import type { ReactNode } from "react";

type BlankProps = {
  children?: ReactNode;
};

export default function Blank({ children }: BlankProps) {
    return (
    <main className = "pt-16 flex-1">
        <section className="min-h-[calc(100vh-4rem)] py-16 px-8 sm:px-12 lg:px-16 geometric-pattern hero-gradient">
            <div
            className="max-w-6xl mx-auto h-full"
            style={{ background: "#f5f5f5f5", padding: "3rem", borderRadius: "0.25rem" }}
            >     
                {children}
            </div>
        </section>
    </main>
    )
}