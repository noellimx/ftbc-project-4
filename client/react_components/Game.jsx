import React, { useState } from "react";

// returns array of cards
const makeDeck = () => {
  const card1 = { value: 2, name: "2", suit: "Spade" };
  const card2 = { value: 12, name: "Q", suit: "Club" };
  const card3 = { value: 13, name: "K", suit: "Spade" };
  const card4 = { value: 10, name: "10", suit: "Club" };
  const card5 = { value: 9, name: "9", suit: "Spade" };
  const card6 = { value: 8, name: "8", suit: "Club" };
  const card7 = { value: 7, name: "7", suit: "Spade" };
  const card8 = { value: 6, name: "6", suit: "Club" };
  const card9 = { value: 4, name: "4", suit: "Spade" };
  const card10 = { value: 3, name: "3", suit: "Club" };
  const card11 = { value: 11, name: "J", suit: "Club" };
  const card12 = { value: 5, name: "5", suit: "Club" };

  return [
    card12,
    card1,
    card9,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card10,
    card11,
  ];
};

const emptyHand = () => [];

const drawDeck = (n, deck) => {
  return deck.splice(-n);
};

// Component
export default () => {
  const [cardDeck, setCardDeck] = useState(makeDeck());
  const [hand, setHand] = useState(emptyHand());
  const [hand2, setHand2] = useState(emptyHand());

  const [winner, setWinner] = useState({ player: "", result: "" });

  const dealCards = () => {
    if (cardDeck.length == 0) {
      setHand(emptyHand());
      setHand2(emptyHand());
      setCardDeck(makeDeck());
      return;
    }
    const draw1 = drawDeck(2, cardDeck);
    const draw2 = drawDeck(2, cardDeck);

    setHand((prev) => {
      return [...prev, ...draw1];
    });
    setHand2((prev) => {
      return [...prev, ...draw2];
    });
    setCardDeck(() => {
      return [...cardDeck];
    });

    const maxVal1 = Math.max(...draw1.map(({ value }) => value));
    const maxVal2 = Math.max(...draw2.map(({ value }) => value));

    console.table([maxVal1, maxVal2]);
    setWinner((_) => {
      if (maxVal1 == maxVal2) {
        return { player: "", result: "draw" };
      } else if (maxVal1 > maxVal2) {
        return { player: "1", result: "winner " };
      } else {
        return { player: "2", result: "winner " };
      }
    });
  };

  const hand1Elements = hand.map(({ name, suit }, index) => {
    return (
      <div key={`${name}-${suit}`}>
        {name}
        {suit}
      </div>
    );
  });
  const hand2Elements = hand2.map(({ name, suit }, index) => {
    return (
      <div key={`${name}-${suit}`}>
        {name}
        {suit}
      </div>
    );
  });
  return (
    <div>
      <div> Deck Count : {cardDeck.length}</div>
      <div>
        {" "}
        this round result is {winner.result} {winner.player}
      </div>
      <div>
        <h3> Player 1 Cards: </h3>
        {hand1Elements}

        <h3> Player 2 Cards: </h3>
        {hand2Elements}
      </div>
      <p>
        <button style={{ border: "1px solid black" }} onClick={dealCards}>
          {" "}
        { cardDeck.length === 0 ? `Reset` : "Play"}
        </button>
      </p>
    </div>
  );
};
