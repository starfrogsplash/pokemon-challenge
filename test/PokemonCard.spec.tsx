import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import PokemonCard from "../components/PokemonCard";
describe("PokemonCard", () => {
  it("renders Pokemon cards when data is available", async () => {
    const mockPokemon = {
      id: 1,
      name: "Bulbasaur",
      stats: [
        { name: "HP", base_stat: 45, effort: 10 },
        { name: "Attack", base_stat: 49, effort: 10 },
        { name: "Defense", base_stat: 49, effort: 10 },
      ],
      types: [
        { slot: 1, name: "grass" },
        { slot: 2, name: "poison" },
      ],
    };

    const { getByText, getByAltText } = render(
      <PokemonCard pokemon={mockPokemon} />
    );

    // Check if Pokemon image is rendered with correct alt text
    const imageElement = getByAltText("Bulbasaur");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/sprites/1.svg");
    expect(imageElement).toHaveAttribute("width", "140");
    expect(imageElement).toHaveAttribute("height", "140");

    // Check if Pokemon name is rendered
    const nameElement = getByText("Bulbasaur");
    expect(nameElement).toBeInTheDocument();

    // Check if Pokemon stats are rendered
    const hpStatElement = getByText("HP: 45");
    expect(hpStatElement).toBeInTheDocument();

    const attackStatElement = getByText("Attack: 49");
    expect(attackStatElement).toBeInTheDocument();

    const defenseStatElement = getByText("Defense: 49");
    expect(defenseStatElement).toBeInTheDocument();

    // Check if Pokemon types are rendered
    const typesElement = getByText("grass");
    expect(typesElement).toBeInTheDocument();
  });
});
