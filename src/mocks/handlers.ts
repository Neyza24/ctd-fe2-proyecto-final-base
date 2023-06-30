import { rest } from "msw";
import { API_URL } from "../app/constants";

const data = [
    {
        quote: "Gah, stupid sexy Flanders!",
        character: "Homer",
        image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
        characterDirection: "Right",
    },
    {
        quote: "Hey, I'm the chief here. Bake him away, toys.",
        character: "Chief Wiggum",
        image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FChiefWiggum.png?1497567511716",
        characterDirection: "Right",
    },
];

const validQuery = data.find((q) => q.character);

export const handlers = [
    rest.get(`${API_URL}`, (req, res, ctx) => {
        const character = req.url.searchParams.get("character");

        if (character === null) {
            return res(ctx.json([data[1]]), ctx.delay(150));
        }

        if (validQuery) {
            return res(ctx.json([validQuery]));
        }

        return res(ctx.json([]), ctx.delay(150));
    }),
];