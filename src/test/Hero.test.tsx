import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

vi.mock("@/components/Radio", () => ({
  useRadio: () => ({ openRadio: vi.fn() }),
}));

vi.mock("@/components/audio-reactive/MatrixBackground", () => ({
  MatrixBackground: () => <canvas data-testid="matrix" />,
}));

const renderHero = () => render(<MemoryRouter><Hero /></MemoryRouter>);

afterEach(() => {
  cleanup();
});

describe("Hero integrado", () => {
  it("muestra la cascada y el acceso a la radio", () => {
    renderHero();

    expect(screen.getByTestId("matrix")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "[ Música ]" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "[ Blog ]" })).toHaveAttribute("href", "/blog");
    expect(screen.getByText("Cuento historias a través del sonido")).toBeInTheDocument();
  });

  it("presenta primero el acceso a los sets y mantiene el enlace a la comunidad", () => {
    renderHero();
    const music = screen.getByRole("link", { name: "Escucha mis sets" });
    const community = screen.getByRole("link", { name: "Únete a la comunidad — es gratis" });

    expect(music).toHaveAttribute("href", "/musica");
    expect(community).toHaveAttribute("href", "/auth");
    expect(music.compareDocumentPosition(community) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("ofrece el presskit desde contacto", () => {
    render(<MemoryRouter><Footer /></MemoryRouter>);
    expect(screen.getByRole("link", { name: /Descargar presskit/ }))
      .toHaveAttribute("href", "/press-kit-minus-1-2026.pdf");
    expect(screen.getByRole("link", { name: /Descargar presskit/ })).toHaveAttribute("download");
  });
});
