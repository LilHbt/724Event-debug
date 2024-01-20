import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      setTimeout(async () => {
        screen.findByText("Message envoyé !");
      }, 3000);
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    setTimeout(() => {
      const events = screen.getByTestId("card-testid");
      expect(events).toBeInTheDocument();
    }, 3000);
  });
  it("a list a people is displayed", () => {
    render(<Home />);
    setTimeout(() => {
      const peopleCards = screen.getByTestId("peopleCard-testid");
      expect(peopleCards).toBeInTheDocument();
    }, 3000);
  });
  it("a footer is displayed", () => {
    render(<Home />);
    const footer = screen.getByTestId("footer-testid");
    expect(footer).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    const data = [
      { title: "Event 1", date: "2024-01-20", cover: "/path/to/image1.jpg" },
      { title: "Event 2", date: "2024-01-21", cover: "/path/to/image2.jpg" },
    ];

    setTimeout(() => {
      const lastEventCard = document.querySelector("last-event");
      const eventData = data;

      expect(lastEventCard).toHaveTextContent(eventData[1].title);
      expect(lastEventCard).toHaveTextContent(eventData[1].date);
    }, 3000);
  });
});
