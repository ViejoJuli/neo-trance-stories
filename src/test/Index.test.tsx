import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Index from "@/pages/Index";

vi.mock("@/components/Navbar", () => ({ default: () => null }));
vi.mock("@/components/Hero", () => ({ default: () => <div>Hero</div> }));
vi.mock("@/components/Benefits", () => ({ default: () => null }));
vi.mock("@/components/About", () => ({ default: () => null }));
vi.mock("@/components/Services", () => ({ default: () => null }));
vi.mock("@/components/Reflections", () => ({ default: () => <div>Reflexiones</div> }));
vi.mock("@/components/UrbanWall", () => ({ default: () => <div>Fotografía urbana</div> }));
vi.mock("@/components/Testimonials", () => ({ default: () => null }));
vi.mock("@/components/CtaFinal", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));
vi.mock("@/components/audio-reactive/MatrixBackground", () => ({
  MatrixBackground: () => <canvas />,
}));

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  window.matchMedia = originalMatchMedia;
});

describe("entrada Matrix", () => {
  it("muestra la cascada y después revela el hero", () => {
    vi.useFakeTimers();
    render(<Index />);

    expect(screen.getByTestId("matrix-intro")).toHaveClass("opacity-100");
    act(() => vi.advanceTimersByTime(1800));
    expect(screen.getByTestId("matrix-intro")).toHaveClass("opacity-0");
    act(() => vi.advanceTimersByTime(700));
    expect(screen.queryByTestId("matrix-intro")).not.toBeInTheDocument();
    expect(screen.getByText("Hero")).toBeInTheDocument();
  });

  it("omite la transición cuando se prefiere reducir movimiento", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    render(<Index />);

    expect(screen.queryByTestId("matrix-intro")).not.toBeInTheDocument();
    expect(screen.getByText("Hero")).toBeInTheDocument();
  });
});
