import {Tuits} from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import axios from "axios";
import {findAllTuits} from "../services/tuits-service";

jest.mock('axios');

const MOCKED_TUITS = [
    {tuit: "alice's tuit", postBy: "123", _id: "1231"},
    {tuit: "bob's tuit", postBy: "234", _id: "2341"},
    {tuit: "charlie's tuit", postBy: "345", _id: "3451"}
];
test('tuit list renders mocked', async () => {
    // simulate response from REST with static response
    axios.get.mockImplementation(() =>
        Promise.resolve({data: {tuits: MOCKED_TUITS}}));
    // retrieve tuits from Mock
    const response = await findAllTuits();
    const tuits = response.tuits;
    render(<Tuits tuits={tuits}/>);
    // verify tuits appears in screen somewhere
    const tuit = screen.getByText(/charlie's tuit/i);
    expect(tuit).toBeInTheDocument();
});