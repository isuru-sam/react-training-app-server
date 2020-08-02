import { createHistory ,createMemorySource } from "@reach/router";

export const history = createHistory(window);
export const navigate = history.navigate;