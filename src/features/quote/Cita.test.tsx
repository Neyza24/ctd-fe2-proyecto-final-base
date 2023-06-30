import { render } from "../../test-utils";
import Cita from "./Cita";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../../mocks/server";


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("QuoteComponent", () => {

    it("Render default quote", () => {
        render(<Cita />);
        expect(screen.getByText("No se encontro ninguna cita")).toBeInTheDocument();
    });

    it("Render loading click the random button", async () => {
        render(<Cita />);
        const buttonRamdomQuote = await screen.findByLabelText(/Obtener cita aleatoria/i);
        userEvent.click(buttonRamdomQuote);

        await waitFor(() => {
            expect(
                screen.getByText(/CARGANDO.../i)).toBeInTheDocument();
        })
        
    });

    it("Render message when not found character name", async () => {
      render(<Cita />);

      const input = screen.getByRole("textbox", { name: "Author Cita" });
      const buttonSearch = await screen.findByLabelText(/Obtener Cita/i);
      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.keyboard("Picapiedra");
      userEvent.click(buttonSearch);

      await waitFor(() => {
        expect(
          screen.getByText(/No se encontro ninguna cita/i)
        ).toBeInTheDocument();
      });
    });

    it("Render message when empty input value", async () => {
      render(<Cita />);

      const input = screen.getByRole("textbox", { name: "Author Cita" });
      const buttonSearch = await screen.findByLabelText(/Obtener Cita/i);
      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.keyboard(" ");
      userEvent.click(buttonSearch);

      await waitFor(() => {
        expect(
          screen.getByText(/No se encontro ninguna cita/i)
        ).toBeInTheDocument();
      });
    });


    it("Render character quote", async () => {
      render(<Cita />);

      const input = screen.getByRole("textbox", { name: "Author Cita" });
      const buttonSearch = await screen.findByLabelText(/Obtener Cita/i);
      await userEvent.click(input);
      await userEvent.keyboard("Homer Simpson");
      await userEvent.click(buttonSearch);

      await waitFor(() => {
        expect(
          screen.getByText(
            /Gah, stupid sexy Flanders!/i
          )
        ).toBeInTheDocument();
      });
    });

    it("Render delete quote and input value", async () => {
      render(<Cita />);
      
      const input = screen.getByRole("textbox", { name: "Author Cita" });
      const buttonSearch = await screen.findByLabelText(/Obtener Cita/i);

      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.keyboard("Chief");
      await userEvent.click(buttonSearch);

      await waitFor(() => {
        expect(
          screen.getByText(
            /Gah, stupid sexy Flanders!/i
          )
        ).toBeInTheDocument();
      });

      const buttonDelete = screen.getByLabelText(/Borrar/i);
      await userEvent.click(buttonDelete);

      await waitFor(() => {
        expect(
          screen.getByText(/No se encontro ninguna cita/i)
        ).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByDisplayValue("")).toBeInTheDocument();
      });
    });


});

