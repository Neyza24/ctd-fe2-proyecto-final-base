import { render } from "../../test-utils";
import { screen } from "@testing-library/react";
import Noticias from "./Noticias";


describe("NewsComponent", () => {
    it("Render title news section", () => {
        render(<Noticias />);
        expect(screen.getByText(/Noticias de los Simpsons/i)).toBeInTheDocument();
    });
})