import {Tuits} from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {findAllTuits} from "../services/tuits-service";

const MOCKED_USERS = [
  {username: "alice", _id: "123"},
  {username: "bob", _id: "234"},
  {username: "charlie", _id: "345"}
];

const MOCKED_TUITS = [
  {tuit: "alice's tuit", postBy: "123", _id: "1231"},
  {tuit: "bob's tuit", postBy: "234", _id: "2341"},
  {tuit: "charlie's tuit", postBy: "345", _id: "3451"}
];

test('tuit list renders static tuit array', () => {
  render(
      <Tuits tuits={MOCKED_TUITS}/>
  )
  const linkElementA = screen.getByText(/alice's tuit/i);
  const linkElementB = screen.getByText(/bob's tuit/i);
  const linkElementC = screen.getByText(/charlie's tuit/i);
  expect(linkElementA).toBeInTheDocument();
  expect(linkElementB).toBeInTheDocument();
  expect(linkElementC).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(<Tuits tuits={tuits}/>)
  const linkElement = screen.getByText(/SpaceX Dragon/i);
  expect(linkElement).toBeInTheDocument()
})

