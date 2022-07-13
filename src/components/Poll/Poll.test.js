import { render, fireEvent, screen } from "@testing-library/react";
import Poll from "./";

const dataMock = {
  question: "How are you?",
  answersRaw:
    "Brilliant! I have so much energy|Always can be worse|Please, end my misery",
};

describe("Poll", () => {
  describe("Component rendering", () => {
    it("should render the provided question and every answer", () => {
      render(<Poll {...dataMock} />);
      expect(screen.getByText("How are you?")).toBeInTheDocument();
      expect(
        screen.getByText("Brilliant! I have so much energy")
      ).toBeInTheDocument();
      expect(screen.getByText("Always can be worse")).toBeInTheDocument();
      expect(screen.getByText("Please, end my misery")).toBeInTheDocument();
    });

    it("should render the total number of votes", () => {
      render(<Poll {...dataMock} />);

      expect(screen.getByText("Votes 0")).toBeInTheDocument();
    });
  });

  describe("User interaction", () => {
    it("should show the check marker on the answer selected and the votes percentages", () => {
      render(<Poll {...dataMock} />);

      fireEvent.click(screen.getByText("Always can be worse"));

      expect(
        screen.getByText("Brilliant! I have so much energy 0%")
      ).toBeInTheDocument();
      expect(
        screen.getByText("✔ Always can be worse 100%")
      ).toBeInTheDocument();
      expect(screen.getByText("Please, end my misery 0%")).toBeInTheDocument();
    });
  });

  describe("Localstorage interactions", () => {
    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(() => null),
          setItem: jest.fn(() => null),
        },
        writable: true,
      });
    });

    it("should call localStorage on first render", () => {
      render(<Poll {...dataMock} />);

      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.getItem).toHaveBeenCalledWith("How are you?");
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        "How are you?",
        '{"question":"How are you?","answers":[{"option":"Brilliant! I have so much energy","votes":0},{"option":"Always can be worse","votes":0},{"option":"Please, end my misery","votes":0}],"totalVotes":0}'
      );
    });

    it("should call localStorage when the user votes", () => {
      render(<Poll {...dataMock} />);

      fireEvent.click(screen.getByText("Always can be worse"));

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        "How are you?",
        '{"question":"How are you?","answers":[{"option":"Brilliant! I have so much energy","votes":0},{"option":"Always can be worse","votes":1},{"option":"Please, end my misery","votes":0}],"totalVotes":1}'
      );
    });
  });
});
