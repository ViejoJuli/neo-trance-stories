import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Reflections from "@/components/Reflections";
import UrbanWall from "@/components/UrbanWall";

const photos = vi.hoisted(() => ({
  items: [] as { src: string; alt: string; title: string; story?: string }[],
}));

vi.mock("@/data/urbanPhotos", () => ({ urbanPhotos: photos.items }));

afterEach(() => {
  cleanup();
  photos.items.length = 0;
});

describe("Reflexiones", () => {
  it("carga TikTok solo cuando el visitante lo solicita y conserva el enlace directo", () => {
    render(<Reflections />);
    expect(document.querySelector('script[src="https://www.tiktok.com/embed.js"]')).toBeNull();
    expect(screen.getByRole("link", { name: /Visitar @elminusuan/ })).toHaveAttribute("href", "https://www.tiktok.com/@elminusuan");

    fireEvent.click(screen.getByRole("button", { name: "Cargar videos de TikTok" }));
    const script = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
    expect(script).toBeInTheDocument();
    expect(document.querySelector('[data-unique-id="elminusuan"]')).toBeInTheDocument();

    fireEvent.error(script!);
    expect(screen.getByRole("status")).toHaveTextContent("No se pudo cargar TikTok");
    cleanup();
    expect(document.querySelector('script[src="https://www.tiktok.com/embed.js"]')).toBeNull();
  });
});

describe("Muro de fotografía", () => {
  it("muestra un estado vacío cuando no hay fotografías", () => {
    render(<UrbanWall />);
    expect(screen.getByText("El muro está tomando forma")).toBeInTheDocument();
  });

  it("presenta las fotografías publicadas con descripción e historia", () => {
    photos.items.push({ src: "/calle.webp", alt: "Una calle al atardecer", title: "Luz", story: "Una pausa" });
    render(<UrbanWall />);
    expect(screen.getByRole("img", { name: "Una calle al atardecer" })).toHaveAttribute("src", "/calle.webp");
    expect(screen.getByText("Luz")).toBeInTheDocument();
    expect(screen.getByText("Una pausa")).toBeInTheDocument();
  });
});
