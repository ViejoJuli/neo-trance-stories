import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Link, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RadioProvider, useRadio } from "@/components/Radio";

const query = vi.hoisted(() => ({
  result: { data: undefined as { url_soundcloud: string } | undefined, isPending: false, isError: false },
}));

vi.mock("@tanstack/react-query", () => ({ useQuery: () => query.result }));

const SelectSet = () => {
  const { playSet } = useRadio();
  return <button onClick={() => playSet("https://soundcloud.com/elminusuan/otro-set")}>Otro set</button>;
};

const renderRadio = () => render(
  <MemoryRouter>
    <RadioProvider>
      <Link to="/blog">Ir al blog</Link>
      <Routes>
        <Route path="/" element={<div>Inicio</div>} />
        <Route path="/blog" element={<SelectSet />} />
      </Routes>
    </RadioProvider>
  </MemoryRouter>
);

afterEach(() => {
  cleanup();
  query.result = { data: undefined, isPending: false, isError: false };
});

describe("Radio persistente", () => {
  it("conserva el mismo reproductor al navegar y ocultar los controles", () => {
    renderRadio();
    const player = screen.getByTitle("SoundCloud Player");
    const url = new URL(player.getAttribute("src")!);
    expect(url.searchParams.get("url")).toBe("https://soundcloud.com/elminusuan/el-3ero-neo-trance-cafetero");
    expect(url.searchParams.get("auto_play")).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: /Frecuencia Neo Trance/ }));
    fireEvent.click(screen.getByRole("link", { name: "Ir al blog" }));
    expect(screen.getByTitle("SoundCloud Player")).toBe(player);
    fireEvent.click(screen.getByRole("button", { name: /Frecuencia Neo Trance/ }));
    expect(screen.getByTitle("SoundCloud Player")).toBe(player);
  });

  it("permite elegir otro set sin reemplazarlo al actualizar el destacado", () => {
    query.result.data = { url_soundcloud: "https://soundcloud.com/elminusuan/destacado" };
    const { rerender } = renderRadio();
    const player = screen.getByTitle("SoundCloud Player");
    expect(new URL(player.getAttribute("src")!).searchParams.get("url")).toBe(query.result.data.url_soundcloud);

    fireEvent.click(screen.getByRole("link", { name: "Ir al blog" }));
    fireEvent.click(screen.getByRole("button", { name: "Otro set" }));
    expect(new URL(player.getAttribute("src")!).searchParams.get("url")).toBe("https://soundcloud.com/elminusuan/otro-set");
    query.result.data = { url_soundcloud: "https://soundcloud.com/elminusuan/nuevo-destacado" };
    rerender(<MemoryRouter><RadioProvider><div>Contenido</div></RadioProvider></MemoryRouter>);
    expect(new URL(screen.getByTitle("SoundCloud Player").getAttribute("src")!).searchParams.get("url")).toBe("https://soundcloud.com/elminusuan/otro-set");
  });

  it("usa el set alternativo si falla la consulta", () => {
    query.result.isError = true;
    renderRadio();
    const url = new URL(screen.getByTitle("SoundCloud Player").getAttribute("src")!);
    expect(url.searchParams.get("url")).toBe("https://soundcloud.com/elminusuan/el-3ero-neo-trance-cafetero");
  });

  it("no reemplaza el set elegido si el destacado llega después", () => {
    query.result.isPending = true;
    const { rerender } = renderRadio();
    fireEvent.click(screen.getByRole("link", { name: "Ir al blog" }));
    fireEvent.click(screen.getByRole("button", { name: "Otro set" }));
    query.result = { data: { url_soundcloud: "https://soundcloud.com/elminusuan/destacado" }, isPending: false, isError: false };
    rerender(<MemoryRouter><RadioProvider><div>Contenido</div></RadioProvider></MemoryRouter>);
    const url = new URL(screen.getByTitle("SoundCloud Player").getAttribute("src")!);
    expect(url.searchParams.get("url")).toBe("https://soundcloud.com/elminusuan/otro-set");
  });
});
